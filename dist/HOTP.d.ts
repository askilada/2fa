export declare class HOTP {
    private secret;
    private counter;
    private algorithm;
    constructor(secret: string, counter: number, algorithm?: string);
    static generateOTP: (secret: string, counter: number, algorithm?: string) => string;
    generateOTP: () => string;
    private truncation;
    private makeCounterBuffer;
    private readSecret;
}
