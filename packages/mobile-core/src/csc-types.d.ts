import { Int } from 'int';
export interface PrepareTxPayment {
    source: string;
    destination: string;
    amountDrops: string;
    feeDrops: string;
    description?: string;
    invoiceID?: string;
    sourceTag?: typeof Int;
    destinationTag?: typeof Int;
}
export interface CasinocoinTxObject {
    TransactionType: string;
    Account: string;
    Destination: string;
    Amount: string;
    Fee: string;
    Flags: number;
    Sequence: number;
    LastLedgerSequence: number;
    InvoiceID?: string;
    Memos?: Array<CasinocoinMemo>;
    SourceTag?: typeof Int;
    DestinationTag?: typeof Int;
    TxnSignature?: string;
    SigningPubKey?: string;
}
export interface CasinocoinSignerListTx {
    TransactionType: string;
    Account: string;
    Fee: string;
    Flags: number;
    SignerQuorum: number;
    SignerEntries: [{
        SignerEntry: {
            Account: string;
            SignerWeight: number;
        };
    }];
    TxnSignature?: string;
    SigningPubKey?: string;
}
export interface CasinocoinMemo {
    Memo: {
        MemoData?: string | undefined;
        MemoFormat?: string | undefined;
        MemoType?: string | undefined;
    };
}
export interface CasinocoindAmountIOU {
    currency: string;
    value: string;
    issuer?: string;
}
export declare type CasinocoindAmount = string | CasinocoindAmountIOU;
export interface Amount {
    value: string;
    currency: string;
    counterparty?: string;
}
export interface LaxLaxAmount {
    currency: string;
    value?: string;
    counterparty?: string;
}
export interface Issue {
    currency: string;
    counterparty?: string;
}
export interface Adjustment {
    address: string;
    amount: Amount;
    tag?: number;
}
export interface MaxAdjustment {
    address: string;
    maxAmount: Amount;
    tag?: number;
}
export interface MinAdjustment {
    address: string;
    minAmount: Amount;
    tag?: number;
}
export interface Memo {
    memo: {
        memoType?: string | undefined;
        memoFormat?: string | undefined;
        memoData?: string | undefined;
    };
}
export interface PaymentFlags {
    NoCasinocoinDirect: 0x00010000;
    PartialPayment: 0x00020000;
    LimitQuality: 0x00040000;
}
export interface Payment {
    source: Adjustment | MaxAdjustment;
    destination: Adjustment | MinAdjustment;
    paths?: string;
    memos?: Array<Memo>;
    invoiceID?: string;
    allowPartialPayment?: boolean;
    noDirectCasinocoin?: boolean;
    limitQuality?: boolean;
}
export interface Instructions {
    sequence?: number;
    fee?: string;
    maxFee?: string;
    maxLedgerVersion?: number;
    maxLedgerVersionOffset?: number;
    signersCount?: number;
}
export interface Prepare {
    txJSON: string;
    instructions: {
        fee: string;
        sequence: number;
        maxLedgerVersion?: number;
    };
}
export interface CSCURI {
    address: string;
    token: string;
    amount?: string;
    destinationTag?: number;
    label?: string;
    secret?: string;
}
export interface WalletSetup {
    userEmail: string;
    userPassword: string;
    recoveryMnemonicWords: string[];
    walletUUID: string;
    walletPasswordHash: string;
    walletLocation?: string;
    backupLocation?: string;
    testNetwork: boolean;
}
export interface WalletDefinition {
    walletUUID: string;
    creationDate: number;
    location: string;
    userEmail: string;
    passwordHash: string;
    mnemonicHash: string;
    network: string;
}
export interface WalletSettings {
    enableOSKB: boolean;
    showNotifications: boolean;
    fiatCurrency: string;
    walletUser: string;
    walletLanguage: string;
    styleTheme: string;
}
export interface LedgerStreamMessages {
    fee_base: number;
    fee_ref: number;
    ledger_hash: string;
    ledger_index: number;
    ledger_time: number;
    reserve_base: number;
    reserve_inc: number;
    txn_count?: number;
    type?: string;
    validated_ledgers: string;
}
export interface TokenType {
    PK: string;
    ApiEndpoint: string;
    ContactEmail: string;
    Flags: number;
    FullName: string;
    IconURL: string;
    Issuer: string;
    Token: string;
    TotalSupply: string;
    Website: string;
    AccountID: string;
    Activated: boolean;
    External: boolean;
    Balance: string;
    OwnerCount: number;
    TokenBalance: string;
    CoinValue: string;
    AccountLabel: string;
}
export interface TokenConfigData {
    ApiEndpoint: string;
    ContactEmail: string;
    Flags: number;
    FullName: string;
    IconURL: string;
    Issuer: string;
    Token: string;
    TotalSupply: string;
    Website: string;
}
export interface ServerDefinition {
    server_id: string;
    server_url: string;
    server_name: string;
    public_key?: string;
    response_time?: number;
    connected?: boolean;
    serverState?: string;
    completeLedgers?: string;
}
