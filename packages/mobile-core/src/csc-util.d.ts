import { Amount, Memo, CasinocoindAmount, CasinocoinMemo, CSCURI } from './csc-types';
export declare class CSCUtil {
    static casinocoinToUnixTimestamp(rpepoch: number): number;
    static unixToCasinocoinTimestamp(timestamp: number): number;
    static casinocoinTimeToISO8601(casinocoinTime: number): string;
    static iso8601ToCasinocoinTime(iso8601: string): number;
    static casinocoinTimeNow(): number;
    static isoTimeNow(): string;
    static dropsToCsc(drops: string): string;
    static cscToDrops(csc: string): string;
    static toCasinocoindAmount(amount: Amount): CasinocoindAmount;
    static decodeMemos(memos: Array<CasinocoinMemo>): Array<Memo> | undefined;
    static encodeMemo(inputMemo: Memo): CasinocoinMemo;
    static decodeInvoiceID(hex: string): string;
    static encodeInvoiceID(encodeString: string): string;
    static validateAccountID(accountID: string): boolean;
    static convertStringVersionToNumber(version: string): any;
    static generateCXXQRCodeURI(address: string): string;
    static generateCSCQRCodeURI(input: CSCURI): string;
    static decodeCSCQRCodeURI(input: string): CSCURI;
}
