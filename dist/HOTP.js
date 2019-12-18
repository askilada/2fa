"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var crypto_1 = require("crypto");
var base32 = require("hi-base32");
var HOTP = /** @class */ (function () {
    function HOTP(secret, counter, algorithm) {
        var _this = this;
        if (algorithm === void 0) { algorithm = 'sha1'; }
        this.secret = secret;
        this.counter = counter;
        this.algorithm = algorithm;
        this.generateOTP = function () {
            var counter = _this.makeCounterBuffer();
            var secret = _this.readSecret();
            var hmac = crypto_1.createHmac(_this.algorithm, secret);
            hmac.update(counter);
            var hmacHash = hmac.digest();
            var binCode = _this.truncation(hmacHash);
            return (binCode % Math.pow(10, 6)).toString().padStart(6, '0');
        };
        this.truncation = function (data) {
            var offsetByte = data.slice(19, 20);
            var offsetBites = offsetByte[0] & 0xf;
            var binCode = (data[offsetBites] & 0x7f) << 24 |
                (data[offsetBites + 1] & 0xff) << 16 |
                (data[offsetBites + 2] & 0xff) << 8 |
                (data[offsetBites + 3] & 0xff);
            return binCode;
        };
        this.makeCounterBuffer = function () {
            var counterHex = _this.counter.toString(16).padStart(16, '0');
            return Buffer.from(counterHex, 'hex');
        };
        this.readSecret = function () {
            return Buffer.from(base32.decode.asBytes(_this.secret));
        };
    }
    HOTP.generateOTP = function (secret, counter, algorithm) {
        if (algorithm === void 0) { algorithm = "sha1"; }
        var hotp = new HOTP(secret, counter, algorithm);
        return hotp.generateOTP();
    };
    return HOTP;
}());
exports.HOTP = HOTP;
//# sourceMappingURL=HOTP.js.map