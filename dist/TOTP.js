"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HOTP_1 = require("./HOTP");
var TOTP = /** @class */ (function () {
    function TOTP(secret, stepSize, algorithm) {
        var _this = this;
        if (stepSize === void 0) { stepSize = 30; }
        if (algorithm === void 0) { algorithm = 'sha1'; }
        this.secret = secret;
        this.stepSize = stepSize;
        this.algorithm = algorithm;
        this.generateCode = function () {
            return HOTP_1.HOTP.generateOTP(_this.secret, _this.calculateCurrentStep());
        };
        this.calculateCurrentStep = function () {
            var currentTime = Math.floor(Date.now() / 1000);
            return Math.floor((currentTime - 0) / _this.stepSize);
        };
    }
    TOTP.generateCode = function (secret, stepSize, algorithm) {
        if (algorithm === void 0) { algorithm = 'sha1'; }
        var totp = new TOTP(secret, stepSize, algorithm);
        return totp.generateCode();
    };
    return TOTP;
}());
exports.TOTP = TOTP;
//# sourceMappingURL=TOTP.js.map