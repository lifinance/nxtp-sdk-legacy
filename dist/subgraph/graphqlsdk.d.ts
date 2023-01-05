import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
export declare type Maybe<T> = T | null;
export declare type Exact<T extends {
    [key: string]: unknown;
}> = {
    [K in keyof T]: T[K];
};
export declare type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]?: Maybe<T[SubKey]>;
};
export declare type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export declare type Scalars = {
    ID: string;
    String: string;
    Boolean: boolean;
    Int: number;
    Float: number;
    BigDecimal: any;
    BigInt: any;
    Bytes: any;
};
export declare type AssetBalance = {
    __typename?: 'AssetBalance';
    id: Scalars['ID'];
    amount: Scalars['BigInt'];
    router: Router;
    assetId: Scalars['Bytes'];
};
export declare type AssetBalance_Filter = {
    id?: Maybe<Scalars['ID']>;
    id_not?: Maybe<Scalars['ID']>;
    id_gt?: Maybe<Scalars['ID']>;
    id_lt?: Maybe<Scalars['ID']>;
    id_gte?: Maybe<Scalars['ID']>;
    id_lte?: Maybe<Scalars['ID']>;
    id_in?: Maybe<Array<Scalars['ID']>>;
    id_not_in?: Maybe<Array<Scalars['ID']>>;
    amount?: Maybe<Scalars['BigInt']>;
    amount_not?: Maybe<Scalars['BigInt']>;
    amount_gt?: Maybe<Scalars['BigInt']>;
    amount_lt?: Maybe<Scalars['BigInt']>;
    amount_gte?: Maybe<Scalars['BigInt']>;
    amount_lte?: Maybe<Scalars['BigInt']>;
    amount_in?: Maybe<Array<Scalars['BigInt']>>;
    amount_not_in?: Maybe<Array<Scalars['BigInt']>>;
    router?: Maybe<Scalars['String']>;
    router_not?: Maybe<Scalars['String']>;
    router_gt?: Maybe<Scalars['String']>;
    router_lt?: Maybe<Scalars['String']>;
    router_gte?: Maybe<Scalars['String']>;
    router_lte?: Maybe<Scalars['String']>;
    router_in?: Maybe<Array<Scalars['String']>>;
    router_not_in?: Maybe<Array<Scalars['String']>>;
    router_contains?: Maybe<Scalars['String']>;
    router_not_contains?: Maybe<Scalars['String']>;
    router_starts_with?: Maybe<Scalars['String']>;
    router_not_starts_with?: Maybe<Scalars['String']>;
    router_ends_with?: Maybe<Scalars['String']>;
    router_not_ends_with?: Maybe<Scalars['String']>;
    assetId?: Maybe<Scalars['Bytes']>;
    assetId_not?: Maybe<Scalars['Bytes']>;
    assetId_in?: Maybe<Array<Scalars['Bytes']>>;
    assetId_not_in?: Maybe<Array<Scalars['Bytes']>>;
    assetId_contains?: Maybe<Scalars['Bytes']>;
    assetId_not_contains?: Maybe<Scalars['Bytes']>;
};
export declare enum AssetBalance_OrderBy {
    Id = "id",
    Amount = "amount",
    Router = "router",
    AssetId = "assetId"
}
export declare type Block_Height = {
    hash?: Maybe<Scalars['Bytes']>;
    number?: Maybe<Scalars['Int']>;
    number_gte?: Maybe<Scalars['Int']>;
};
export declare enum OrderDirection {
    Asc = "asc",
    Desc = "desc"
}
export declare type Query = {
    __typename?: 'Query';
    assetBalance?: Maybe<AssetBalance>;
    assetBalances: Array<AssetBalance>;
    router?: Maybe<Router>;
    routers: Array<Router>;
    transaction?: Maybe<Transaction>;
    transactions: Array<Transaction>;
    user?: Maybe<User>;
    users: Array<User>;
    /** Access to subgraph metadata */
    _meta?: Maybe<_Meta_>;
};
export declare type QueryAssetBalanceArgs = {
    id: Scalars['ID'];
    block?: Maybe<Block_Height>;
    subgraphError?: _SubgraphErrorPolicy_;
};
export declare type QueryAssetBalancesArgs = {
    skip?: Maybe<Scalars['Int']>;
    first?: Maybe<Scalars['Int']>;
    orderBy?: Maybe<AssetBalance_OrderBy>;
    orderDirection?: Maybe<OrderDirection>;
    where?: Maybe<AssetBalance_Filter>;
    block?: Maybe<Block_Height>;
    subgraphError?: _SubgraphErrorPolicy_;
};
export declare type QueryRouterArgs = {
    id: Scalars['ID'];
    block?: Maybe<Block_Height>;
    subgraphError?: _SubgraphErrorPolicy_;
};
export declare type QueryRoutersArgs = {
    skip?: Maybe<Scalars['Int']>;
    first?: Maybe<Scalars['Int']>;
    orderBy?: Maybe<Router_OrderBy>;
    orderDirection?: Maybe<OrderDirection>;
    where?: Maybe<Router_Filter>;
    block?: Maybe<Block_Height>;
    subgraphError?: _SubgraphErrorPolicy_;
};
export declare type QueryTransactionArgs = {
    id: Scalars['ID'];
    block?: Maybe<Block_Height>;
    subgraphError?: _SubgraphErrorPolicy_;
};
export declare type QueryTransactionsArgs = {
    skip?: Maybe<Scalars['Int']>;
    first?: Maybe<Scalars['Int']>;
    orderBy?: Maybe<Transaction_OrderBy>;
    orderDirection?: Maybe<OrderDirection>;
    where?: Maybe<Transaction_Filter>;
    block?: Maybe<Block_Height>;
    subgraphError?: _SubgraphErrorPolicy_;
};
export declare type QueryUserArgs = {
    id: Scalars['ID'];
    block?: Maybe<Block_Height>;
    subgraphError?: _SubgraphErrorPolicy_;
};
export declare type QueryUsersArgs = {
    skip?: Maybe<Scalars['Int']>;
    first?: Maybe<Scalars['Int']>;
    orderBy?: Maybe<User_OrderBy>;
    orderDirection?: Maybe<OrderDirection>;
    where?: Maybe<User_Filter>;
    block?: Maybe<Block_Height>;
    subgraphError?: _SubgraphErrorPolicy_;
};
export declare type Query_MetaArgs = {
    block?: Maybe<Block_Height>;
};
export declare type Router = {
    __typename?: 'Router';
    id: Scalars['ID'];
    assetBalances: Array<AssetBalance>;
    transactions: Array<Transaction>;
};
export declare type RouterAssetBalancesArgs = {
    skip?: Maybe<Scalars['Int']>;
    first?: Maybe<Scalars['Int']>;
    orderBy?: Maybe<AssetBalance_OrderBy>;
    orderDirection?: Maybe<OrderDirection>;
    where?: Maybe<AssetBalance_Filter>;
};
export declare type RouterTransactionsArgs = {
    skip?: Maybe<Scalars['Int']>;
    first?: Maybe<Scalars['Int']>;
    orderBy?: Maybe<Transaction_OrderBy>;
    orderDirection?: Maybe<OrderDirection>;
    where?: Maybe<Transaction_Filter>;
};
export declare type Router_Filter = {
    id?: Maybe<Scalars['ID']>;
    id_not?: Maybe<Scalars['ID']>;
    id_gt?: Maybe<Scalars['ID']>;
    id_lt?: Maybe<Scalars['ID']>;
    id_gte?: Maybe<Scalars['ID']>;
    id_lte?: Maybe<Scalars['ID']>;
    id_in?: Maybe<Array<Scalars['ID']>>;
    id_not_in?: Maybe<Array<Scalars['ID']>>;
};
export declare enum Router_OrderBy {
    Id = "id",
    AssetBalances = "assetBalances",
    Transactions = "transactions"
}
export declare type Subscription = {
    __typename?: 'Subscription';
    assetBalance?: Maybe<AssetBalance>;
    assetBalances: Array<AssetBalance>;
    router?: Maybe<Router>;
    routers: Array<Router>;
    transaction?: Maybe<Transaction>;
    transactions: Array<Transaction>;
    user?: Maybe<User>;
    users: Array<User>;
    /** Access to subgraph metadata */
    _meta?: Maybe<_Meta_>;
};
export declare type SubscriptionAssetBalanceArgs = {
    id: Scalars['ID'];
    block?: Maybe<Block_Height>;
    subgraphError?: _SubgraphErrorPolicy_;
};
export declare type SubscriptionAssetBalancesArgs = {
    skip?: Maybe<Scalars['Int']>;
    first?: Maybe<Scalars['Int']>;
    orderBy?: Maybe<AssetBalance_OrderBy>;
    orderDirection?: Maybe<OrderDirection>;
    where?: Maybe<AssetBalance_Filter>;
    block?: Maybe<Block_Height>;
    subgraphError?: _SubgraphErrorPolicy_;
};
export declare type SubscriptionRouterArgs = {
    id: Scalars['ID'];
    block?: Maybe<Block_Height>;
    subgraphError?: _SubgraphErrorPolicy_;
};
export declare type SubscriptionRoutersArgs = {
    skip?: Maybe<Scalars['Int']>;
    first?: Maybe<Scalars['Int']>;
    orderBy?: Maybe<Router_OrderBy>;
    orderDirection?: Maybe<OrderDirection>;
    where?: Maybe<Router_Filter>;
    block?: Maybe<Block_Height>;
    subgraphError?: _SubgraphErrorPolicy_;
};
export declare type SubscriptionTransactionArgs = {
    id: Scalars['ID'];
    block?: Maybe<Block_Height>;
    subgraphError?: _SubgraphErrorPolicy_;
};
export declare type SubscriptionTransactionsArgs = {
    skip?: Maybe<Scalars['Int']>;
    first?: Maybe<Scalars['Int']>;
    orderBy?: Maybe<Transaction_OrderBy>;
    orderDirection?: Maybe<OrderDirection>;
    where?: Maybe<Transaction_Filter>;
    block?: Maybe<Block_Height>;
    subgraphError?: _SubgraphErrorPolicy_;
};
export declare type SubscriptionUserArgs = {
    id: Scalars['ID'];
    block?: Maybe<Block_Height>;
    subgraphError?: _SubgraphErrorPolicy_;
};
export declare type SubscriptionUsersArgs = {
    skip?: Maybe<Scalars['Int']>;
    first?: Maybe<Scalars['Int']>;
    orderBy?: Maybe<User_OrderBy>;
    orderDirection?: Maybe<OrderDirection>;
    where?: Maybe<User_Filter>;
    block?: Maybe<Block_Height>;
    subgraphError?: _SubgraphErrorPolicy_;
};
export declare type Subscription_MetaArgs = {
    block?: Maybe<Block_Height>;
};
export declare type Transaction = {
    __typename?: 'Transaction';
    id: Scalars['ID'];
    status: TransactionStatus;
    chainId: Scalars['BigInt'];
    preparedTimestamp: Scalars['BigInt'];
    receivingChainTxManagerAddress: Scalars['Bytes'];
    user: User;
    router: Router;
    initiator: Scalars['Bytes'];
    sendingAssetId: Scalars['Bytes'];
    receivingAssetId: Scalars['Bytes'];
    sendingChainFallback: Scalars['Bytes'];
    callTo: Scalars['Bytes'];
    receivingAddress: Scalars['Bytes'];
    callDataHash: Scalars['Bytes'];
    transactionId: Scalars['Bytes'];
    sendingChainId: Scalars['BigInt'];
    receivingChainId: Scalars['BigInt'];
    amount: Scalars['BigInt'];
    expiry: Scalars['BigInt'];
    preparedBlockNumber: Scalars['BigInt'];
    encryptedCallData: Scalars['String'];
    prepareCaller?: Maybe<Scalars['Bytes']>;
    bidSignature: Scalars['Bytes'];
    encodedBid: Scalars['String'];
    prepareTransactionHash: Scalars['Bytes'];
    prepareMeta?: Maybe<Scalars['Bytes']>;
    relayerFee?: Maybe<Scalars['BigInt']>;
    signature?: Maybe<Scalars['Bytes']>;
    callData?: Maybe<Scalars['String']>;
    externalCallSuccess?: Maybe<Scalars['Boolean']>;
    externalCallIsContract?: Maybe<Scalars['Boolean']>;
    externalCallReturnData?: Maybe<Scalars['Bytes']>;
    fulfillCaller?: Maybe<Scalars['Bytes']>;
    fulfillTransactionHash?: Maybe<Scalars['Bytes']>;
    fulfillMeta?: Maybe<Scalars['Bytes']>;
    fulfillTimestamp?: Maybe<Scalars['BigInt']>;
    cancelCaller?: Maybe<Scalars['Bytes']>;
    cancelTransactionHash?: Maybe<Scalars['Bytes']>;
    cancelMeta?: Maybe<Scalars['Bytes']>;
    cancelTimestamp?: Maybe<Scalars['BigInt']>;
};
export declare enum TransactionStatus {
    Prepared = "Prepared",
    Fulfilled = "Fulfilled",
    Cancelled = "Cancelled"
}
export declare type Transaction_Filter = {
    id?: Maybe<Scalars['ID']>;
    id_not?: Maybe<Scalars['ID']>;
    id_gt?: Maybe<Scalars['ID']>;
    id_lt?: Maybe<Scalars['ID']>;
    id_gte?: Maybe<Scalars['ID']>;
    id_lte?: Maybe<Scalars['ID']>;
    id_in?: Maybe<Array<Scalars['ID']>>;
    id_not_in?: Maybe<Array<Scalars['ID']>>;
    status?: Maybe<TransactionStatus>;
    status_not?: Maybe<TransactionStatus>;
    status_in?: Maybe<Array<TransactionStatus>>;
    status_not_in?: Maybe<Array<TransactionStatus>>;
    chainId?: Maybe<Scalars['BigInt']>;
    chainId_not?: Maybe<Scalars['BigInt']>;
    chainId_gt?: Maybe<Scalars['BigInt']>;
    chainId_lt?: Maybe<Scalars['BigInt']>;
    chainId_gte?: Maybe<Scalars['BigInt']>;
    chainId_lte?: Maybe<Scalars['BigInt']>;
    chainId_in?: Maybe<Array<Scalars['BigInt']>>;
    chainId_not_in?: Maybe<Array<Scalars['BigInt']>>;
    preparedTimestamp?: Maybe<Scalars['BigInt']>;
    preparedTimestamp_not?: Maybe<Scalars['BigInt']>;
    preparedTimestamp_gt?: Maybe<Scalars['BigInt']>;
    preparedTimestamp_lt?: Maybe<Scalars['BigInt']>;
    preparedTimestamp_gte?: Maybe<Scalars['BigInt']>;
    preparedTimestamp_lte?: Maybe<Scalars['BigInt']>;
    preparedTimestamp_in?: Maybe<Array<Scalars['BigInt']>>;
    preparedTimestamp_not_in?: Maybe<Array<Scalars['BigInt']>>;
    receivingChainTxManagerAddress?: Maybe<Scalars['Bytes']>;
    receivingChainTxManagerAddress_not?: Maybe<Scalars['Bytes']>;
    receivingChainTxManagerAddress_in?: Maybe<Array<Scalars['Bytes']>>;
    receivingChainTxManagerAddress_not_in?: Maybe<Array<Scalars['Bytes']>>;
    receivingChainTxManagerAddress_contains?: Maybe<Scalars['Bytes']>;
    receivingChainTxManagerAddress_not_contains?: Maybe<Scalars['Bytes']>;
    user?: Maybe<Scalars['String']>;
    user_not?: Maybe<Scalars['String']>;
    user_gt?: Maybe<Scalars['String']>;
    user_lt?: Maybe<Scalars['String']>;
    user_gte?: Maybe<Scalars['String']>;
    user_lte?: Maybe<Scalars['String']>;
    user_in?: Maybe<Array<Scalars['String']>>;
    user_not_in?: Maybe<Array<Scalars['String']>>;
    user_contains?: Maybe<Scalars['String']>;
    user_not_contains?: Maybe<Scalars['String']>;
    user_starts_with?: Maybe<Scalars['String']>;
    user_not_starts_with?: Maybe<Scalars['String']>;
    user_ends_with?: Maybe<Scalars['String']>;
    user_not_ends_with?: Maybe<Scalars['String']>;
    router?: Maybe<Scalars['String']>;
    router_not?: Maybe<Scalars['String']>;
    router_gt?: Maybe<Scalars['String']>;
    router_lt?: Maybe<Scalars['String']>;
    router_gte?: Maybe<Scalars['String']>;
    router_lte?: Maybe<Scalars['String']>;
    router_in?: Maybe<Array<Scalars['String']>>;
    router_not_in?: Maybe<Array<Scalars['String']>>;
    router_contains?: Maybe<Scalars['String']>;
    router_not_contains?: Maybe<Scalars['String']>;
    router_starts_with?: Maybe<Scalars['String']>;
    router_not_starts_with?: Maybe<Scalars['String']>;
    router_ends_with?: Maybe<Scalars['String']>;
    router_not_ends_with?: Maybe<Scalars['String']>;
    initiator?: Maybe<Scalars['Bytes']>;
    initiator_not?: Maybe<Scalars['Bytes']>;
    initiator_in?: Maybe<Array<Scalars['Bytes']>>;
    initiator_not_in?: Maybe<Array<Scalars['Bytes']>>;
    initiator_contains?: Maybe<Scalars['Bytes']>;
    initiator_not_contains?: Maybe<Scalars['Bytes']>;
    sendingAssetId?: Maybe<Scalars['Bytes']>;
    sendingAssetId_not?: Maybe<Scalars['Bytes']>;
    sendingAssetId_in?: Maybe<Array<Scalars['Bytes']>>;
    sendingAssetId_not_in?: Maybe<Array<Scalars['Bytes']>>;
    sendingAssetId_contains?: Maybe<Scalars['Bytes']>;
    sendingAssetId_not_contains?: Maybe<Scalars['Bytes']>;
    receivingAssetId?: Maybe<Scalars['Bytes']>;
    receivingAssetId_not?: Maybe<Scalars['Bytes']>;
    receivingAssetId_in?: Maybe<Array<Scalars['Bytes']>>;
    receivingAssetId_not_in?: Maybe<Array<Scalars['Bytes']>>;
    receivingAssetId_contains?: Maybe<Scalars['Bytes']>;
    receivingAssetId_not_contains?: Maybe<Scalars['Bytes']>;
    sendingChainFallback?: Maybe<Scalars['Bytes']>;
    sendingChainFallback_not?: Maybe<Scalars['Bytes']>;
    sendingChainFallback_in?: Maybe<Array<Scalars['Bytes']>>;
    sendingChainFallback_not_in?: Maybe<Array<Scalars['Bytes']>>;
    sendingChainFallback_contains?: Maybe<Scalars['Bytes']>;
    sendingChainFallback_not_contains?: Maybe<Scalars['Bytes']>;
    callTo?: Maybe<Scalars['Bytes']>;
    callTo_not?: Maybe<Scalars['Bytes']>;
    callTo_in?: Maybe<Array<Scalars['Bytes']>>;
    callTo_not_in?: Maybe<Array<Scalars['Bytes']>>;
    callTo_contains?: Maybe<Scalars['Bytes']>;
    callTo_not_contains?: Maybe<Scalars['Bytes']>;
    receivingAddress?: Maybe<Scalars['Bytes']>;
    receivingAddress_not?: Maybe<Scalars['Bytes']>;
    receivingAddress_in?: Maybe<Array<Scalars['Bytes']>>;
    receivingAddress_not_in?: Maybe<Array<Scalars['Bytes']>>;
    receivingAddress_contains?: Maybe<Scalars['Bytes']>;
    receivingAddress_not_contains?: Maybe<Scalars['Bytes']>;
    callDataHash?: Maybe<Scalars['Bytes']>;
    callDataHash_not?: Maybe<Scalars['Bytes']>;
    callDataHash_in?: Maybe<Array<Scalars['Bytes']>>;
    callDataHash_not_in?: Maybe<Array<Scalars['Bytes']>>;
    callDataHash_contains?: Maybe<Scalars['Bytes']>;
    callDataHash_not_contains?: Maybe<Scalars['Bytes']>;
    transactionId?: Maybe<Scalars['Bytes']>;
    transactionId_not?: Maybe<Scalars['Bytes']>;
    transactionId_in?: Maybe<Array<Scalars['Bytes']>>;
    transactionId_not_in?: Maybe<Array<Scalars['Bytes']>>;
    transactionId_contains?: Maybe<Scalars['Bytes']>;
    transactionId_not_contains?: Maybe<Scalars['Bytes']>;
    sendingChainId?: Maybe<Scalars['BigInt']>;
    sendingChainId_not?: Maybe<Scalars['BigInt']>;
    sendingChainId_gt?: Maybe<Scalars['BigInt']>;
    sendingChainId_lt?: Maybe<Scalars['BigInt']>;
    sendingChainId_gte?: Maybe<Scalars['BigInt']>;
    sendingChainId_lte?: Maybe<Scalars['BigInt']>;
    sendingChainId_in?: Maybe<Array<Scalars['BigInt']>>;
    sendingChainId_not_in?: Maybe<Array<Scalars['BigInt']>>;
    receivingChainId?: Maybe<Scalars['BigInt']>;
    receivingChainId_not?: Maybe<Scalars['BigInt']>;
    receivingChainId_gt?: Maybe<Scalars['BigInt']>;
    receivingChainId_lt?: Maybe<Scalars['BigInt']>;
    receivingChainId_gte?: Maybe<Scalars['BigInt']>;
    receivingChainId_lte?: Maybe<Scalars['BigInt']>;
    receivingChainId_in?: Maybe<Array<Scalars['BigInt']>>;
    receivingChainId_not_in?: Maybe<Array<Scalars['BigInt']>>;
    amount?: Maybe<Scalars['BigInt']>;
    amount_not?: Maybe<Scalars['BigInt']>;
    amount_gt?: Maybe<Scalars['BigInt']>;
    amount_lt?: Maybe<Scalars['BigInt']>;
    amount_gte?: Maybe<Scalars['BigInt']>;
    amount_lte?: Maybe<Scalars['BigInt']>;
    amount_in?: Maybe<Array<Scalars['BigInt']>>;
    amount_not_in?: Maybe<Array<Scalars['BigInt']>>;
    expiry?: Maybe<Scalars['BigInt']>;
    expiry_not?: Maybe<Scalars['BigInt']>;
    expiry_gt?: Maybe<Scalars['BigInt']>;
    expiry_lt?: Maybe<Scalars['BigInt']>;
    expiry_gte?: Maybe<Scalars['BigInt']>;
    expiry_lte?: Maybe<Scalars['BigInt']>;
    expiry_in?: Maybe<Array<Scalars['BigInt']>>;
    expiry_not_in?: Maybe<Array<Scalars['BigInt']>>;
    preparedBlockNumber?: Maybe<Scalars['BigInt']>;
    preparedBlockNumber_not?: Maybe<Scalars['BigInt']>;
    preparedBlockNumber_gt?: Maybe<Scalars['BigInt']>;
    preparedBlockNumber_lt?: Maybe<Scalars['BigInt']>;
    preparedBlockNumber_gte?: Maybe<Scalars['BigInt']>;
    preparedBlockNumber_lte?: Maybe<Scalars['BigInt']>;
    preparedBlockNumber_in?: Maybe<Array<Scalars['BigInt']>>;
    preparedBlockNumber_not_in?: Maybe<Array<Scalars['BigInt']>>;
    encryptedCallData?: Maybe<Scalars['String']>;
    encryptedCallData_not?: Maybe<Scalars['String']>;
    encryptedCallData_gt?: Maybe<Scalars['String']>;
    encryptedCallData_lt?: Maybe<Scalars['String']>;
    encryptedCallData_gte?: Maybe<Scalars['String']>;
    encryptedCallData_lte?: Maybe<Scalars['String']>;
    encryptedCallData_in?: Maybe<Array<Scalars['String']>>;
    encryptedCallData_not_in?: Maybe<Array<Scalars['String']>>;
    encryptedCallData_contains?: Maybe<Scalars['String']>;
    encryptedCallData_not_contains?: Maybe<Scalars['String']>;
    encryptedCallData_starts_with?: Maybe<Scalars['String']>;
    encryptedCallData_not_starts_with?: Maybe<Scalars['String']>;
    encryptedCallData_ends_with?: Maybe<Scalars['String']>;
    encryptedCallData_not_ends_with?: Maybe<Scalars['String']>;
    prepareCaller?: Maybe<Scalars['Bytes']>;
    prepareCaller_not?: Maybe<Scalars['Bytes']>;
    prepareCaller_in?: Maybe<Array<Scalars['Bytes']>>;
    prepareCaller_not_in?: Maybe<Array<Scalars['Bytes']>>;
    prepareCaller_contains?: Maybe<Scalars['Bytes']>;
    prepareCaller_not_contains?: Maybe<Scalars['Bytes']>;
    bidSignature?: Maybe<Scalars['Bytes']>;
    bidSignature_not?: Maybe<Scalars['Bytes']>;
    bidSignature_in?: Maybe<Array<Scalars['Bytes']>>;
    bidSignature_not_in?: Maybe<Array<Scalars['Bytes']>>;
    bidSignature_contains?: Maybe<Scalars['Bytes']>;
    bidSignature_not_contains?: Maybe<Scalars['Bytes']>;
    encodedBid?: Maybe<Scalars['String']>;
    encodedBid_not?: Maybe<Scalars['String']>;
    encodedBid_gt?: Maybe<Scalars['String']>;
    encodedBid_lt?: Maybe<Scalars['String']>;
    encodedBid_gte?: Maybe<Scalars['String']>;
    encodedBid_lte?: Maybe<Scalars['String']>;
    encodedBid_in?: Maybe<Array<Scalars['String']>>;
    encodedBid_not_in?: Maybe<Array<Scalars['String']>>;
    encodedBid_contains?: Maybe<Scalars['String']>;
    encodedBid_not_contains?: Maybe<Scalars['String']>;
    encodedBid_starts_with?: Maybe<Scalars['String']>;
    encodedBid_not_starts_with?: Maybe<Scalars['String']>;
    encodedBid_ends_with?: Maybe<Scalars['String']>;
    encodedBid_not_ends_with?: Maybe<Scalars['String']>;
    prepareTransactionHash?: Maybe<Scalars['Bytes']>;
    prepareTransactionHash_not?: Maybe<Scalars['Bytes']>;
    prepareTransactionHash_in?: Maybe<Array<Scalars['Bytes']>>;
    prepareTransactionHash_not_in?: Maybe<Array<Scalars['Bytes']>>;
    prepareTransactionHash_contains?: Maybe<Scalars['Bytes']>;
    prepareTransactionHash_not_contains?: Maybe<Scalars['Bytes']>;
    prepareMeta?: Maybe<Scalars['Bytes']>;
    prepareMeta_not?: Maybe<Scalars['Bytes']>;
    prepareMeta_in?: Maybe<Array<Scalars['Bytes']>>;
    prepareMeta_not_in?: Maybe<Array<Scalars['Bytes']>>;
    prepareMeta_contains?: Maybe<Scalars['Bytes']>;
    prepareMeta_not_contains?: Maybe<Scalars['Bytes']>;
    relayerFee?: Maybe<Scalars['BigInt']>;
    relayerFee_not?: Maybe<Scalars['BigInt']>;
    relayerFee_gt?: Maybe<Scalars['BigInt']>;
    relayerFee_lt?: Maybe<Scalars['BigInt']>;
    relayerFee_gte?: Maybe<Scalars['BigInt']>;
    relayerFee_lte?: Maybe<Scalars['BigInt']>;
    relayerFee_in?: Maybe<Array<Scalars['BigInt']>>;
    relayerFee_not_in?: Maybe<Array<Scalars['BigInt']>>;
    signature?: Maybe<Scalars['Bytes']>;
    signature_not?: Maybe<Scalars['Bytes']>;
    signature_in?: Maybe<Array<Scalars['Bytes']>>;
    signature_not_in?: Maybe<Array<Scalars['Bytes']>>;
    signature_contains?: Maybe<Scalars['Bytes']>;
    signature_not_contains?: Maybe<Scalars['Bytes']>;
    callData?: Maybe<Scalars['String']>;
    callData_not?: Maybe<Scalars['String']>;
    callData_gt?: Maybe<Scalars['String']>;
    callData_lt?: Maybe<Scalars['String']>;
    callData_gte?: Maybe<Scalars['String']>;
    callData_lte?: Maybe<Scalars['String']>;
    callData_in?: Maybe<Array<Scalars['String']>>;
    callData_not_in?: Maybe<Array<Scalars['String']>>;
    callData_contains?: Maybe<Scalars['String']>;
    callData_not_contains?: Maybe<Scalars['String']>;
    callData_starts_with?: Maybe<Scalars['String']>;
    callData_not_starts_with?: Maybe<Scalars['String']>;
    callData_ends_with?: Maybe<Scalars['String']>;
    callData_not_ends_with?: Maybe<Scalars['String']>;
    externalCallSuccess?: Maybe<Scalars['Boolean']>;
    externalCallSuccess_not?: Maybe<Scalars['Boolean']>;
    externalCallSuccess_in?: Maybe<Array<Scalars['Boolean']>>;
    externalCallSuccess_not_in?: Maybe<Array<Scalars['Boolean']>>;
    externalCallIsContract?: Maybe<Scalars['Boolean']>;
    externalCallIsContract_not?: Maybe<Scalars['Boolean']>;
    externalCallIsContract_in?: Maybe<Array<Scalars['Boolean']>>;
    externalCallIsContract_not_in?: Maybe<Array<Scalars['Boolean']>>;
    externalCallReturnData?: Maybe<Scalars['Bytes']>;
    externalCallReturnData_not?: Maybe<Scalars['Bytes']>;
    externalCallReturnData_in?: Maybe<Array<Scalars['Bytes']>>;
    externalCallReturnData_not_in?: Maybe<Array<Scalars['Bytes']>>;
    externalCallReturnData_contains?: Maybe<Scalars['Bytes']>;
    externalCallReturnData_not_contains?: Maybe<Scalars['Bytes']>;
    fulfillCaller?: Maybe<Scalars['Bytes']>;
    fulfillCaller_not?: Maybe<Scalars['Bytes']>;
    fulfillCaller_in?: Maybe<Array<Scalars['Bytes']>>;
    fulfillCaller_not_in?: Maybe<Array<Scalars['Bytes']>>;
    fulfillCaller_contains?: Maybe<Scalars['Bytes']>;
    fulfillCaller_not_contains?: Maybe<Scalars['Bytes']>;
    fulfillTransactionHash?: Maybe<Scalars['Bytes']>;
    fulfillTransactionHash_not?: Maybe<Scalars['Bytes']>;
    fulfillTransactionHash_in?: Maybe<Array<Scalars['Bytes']>>;
    fulfillTransactionHash_not_in?: Maybe<Array<Scalars['Bytes']>>;
    fulfillTransactionHash_contains?: Maybe<Scalars['Bytes']>;
    fulfillTransactionHash_not_contains?: Maybe<Scalars['Bytes']>;
    fulfillMeta?: Maybe<Scalars['Bytes']>;
    fulfillMeta_not?: Maybe<Scalars['Bytes']>;
    fulfillMeta_in?: Maybe<Array<Scalars['Bytes']>>;
    fulfillMeta_not_in?: Maybe<Array<Scalars['Bytes']>>;
    fulfillMeta_contains?: Maybe<Scalars['Bytes']>;
    fulfillMeta_not_contains?: Maybe<Scalars['Bytes']>;
    fulfillTimestamp?: Maybe<Scalars['BigInt']>;
    fulfillTimestamp_not?: Maybe<Scalars['BigInt']>;
    fulfillTimestamp_gt?: Maybe<Scalars['BigInt']>;
    fulfillTimestamp_lt?: Maybe<Scalars['BigInt']>;
    fulfillTimestamp_gte?: Maybe<Scalars['BigInt']>;
    fulfillTimestamp_lte?: Maybe<Scalars['BigInt']>;
    fulfillTimestamp_in?: Maybe<Array<Scalars['BigInt']>>;
    fulfillTimestamp_not_in?: Maybe<Array<Scalars['BigInt']>>;
    cancelCaller?: Maybe<Scalars['Bytes']>;
    cancelCaller_not?: Maybe<Scalars['Bytes']>;
    cancelCaller_in?: Maybe<Array<Scalars['Bytes']>>;
    cancelCaller_not_in?: Maybe<Array<Scalars['Bytes']>>;
    cancelCaller_contains?: Maybe<Scalars['Bytes']>;
    cancelCaller_not_contains?: Maybe<Scalars['Bytes']>;
    cancelTransactionHash?: Maybe<Scalars['Bytes']>;
    cancelTransactionHash_not?: Maybe<Scalars['Bytes']>;
    cancelTransactionHash_in?: Maybe<Array<Scalars['Bytes']>>;
    cancelTransactionHash_not_in?: Maybe<Array<Scalars['Bytes']>>;
    cancelTransactionHash_contains?: Maybe<Scalars['Bytes']>;
    cancelTransactionHash_not_contains?: Maybe<Scalars['Bytes']>;
    cancelMeta?: Maybe<Scalars['Bytes']>;
    cancelMeta_not?: Maybe<Scalars['Bytes']>;
    cancelMeta_in?: Maybe<Array<Scalars['Bytes']>>;
    cancelMeta_not_in?: Maybe<Array<Scalars['Bytes']>>;
    cancelMeta_contains?: Maybe<Scalars['Bytes']>;
    cancelMeta_not_contains?: Maybe<Scalars['Bytes']>;
    cancelTimestamp?: Maybe<Scalars['BigInt']>;
    cancelTimestamp_not?: Maybe<Scalars['BigInt']>;
    cancelTimestamp_gt?: Maybe<Scalars['BigInt']>;
    cancelTimestamp_lt?: Maybe<Scalars['BigInt']>;
    cancelTimestamp_gte?: Maybe<Scalars['BigInt']>;
    cancelTimestamp_lte?: Maybe<Scalars['BigInt']>;
    cancelTimestamp_in?: Maybe<Array<Scalars['BigInt']>>;
    cancelTimestamp_not_in?: Maybe<Array<Scalars['BigInt']>>;
};
export declare enum Transaction_OrderBy {
    Id = "id",
    Status = "status",
    ChainId = "chainId",
    PreparedTimestamp = "preparedTimestamp",
    ReceivingChainTxManagerAddress = "receivingChainTxManagerAddress",
    User = "user",
    Router = "router",
    Initiator = "initiator",
    SendingAssetId = "sendingAssetId",
    ReceivingAssetId = "receivingAssetId",
    SendingChainFallback = "sendingChainFallback",
    CallTo = "callTo",
    ReceivingAddress = "receivingAddress",
    CallDataHash = "callDataHash",
    TransactionId = "transactionId",
    SendingChainId = "sendingChainId",
    ReceivingChainId = "receivingChainId",
    Amount = "amount",
    Expiry = "expiry",
    PreparedBlockNumber = "preparedBlockNumber",
    EncryptedCallData = "encryptedCallData",
    PrepareCaller = "prepareCaller",
    BidSignature = "bidSignature",
    EncodedBid = "encodedBid",
    PrepareTransactionHash = "prepareTransactionHash",
    PrepareMeta = "prepareMeta",
    RelayerFee = "relayerFee",
    Signature = "signature",
    CallData = "callData",
    ExternalCallSuccess = "externalCallSuccess",
    ExternalCallIsContract = "externalCallIsContract",
    ExternalCallReturnData = "externalCallReturnData",
    FulfillCaller = "fulfillCaller",
    FulfillTransactionHash = "fulfillTransactionHash",
    FulfillMeta = "fulfillMeta",
    FulfillTimestamp = "fulfillTimestamp",
    CancelCaller = "cancelCaller",
    CancelTransactionHash = "cancelTransactionHash",
    CancelMeta = "cancelMeta",
    CancelTimestamp = "cancelTimestamp"
}
export declare type User = {
    __typename?: 'User';
    id: Scalars['ID'];
    transactions: Array<Transaction>;
};
export declare type UserTransactionsArgs = {
    skip?: Maybe<Scalars['Int']>;
    first?: Maybe<Scalars['Int']>;
    orderBy?: Maybe<Transaction_OrderBy>;
    orderDirection?: Maybe<OrderDirection>;
    where?: Maybe<Transaction_Filter>;
};
export declare type User_Filter = {
    id?: Maybe<Scalars['ID']>;
    id_not?: Maybe<Scalars['ID']>;
    id_gt?: Maybe<Scalars['ID']>;
    id_lt?: Maybe<Scalars['ID']>;
    id_gte?: Maybe<Scalars['ID']>;
    id_lte?: Maybe<Scalars['ID']>;
    id_in?: Maybe<Array<Scalars['ID']>>;
    id_not_in?: Maybe<Array<Scalars['ID']>>;
};
export declare enum User_OrderBy {
    Id = "id",
    Transactions = "transactions"
}
export declare type _Block_ = {
    __typename?: '_Block_';
    /** The hash of the block */
    hash?: Maybe<Scalars['Bytes']>;
    /** The block number */
    number: Scalars['Int'];
};
/** The type for the top-level _meta field */
export declare type _Meta_ = {
    __typename?: '_Meta_';
    /**
     * Information about a specific subgraph block. The hash of the block
     * will be null if the _meta field has a block constraint that asks for
     * a block number. It will be filled if the _meta field has no block constraint
     * and therefore asks for the latest  block
     *
     */
    block: _Block_;
    /** The deployment ID */
    deployment: Scalars['String'];
    /** If `true`, the subgraph encountered indexing errors at some past block */
    hasIndexingErrors: Scalars['Boolean'];
};
export declare enum _SubgraphErrorPolicy_ {
    /** Data will be returned even if the subgraph has indexing errors */
    Allow = "allow",
    /** If the subgraph has indexing errors, data will be omitted. The default. */
    Deny = "deny"
}
export declare type GetSenderTransactionsQueryVariables = Exact<{
    userId: Scalars['String'];
    sendingChainId: Scalars['BigInt'];
    status?: Maybe<TransactionStatus>;
}>;
export declare type GetSenderTransactionsQuery = {
    __typename?: 'Query';
    transactions: Array<{
        __typename?: 'Transaction';
        id: string;
        status: TransactionStatus;
        chainId: any;
        preparedTimestamp: any;
        initiator: any;
        receivingChainTxManagerAddress: any;
        sendingAssetId: any;
        receivingAssetId: any;
        sendingChainFallback: any;
        receivingAddress: any;
        callTo: any;
        sendingChainId: any;
        receivingChainId: any;
        callDataHash: any;
        transactionId: any;
        amount: any;
        expiry: any;
        preparedBlockNumber: any;
        encryptedCallData: string;
        encodedBid: string;
        bidSignature: any;
        prepareCaller?: Maybe<any>;
        fulfillCaller?: Maybe<any>;
        cancelCaller?: Maybe<any>;
        prepareTransactionHash: any;
        fulfillTransactionHash?: Maybe<any>;
        cancelTransactionHash?: Maybe<any>;
        user: {
            __typename?: 'User';
            id: string;
        };
        router: {
            __typename?: 'Router';
            id: string;
        };
    }>;
};
export declare type GetReceiverTransactionsQueryVariables = Exact<{
    userId: Scalars['String'];
    receivingChainId: Scalars['BigInt'];
    status?: Maybe<TransactionStatus>;
}>;
export declare type GetReceiverTransactionsQuery = {
    __typename?: 'Query';
    transactions: Array<{
        __typename?: 'Transaction';
        id: string;
        status: TransactionStatus;
        chainId: any;
        preparedTimestamp: any;
        initiator: any;
        receivingChainTxManagerAddress: any;
        sendingAssetId: any;
        receivingAssetId: any;
        sendingChainFallback: any;
        receivingAddress: any;
        callTo: any;
        sendingChainId: any;
        receivingChainId: any;
        callDataHash: any;
        transactionId: any;
        amount: any;
        expiry: any;
        preparedBlockNumber: any;
        encryptedCallData: string;
        encodedBid: string;
        bidSignature: any;
        prepareCaller?: Maybe<any>;
        fulfillCaller?: Maybe<any>;
        cancelCaller?: Maybe<any>;
        prepareTransactionHash: any;
        fulfillTransactionHash?: Maybe<any>;
        cancelTransactionHash?: Maybe<any>;
        user: {
            __typename?: 'User';
            id: string;
        };
        router: {
            __typename?: 'Router';
            id: string;
        };
    }>;
};
export declare type GetTransactionQueryVariables = Exact<{
    transactionId: Scalars['ID'];
}>;
export declare type GetTransactionQuery = {
    __typename?: 'Query';
    transaction?: Maybe<{
        __typename?: 'Transaction';
        id: string;
        status: TransactionStatus;
        chainId: any;
        preparedTimestamp: any;
        initiator: any;
        receivingChainTxManagerAddress: any;
        sendingAssetId: any;
        receivingAssetId: any;
        sendingChainFallback: any;
        receivingAddress: any;
        callTo: any;
        sendingChainId: any;
        receivingChainId: any;
        callDataHash: any;
        transactionId: any;
        amount: any;
        expiry: any;
        preparedBlockNumber: any;
        encryptedCallData: string;
        encodedBid: string;
        bidSignature: any;
        relayerFee?: Maybe<any>;
        signature?: Maybe<any>;
        prepareCaller?: Maybe<any>;
        fulfillCaller?: Maybe<any>;
        cancelCaller?: Maybe<any>;
        prepareTransactionHash: any;
        fulfillTransactionHash?: Maybe<any>;
        cancelTransactionHash?: Maybe<any>;
        user: {
            __typename?: 'User';
            id: string;
        };
        router: {
            __typename?: 'Router';
            id: string;
        };
    }>;
};
export declare type GetTransactionsQueryVariables = Exact<{
    transactionIds?: Maybe<Array<Scalars['Bytes']> | Scalars['Bytes']>;
}>;
export declare type GetTransactionsQuery = {
    __typename?: 'Query';
    transactions: Array<{
        __typename?: 'Transaction';
        id: string;
        status: TransactionStatus;
        chainId: any;
        preparedTimestamp: any;
        initiator: any;
        receivingChainTxManagerAddress: any;
        sendingAssetId: any;
        receivingAssetId: any;
        sendingChainFallback: any;
        receivingAddress: any;
        callTo: any;
        sendingChainId: any;
        receivingChainId: any;
        callDataHash: any;
        transactionId: any;
        amount: any;
        expiry: any;
        preparedBlockNumber: any;
        encryptedCallData: string;
        encodedBid: string;
        bidSignature: any;
        relayerFee?: Maybe<any>;
        signature?: Maybe<any>;
        callData?: Maybe<string>;
        prepareCaller?: Maybe<any>;
        fulfillCaller?: Maybe<any>;
        cancelCaller?: Maybe<any>;
        prepareTransactionHash: any;
        fulfillTransactionHash?: Maybe<any>;
        cancelTransactionHash?: Maybe<any>;
        user: {
            __typename?: 'User';
            id: string;
        };
        router: {
            __typename?: 'Router';
            id: string;
        };
    }>;
};
export declare type GetTransactionsWithUserQueryVariables = Exact<{
    transactionIds?: Maybe<Array<Scalars['Bytes']> | Scalars['Bytes']>;
    userId: Scalars['String'];
}>;
export declare type GetTransactionsWithUserQuery = {
    __typename?: 'Query';
    transactions: Array<{
        __typename?: 'Transaction';
        id: string;
        status: TransactionStatus;
        chainId: any;
        preparedTimestamp: any;
        initiator: any;
        receivingChainTxManagerAddress: any;
        sendingAssetId: any;
        receivingAssetId: any;
        sendingChainFallback: any;
        receivingAddress: any;
        callTo: any;
        sendingChainId: any;
        receivingChainId: any;
        callDataHash: any;
        transactionId: any;
        amount: any;
        expiry: any;
        preparedBlockNumber: any;
        encryptedCallData: string;
        encodedBid: string;
        bidSignature: any;
        relayerFee?: Maybe<any>;
        signature?: Maybe<any>;
        callData?: Maybe<string>;
        prepareCaller?: Maybe<any>;
        fulfillCaller?: Maybe<any>;
        cancelCaller?: Maybe<any>;
        prepareTransactionHash: any;
        fulfillTransactionHash?: Maybe<any>;
        cancelTransactionHash?: Maybe<any>;
        user: {
            __typename?: 'User';
            id: string;
        };
        router: {
            __typename?: 'Router';
            id: string;
        };
    }>;
};
export declare type GetBlockNumberQueryVariables = Exact<{
    [key: string]: never;
}>;
export declare type GetBlockNumberQuery = {
    __typename?: 'Query';
    _meta?: Maybe<{
        __typename?: '_Meta_';
        block: {
            __typename?: '_Block_';
            number: number;
        };
    }>;
};
export declare const GetSenderTransactionsDocument: import("graphql/language/ast").DocumentNode;
export declare const GetReceiverTransactionsDocument: import("graphql/language/ast").DocumentNode;
export declare const GetTransactionDocument: import("graphql/language/ast").DocumentNode;
export declare const GetTransactionsDocument: import("graphql/language/ast").DocumentNode;
export declare const GetTransactionsWithUserDocument: import("graphql/language/ast").DocumentNode;
export declare const GetBlockNumberDocument: import("graphql/language/ast").DocumentNode;
export declare type SdkFunctionWrapper = <T>(action: (requestHeaders?: Record<string, string>) => Promise<T>, operationName: string) => Promise<T>;
export declare function getSdk(client: GraphQLClient, withWrapper?: SdkFunctionWrapper): {
    GetSenderTransactions(variables: GetSenderTransactionsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetSenderTransactionsQuery>;
    GetReceiverTransactions(variables: GetReceiverTransactionsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetReceiverTransactionsQuery>;
    GetTransaction(variables: GetTransactionQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetTransactionQuery>;
    GetTransactions(variables?: Exact<{
        transactionIds?: any;
    }> | undefined, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetTransactionsQuery>;
    GetTransactionsWithUser(variables: GetTransactionsWithUserQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetTransactionsWithUserQuery>;
    GetBlockNumber(variables?: Exact<{
        [key: string]: never;
    }> | undefined, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetBlockNumberQuery>;
};
export declare type Sdk = ReturnType<typeof getSdk>;
//# sourceMappingURL=graphqlsdk.d.ts.map