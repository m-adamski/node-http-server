"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Winston = require("winston");
var Debug = (function () {
    function Debug(status) {
        this._debugStatus = status || false;
        this._winstonLogger = new Winston.Logger();
    }
    Debug.prototype.addTransporter = function (transporter, transporterConfig) {
        this._winstonLogger.add(transporter, transporterConfig);
    };
    Debug.prototype.log = function (logLevel, logMessage, logOwner, logCallback) {
        if (this._debugStatus) {
            if (logOwner) {
                this._winstonLogger.log(logLevel, logOwner + " - " + logMessage, logCallback);
            }
            else {
                this._winstonLogger.log(logLevel, "" + logMessage, logCallback);
            }
        }
    };
    Object.defineProperty(Debug.prototype, "debugStatus", {
        get: function () {
            return this._debugStatus;
        },
        set: function (value) {
            this._debugStatus = value;
        },
        enumerable: true,
        configurable: true
    });
    return Debug;
}());
exports.Debug = Debug;
//# sourceMappingURL=debug.js.map