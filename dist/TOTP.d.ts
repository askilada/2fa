export declare class TOTP {
    private secret;
    private stepSize;
    private algorithm;
    constructor(secret: string, stepSize?: number, algorithm?: string);
    generateCode: () => string;
    private calculateCurrentStep;
    static generateCode: (secret: string, stepSize: number, algorithm?: string) => string;
}
