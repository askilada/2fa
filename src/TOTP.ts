import {HOTP} from "./HOTP";

export class TOTP {

    constructor(
        private secret: string,
        private stepSize: number = 30,
        private algorithm: string = 'sha1'
    ) {}

    generateCode = () => {
        return HOTP.generateOTP(this.secret, this.calculateCurrentStep())
    }

    private calculateCurrentStep = () => {
        const currentTime = Math.floor(Date.now() / 1000)
        return Math.floor((currentTime - 0) / this.stepSize)
    }

    static generateCode = (secret: string, stepSize: number, algorithm: string = 'sha1') => {
        const totp = new TOTP(secret, stepSize, algorithm)
        return totp.generateCode()
    }

}