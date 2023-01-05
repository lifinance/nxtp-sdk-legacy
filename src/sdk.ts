import { BigNumber, providers, Signer, utils } from "ethers";
import { Evt } from "evt";
import {
  UserNxtpNatsMessagingService,
  TransactionPreparedEvent,
  AuctionResponse,
  jsonifyError,
  Logger,
  createLoggingContext,
  encrypt,
  ChainData,
  getChainData,
  StatusResponse,
} from "@connext/nxtp-utils";

import { SubmitError, ChainNotConfigured, EncryptionError } from "./error";
import {
  NxtpSdkEvent,
  NxtpSdkEventPayloads,
  NxtpSdkEvents,
  SenderTokenApprovalSubmittedPayload,
  SenderTokenApprovalMinedPayload,
  SenderTransactionPrepareSubmittedPayload,
  SenderTransactionPreparedPayload,
  SenderTransactionFulfilledPayload,
  SenderTransactionCancelledPayload,
  ReceiverPrepareSignedPayload,
  ReceiverTransactionPreparedPayload,
  ReceiverTransactionFulfilledPayload,
  ReceiverTransactionCancelledPayload,
  CrossChainParams,
  HistoricalTransaction,
  SubgraphSyncRecord,
  ActiveTransaction,
  CancelParams,
  GetTransferQuote,
  SdkBaseChainConfigParams,
} from "./types";
import { signFulfillTransactionPayload, encodeAuctionBid, ethereumRequest, getGasLimit } from "./utils";
import { SubgraphEvent, SubgraphEvents } from "./subgraph/subgraph";
import { NxtpSdkBase } from "./sdkBase";

export const MIN_SLIPPAGE_TOLERANCE = "00.01"; // 0.01%;
export const MAX_SLIPPAGE_TOLERANCE = "15.00"; // 15.0%
export const DEFAULT_SLIPPAGE_TOLERANCE = "0.10"; // 0.10%
export const AUCTION_TIMEOUT = 30_000;
export const META_TX_TIMEOUT = 300_000;

/**
 * Used to make mocking easier
 */
export const createMessagingEvt = <T>() => {
  return Evt.create<{ inbox: string; data?: T; err?: any }>();
};

/**
 * Helper to generate evt instances for all SDK events
 *
 * @returns A container keyed on event names whos values contain the EVT instance for the keyed event
 */
export const createEvts = (): { [K in NxtpSdkEvent]: Evt<NxtpSdkEventPayloads[K]> } => {
  return {
    [NxtpSdkEvents.SenderTokenApprovalSubmitted]: Evt.create<SenderTokenApprovalSubmittedPayload>(),
    [NxtpSdkEvents.SenderTokenApprovalMined]: Evt.create<SenderTokenApprovalMinedPayload>(),
    [NxtpSdkEvents.SenderTransactionPrepareSubmitted]: Evt.create<SenderTransactionPrepareSubmittedPayload>(),
    [NxtpSdkEvents.SenderTransactionPrepared]: Evt.create<SenderTransactionPreparedPayload>(),
    [NxtpSdkEvents.SenderTransactionFulfilled]: Evt.create<SenderTransactionFulfilledPayload>(),
    [NxtpSdkEvents.SenderTransactionCancelled]: Evt.create<SenderTransactionCancelledPayload>(),
    [NxtpSdkEvents.ReceiverPrepareSigned]: Evt.create<ReceiverPrepareSignedPayload>(),
    [NxtpSdkEvents.ReceiverTransactionPrepared]: Evt.create<ReceiverTransactionPreparedPayload>(),
    [NxtpSdkEvents.ReceiverTransactionFulfilled]: Evt.create<ReceiverTransactionFulfilledPayload>(),
    [NxtpSdkEvents.ReceiverTransactionCancelled]: Evt.create<ReceiverTransactionCancelledPayload>(),
  };
};

/**
 * @classdesc Lightweight class to facilitate interaction with the TransactionManager contract on configured chains.
 *
 */
export class NxtpSdk {
  private evts: { [K in NxtpSdkEvent]: Evt<NxtpSdkEventPayloads[K]> } = createEvts();
  private readonly sdkBase: NxtpSdkBase;
  private readonly logger: Logger;
  public readonly chainData?: Map<string, ChainData>;

  constructor(
    private readonly config: {
      chainConfig: SdkBaseChainConfigParams;
      signer: Signer;
      messagingSigner?: Signer;
      logger?: Logger;
      network?: "testnet" | "mainnet" | "local";
      natsUrl?: string;
      authUrl?: string;
      messaging?: UserNxtpNatsMessagingService;
      skipPolling?: boolean;
      sdkBase?: NxtpSdkBase;
      chainData?: Map<string, ChainData>;
    },
  ) {
    const {
      chainConfig,
      signer,
      messagingSigner,
      messaging,
      natsUrl,
      authUrl,
      logger,
      network,
      skipPolling,
      sdkBase,
      chainData,
    } = this.config;

    this.logger = logger ?? new Logger({ name: "NxtpSdk" });

    this.sdkBase =
      sdkBase ??
      new NxtpSdkBase({
        chainConfig,
        signerAddress: signer.getAddress(),
        authUrl,
        messaging,
        natsUrl,
        signer,
        logger: this.logger.child({ name: "NxtpSdkBase" }),
        network,
        messagingSigner,
        skipPolling,
        chainData,
      });
    this.chainData = this.sdkBase.chainData;
  }

  /**
   * Retrieves ChainData and instantiates a new NxtpSdk instance using it.
   *
   * @param config - Sdk configuration params (without chainData).
   * @returns A new NxtpSdk instance.
   */
  static async create(config: {
    chainConfig: SdkBaseChainConfigParams;
    signer: Signer;
    messagingSigner?: Signer;
    logger?: Logger;
    network?: "testnet" | "mainnet" | "local";
    natsUrl?: string;
    authUrl?: string;
    messaging?: UserNxtpNatsMessagingService;
    skipPolling?: boolean;
    sdkBase?: NxtpSdkBase;
  }): Promise<NxtpSdk> {
    const chainData = await getChainData();
    return new NxtpSdk({ ...config, chainData });
  }

  async connectMessaging(bearerToken?: string): Promise<string> {
    return this.sdkBase.connectMessaging(bearerToken);
  }

  /**
   * Gets all the transactions that could require user action from the subgraph across all configured chains
   *
   * @returns An array of the active transactions and their status
   */
  public async getActiveTransactions(): Promise<ActiveTransaction[]> {
    return this.sdkBase.getActiveTransactions();
  }

  /**
   * Gets all the transactions that could require user action from the subgraph across all configured chains
   *
   * @returns An array of the active transactions and their status
   */
  public async getRouterStatus(requestee: string): Promise<StatusResponse[]> {
    return this.sdkBase.getRouterStatus(requestee);
  }

  /**
   * Gets the current sync status of the subgraph(s) for the specified chain.
   * @param chainId
   * @returns SubgraphSyncRecord for the specified chain.
   */
  public getSubgraphSyncStatus(chainId: number): SubgraphSyncRecord {
    return this.sdkBase.getSubgraphSyncStatus(chainId);
  }

  /**
   * Gets historical transactions
   *
   * @returns An array of historical transactions
   */
  public async getHistoricalTransactions(): Promise<HistoricalTransaction[]> {
    return this.sdkBase.getHistoricalTransactions();
  }

  /**
   * Gets gas fee in sending token for router transfer
   *
   * @param params.amount - amount
   * @param params.sendingChainId - The network id of sending chain
   * @param params.sendingAssetId - The sending asset address
   * @param params.receivingChainId - The network id of receiving chain
   * @param params.receivingAssetId - The receiving asset address
   * @returns Gas fee for router transfer in sending token
   */
  public async getEstimateReceiverAmount(params: {
    amount: string;
    sendingChainId: number;
    sendingAssetId: string;
    receivingChainId: number;
    receivingAssetId: string;
    callDataParams: { callData?: string; callTo?: string; callDataGas?: string };
    relayerFee?: string; // if relayer fee has already been calculated, can be passed in as an override
  }): Promise<{ receiverAmount: string; totalFee: string; routerFee: string; gasFee: string; relayerFee: string }> {
    return this.sdkBase.getEstimateReceiverAmount(params);
  }

  /**
   * Fetches an estimated quote for a proposed crosschain transfer. Runs an auction to determine the `router` for a transaction and the estimated received value.
   *
   * @param params - Params to create crosschain transfer with
   * @param params.callData - The calldata to execute on the receiving chain
   * @param params.sendingChainId - The originating chain (where user is sending funds from)
   * @param params.sendingAssetId - The originating asset of the funds the user is sending
   * @param params.receivingChainId - The destination chain (where user wants the funds)
   * @param params.receivingAssetId - The assetId of funds the user would like to receive on the receiving chain
   * @param params.callTo - The address on the receiving chain to execute the callData on
   * @param params.receivingAddress - The address the funds should be sent to on the destination chain if callTo/callData is empty, or the fallback address if the callTo/callData is specified
   * @param params.amount - The amount the user will send on the sending chain. This is not necessarily the amount they will receive
   * @param params.expiry - The expiry on the sending chain for the transfer
   * @param params.transactionId - The unique identifier for the transfer
   *
   * @returns The auction response for the given transacton
   *
   * @remarks
   * The user chooses the transactionId, and they are incentivized to keep the transactionId unique otherwise their signature could e replayed and they would lose funds.
   */
  public async getTransferQuote(
    params: Omit<CrossChainParams, "encryptedCallData"> & { passCalldataUnencrypted?: boolean },
  ): Promise<GetTransferQuote> {
    const user = await this.config.signer.getAddress();

    // WARNING: default true for now to work with all wallets. eventually fix this to properly encrypt
    const passCalldataUnencrypted = params.passCalldataUnencrypted ?? true;

    const callData = params.callData ?? "0x";
    let encryptedCallData = "0x";
    if (callData !== "0x" && !passCalldataUnencrypted) {
      try {
        const encryptionPublicKey = await ethereumRequest("eth_getEncryptionPublicKey", [user]);
        encryptedCallData = await encrypt(callData, encryptionPublicKey);
      } catch (e) {
        throw new EncryptionError("public key encryption failed", jsonifyError(e));
      }
    }

    if (passCalldataUnencrypted) {
      encryptedCallData = callData;
    }

    return this.sdkBase.getTransferQuote({ ...params, encryptedCallData });
  }

  /**
   * Begins a crosschain transfer by calling `prepare` on the sending chain.
   *
   * @param transferParams - The auction result (winning bid and associated signature)
   * @param transferParams.bid - The winning action bid (includes all data needed to call prepare)
   * @param transferParams.bidSignature - The signature of the router on the winning bid
   * @param infiniteApprove - (optional) If true, will approve the TransactionManager on `transferParams.sendingChainId` for the max value. If false, will approve for only transferParams.amount. Defaults to false
   * @returns A promise with the transactionId and the `TransactionResponse` returned when the prepare transaction was submitted, not mined.
   */
  public async prepareTransfer(
    transferParams: AuctionResponse,
    infiniteApprove = false,
    actualAmount?: string,
  ): Promise<{ prepareResponse: providers.TransactionResponse; transactionId: string }> {
    const { requestContext, methodContext } = createLoggingContext(
      this.prepareTransfer.name,
      undefined,
      transferParams.bid.transactionId,
    );

    this.logger.info("Method started", requestContext, methodContext, { transferParams });

    const { bid, bidSignature } = transferParams;

    const {
      user,
      router,
      sendingAssetId,
      receivingAssetId,
      receivingAddress,
      amount: _amount,
      expiry,
      callDataHash,
      encryptedCallData,
      sendingChainId,
      receivingChainId,
      callTo,
      transactionId,
      initiator,
    } = bid;
    const encodedBid = encodeAuctionBid(bid);
    const amount = actualAmount ?? _amount;

    const signerAddr = await this.config.signer.getAddress();
    const connectedSigner = this.config.signer;

    const approveTxReq = await this.sdkBase.approveForPrepare(
      { sendingAssetId, sendingChainId, amount, transactionId },
      infiniteApprove,
    );
    const gasLimit = getGasLimit(receivingChainId);
    if (approveTxReq) {
      const approveTx = await connectedSigner.sendTransaction({ ...approveTxReq, gasLimit });
      this.evts.SenderTokenApprovalSubmitted.post({
        assetId: sendingAssetId,
        chainId: sendingChainId,
        transactionResponse: approveTx,
      });

      const approveReceipt = await approveTx.wait(1);
      if (approveReceipt?.status === 0) {
        throw new SubmitError(
          transactionId,
          sendingChainId,
          signerAddr,
          "approve",
          sendingAssetId,
          { infiniteApprove, amount },
          jsonifyError(new Error("Receipt status is 0")),
          {
            approveReceipt,
          },
        );
      }
      this.logger.info("Mined approve tx", requestContext, methodContext, {
        transactionHash: approveReceipt.transactionHash,
      });
      this.evts.SenderTokenApprovalMined.post({
        assetId: sendingAssetId,
        chainId: sendingChainId,
        transactionReceipt: approveReceipt,
      });
    }

    // Prepare sender side tx
    const prepareReq = await this.sdkBase.prepareTransfer(transferParams);
    this.logger.info("Generated prepareReq", requestContext, methodContext, { prepareReq });
    const prepareResponse = await connectedSigner.sendTransaction({ ...prepareReq, gasLimit });
    this.evts.SenderTransactionPrepareSubmitted.post({
      prepareParams: {
        txData: {
          receivingChainTxManagerAddress: "",
          user,
          router,
          initiator,
          sendingAssetId,
          receivingAssetId,
          sendingChainFallback: user,
          callTo,
          receivingAddress,
          sendingChainId,
          receivingChainId,
          callDataHash,
          transactionId,
        },
        encryptedCallData,
        bidSignature: bidSignature!,
        encodedBid,
        amount,
        expiry,
      },
      transactionResponse: prepareResponse,
    });
    return { prepareResponse, transactionId };
  }

  /**
   * Fulfills the transaction on the receiving chain.
   *
   * @param params - The `TransactionPrepared` event payload from the receiving chain
   * @param relayerFee - (optional) The fee paid to relayers. Comes out of the transaction amount the router prepared with. Defaults to 0
   * @param useRelayers - (optional) If true, will use a realyer to submit the fulfill transaction
   * @returns An object containing either the TransactionResponse from self-submitting the fulfill transaction, or the Meta-tx response (if you used meta transactions)
   */
  public async fulfillTransfer(
    params: Omit<TransactionPreparedEvent, "caller"> & { relayerFee?: string },
    useRelayers = true,
  ): Promise<{ transactionHash: string }> {
    const { requestContext, methodContext } = createLoggingContext(
      this.fulfillTransfer.name,
      undefined,
      params.txData.transactionId,
    );
    this.logger.info("Method started", requestContext, methodContext, { params, useRelayers });

    const { txData, encryptedCallData } = params;

    if (!this.config.chainConfig[txData.sendingChainId]) {
      throw new ChainNotConfigured(txData.sendingChainId, Object.keys(this.config.chainConfig));
    }

    if (!this.config.chainConfig[txData.receivingChainId]) {
      throw new ChainNotConfigured(txData.receivingChainId, Object.keys(this.config.chainConfig));
    }

    const signerAddress = await this.config.signer.getAddress();
    const connectedSigner = this.config.signer;
    let callData = "0x";
    if (txData.callDataHash === utils.keccak256(encryptedCallData)) {
      // Call data was passed unencrypted
      callData = encryptedCallData;
    } else if (txData.callDataHash !== utils.keccak256(callData)) {
      try {
        callData = await ethereumRequest("eth_decrypt", [encryptedCallData, txData.user]);
      } catch (e) {
        throw new EncryptionError("decryption failed", jsonifyError(e));
      }
    }

    let calculateRelayerFee = "0";
    if (useRelayers) {
      let relayerFee = params.relayerFee ? BigNumber.from(params.relayerFee) : undefined;
      if (!relayerFee) {
        relayerFee = await this.sdkBase.calculateGasFeeInReceivingTokenForFulfill(
          txData.receivingChainId,
          txData.receivingAssetId,
          {
            callData,
            callTo: txData.callTo,
          },
        );
      }
      this.logger.info(
        `Calculating Gas Fee for fulfill tx. neededGas = ${relayerFee.toString()}`,
        requestContext,
        methodContext,
      );

      calculateRelayerFee = relayerFee.toString();
    }

    this.logger.info("Generating fulfill signature", requestContext, methodContext, { calculateRelayerFee });
    const signature = await signFulfillTransactionPayload(
      txData.transactionId,
      calculateRelayerFee,
      txData.receivingChainId,
      txData.receivingChainTxManagerAddress,
      this.config.signer,
    );

    this.logger.info("Generated signature", requestContext, methodContext, { signature });
    this.evts.ReceiverPrepareSigned.post({ signature, transactionId: txData.transactionId, signer: signerAddress });
    this.logger.info("Preparing fulfill tx", requestContext, methodContext, { calculateRelayerFee });
    const response = await this.sdkBase.fulfillTransfer(params, signature, callData, calculateRelayerFee, useRelayers);

    if (useRelayers) {
      return { transactionHash: response.transactionResponse!.transactionHash };
    } else {
      this.logger.info("Fulfilling with user's signer", requestContext, methodContext);
      const fulfillResponse = await connectedSigner.sendTransaction(response.transactionRequest!);

      this.logger.info("Method complete", requestContext, methodContext, { txHash: fulfillResponse.hash });
      return { transactionHash: fulfillResponse.hash };
    }
  }

  /**
   * Cancels the given transaction.
   *
   * @param cancelParams - Arguments to submit to chain
   * @param cancelParams.txData - TransactionData (invariant + variant) to be cancelled
   * @param cancelParams.relayerFee - Fee to be paid for relaying transaction (only respected on sending chain cancellations post-expiry by the user)
   * @param cancelParams.signature - User signature for relayer to use
   * @param chainId - Chain to cancel the transaction on
   * @returns A TransactionResponse when the transaction was submitted, not mined
   */
  public async cancel(cancelParams: CancelParams, chainId: number): Promise<providers.TransactionResponse> {
    const { requestContext, methodContext } = createLoggingContext(
      this.cancel.name,
      undefined,
      cancelParams.txData.transactionId,
    );
    if (!this.config.chainConfig[chainId]) {
      throw new ChainNotConfigured(chainId, Object.keys(this.config.chainConfig));
    }
    this.logger.info("Method started", requestContext, methodContext, { chainId, cancelParams });

    const cancelReq = await this.sdkBase.cancel(cancelParams, chainId);
    const connectedSigner = this.config.signer;

    const cancelResponse = await connectedSigner.sendTransaction(cancelReq);
    this.logger.info("Method complete", requestContext, methodContext, { txHash: cancelResponse.hash });
    return cancelResponse;
  }

  /**
   * Get the balance of the given address on the given chain,
   *
   * @param chainId - Chain that the address is on.
   * @param address - Address whose balance we're getting.
   * @param assetId (default: native token) - Asset to get the balance for.
   * @param abi (default: ERC20) - ABI of the contract to get the balance from.
   * @returns BigNumber value of the balance.
   */
  public async getBalance(chainId: number, address: string, assetId?: string, abi?: string[]): Promise<BigNumber> {
    return await this.sdkBase.chainReader.getBalance(chainId, address, assetId, abi);
  }

  /**
   * Get the decimal places for the specified asset on the specified chain.
   *
   * @param chainId - Chain that the asset is on.
   * @param assetId - Asset to get the decimal places for.
   * @returns number of decimal places.
   */
  public async getDecimalsForAsset(chainId: number, assetId: string): Promise<number> {
    return await this.sdkBase.chainReader.getDecimalsForAsset(chainId, assetId);
  }

  /**
   * Query subgraph(s) on given chain with a given query string. This is a convenience method
   * that enables SDK users to query directly if necessary - however, it is recommended to
   * use this class's endpoints for things like subgraph health, active txs, historical
   * txs, etc. as much as possible.
   *
   * Note that we'll be querying the most in-sync subgraph first and then resorting to less
   * in-sync subgraphs if necessary.
   *
   * @param chainId - Chain that the subgraph(s) are on.
   * @param query - GraphQL query string to send to the subgraph(s). (For more information
   * on writing your own queries, see: https://graphql.org/learn/)
   *
   * @returns Query response from the (first) subgraph that responded.
   */
  public async querySubgraph(chainId: number, query: string): Promise<any> {
    return this.sdkBase.querySubgraph(chainId, query);
  }

  /**
   * Changes the injected signer associated with the SDK.
   *
   * @param signer - New injected signer for the SDK to use.
   */
  public changeInjectedSigner(signer: Signer) {
    this.config.signer = signer;
    this.sdkBase.changeInjectedSigner(signer);
  }

  /**
   * Turns off all listeners and disconnects messaging from the SDK.
   */
  public removeAllListeners(): void {
    this.detach();
    this.sdkBase.removeAllListeners();
  }

  // Listener methods
  /**
   * Attaches a callback to the emitted event
   *
   * @param event - The event name to attach a handler for
   * @param callback - The callback to invoke on event emission
   * @param filter - (optional) A filter where callbacks are only invoked if the filter returns true
   * @param timeout - (optional) A timeout to detach the handler within. I.e. if no events fired within the timeout, then the handler is detached
   */
  public attach<T extends NxtpSdkEvent>(
    event: T,
    callback: (data: NxtpSdkEventPayloads[T]) => void,
    filter: (data: NxtpSdkEventPayloads[T]) => boolean = (_data: NxtpSdkEventPayloads[T]) => true,
    timeout?: number,
  ): void {
    const args = [timeout, callback].filter((x) => !!x);
    if (Object.keys(SubgraphEvents).includes(event)) {
      this.sdkBase.attach(event as SubgraphEvent, callback as any, filter as any);
    } else {
      this.evts[event].pipe(filter).attach(...(args as [number, any]));
    }
  }

  /**
   * Attaches a callback to the emitted event that will be executed one time and then detached.
   *
   * @param event - The event name to attach a handler for
   * @param callback - The callback to invoke on event emission
   * @param filter - (optional) A filter where callbacks are only invoked if the filter returns true
   * @param timeout - (optional) A timeout to detach the handler within. I.e. if no events fired within the timeout, then the handler is detached
   *
   */
  public attachOnce<T extends NxtpSdkEvent>(
    event: T,
    callback: (data: NxtpSdkEventPayloads[T]) => void,
    filter: (data: NxtpSdkEventPayloads[T]) => boolean = (_data: NxtpSdkEventPayloads[T]) => true,
    timeout?: number,
  ): void {
    const args = [timeout, callback].filter((x) => !!x);
    if (Object.keys(SubgraphEvents).includes(event)) {
      this.sdkBase.attachOnce(event as SubgraphEvent, callback as any, filter as any, timeout);
    } else {
      this.evts[event].pipe(filter).attachOnce(...(args as [number, any]));
    }
  }

  /**
   * Removes all attached handlers from the given event.
   *
   * @param event - (optional) The event name to remove handlers from. If not provided, will detach handlers from *all* subgraph events
   */
  public detach<T extends NxtpSdkEvent>(event?: T): void {
    if (event) {
      if (Object.keys(SubgraphEvents).includes(event)) {
        this.sdkBase.detach(event as SubgraphEvent);
      } else {
        this.evts[event].detach();
      }
      this.evts[event].detach();
    } else {
      Object.values(this.evts).forEach((evt) => evt.detach());
      this.sdkBase.detach();
    }
  }

  /**
   * Returns a promise that resolves when the event matching the filter is emitted
   *
   * @param event - The event name to wait for
   * @param timeout - The ms to continue waiting before rejecting
   * @param filter - (optional) A filter where the promise is only resolved if the filter returns true
   *
   * @returns Promise that will resolve with the event payload once the event is emitted, or rejects if the timeout is reached.
   *
   */
  public waitFor<T extends NxtpSdkEvent>(
    event: T,
    timeout: number,
    filter: (data: NxtpSdkEventPayloads[T]) => boolean = (_data: NxtpSdkEventPayloads[T]) => true,
  ): Promise<NxtpSdkEventPayloads[T]> {
    if (Object.keys(SubgraphEvents).includes(event)) {
      return this.sdkBase.waitFor(event as SubgraphEvent, timeout, filter as any) as Promise<NxtpSdkEventPayloads[T]>;
    } else {
      return this.evts[event].pipe(filter).waitFor(timeout);
    }
  }
}
