import { LokiKey } from './lokijs';
export declare class CSCCrypto {
    static english: string[];
    private static PASSPHRASE_WORD_COUNT;
    private IV_LENGTH;
    private SALT_LENGTH;
    private pbkdf2KeyLength;
    private pbkdf2Rounds;
    private passwordKey;
    private passwordSalt;
    constructor(password?: string | Array<string> | undefined, salt?: string);
    static randomIntFromInterval(min: number, max: number): number;
    static getPasswordHash(walletUUID: string, password: string): string;
    static getRandomMnemonic(): Array<string>;
    static isExistingWord(word: string): boolean;
    encrypt(inputValue: string): string;
    decrypt(encryptedInput: string): string | null;
    getPasswordKey(): string;
    setPasswordKey(hash: string): void;
    getPasswordSalt(): string;
    setPasswordSalt(salt: string): void;
    generateKeyPair(sequence: number): LokiKey;
    urlsafe_escape(data: string): string;
    urlsafe_unescape(data: string): string;
}
