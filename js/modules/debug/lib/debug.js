import * as Winston from "winston";
export class Debug {
    constructor(status) {
        this._debugStatus = status || false;
        this._winstonLogger = new Winston.Logger();
    }
    addTransporter(transporter, transporterConfig) {
        this._winstonLogger.add(transporter, transporterConfig);
    }
    log(logLevel, logMessage, logOwner, logCallback) {
        if (this._debugStatus) {
            if (logOwner) {
                this._winstonLogger.log(logLevel, `${logOwner} - ${logMessage}`, logCallback);
            }
            else {
                this._winstonLogger.log(logLevel, `${logMessage}`, logCallback);
            }
        }
    }
    get debugStatus() {
        return this._debugStatus;
    }
    set debugStatus(value) {
        this._debugStatus = value;
    }
}
//# sourceMappingURL=debug.js.map