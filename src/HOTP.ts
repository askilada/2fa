import {createHmac} from 'crypto'
import * as base32 from 'hi-base32'

export class HOTP {

    constructor(
        private secret: string,
        private counter: number,
        private algorithm: string = 'sha1'
    ) {}

    static generateOTP = (secret: string, counter: number, algorithm: string = "sha1") => {
        const hotp = new HOTP(secret, counter, algorithm)
        return hotp.generateOTP()
    }

    generateOTP = () => {
        const counter = this.makeCounterBuffer()
        const secret = this.readSecret()

        const hmac = createHmac(this.algorithm, secret)
        hmac.update(counter)

        const hmacHash = hmac.digest()
        const binCode = this.truncation(hmacHash)

        return (binCode % Math.pow(10, 6)).toString().padStart(6, '0')

    }

    private truncation = (data: Buffer) => {
        const offsetByte = data.slice(19, 20)
        const offsetBites = offsetByte[0] & 0xf

        const binCode = (data[offsetBites] & 0x7f) << 24 |
            (data[offsetBites + 1] & 0xff) << 16 |
            (data[offsetBites + 2] & 0xff) << 8 |
            (data[offsetBites + 3] & 0xff)

        return binCode

    }

    private makeCounterBuffer = () => {
        const counterHex = this.counter.toString(16).padStart(16,'0')
        return Buffer.from(counterHex, 'hex')
    }

    private readSecret = () => {
        return Buffer.from(base32.decode.asBytes(this.secret))
    }

}