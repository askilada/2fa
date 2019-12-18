"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HOTP_1 = require("./HOTP");
var TOTP_1 = require("./TOTP");
var key = "WITQ5HMIICWKX5YE7CSKGWVX";
var code = HOTP_1.HOTP.generateOTP(key, 0);
console.log("Code::!", code);
var code2 = TOTP_1.TOTP.generateCode(key);
console.log("Code 2", code2);
//# sourceMappingURL=test.js.map