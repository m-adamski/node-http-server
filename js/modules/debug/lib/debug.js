import * as Winston from "winston";
export class Debug {
    constructor(status) {
        this.debugStatus = status || false;
        this.winstonLogger = new Winston.Logger();
    }
    addTransporter(transporter, transporterConfig) {
        this.winstonLogger.add(transporter, transporterConfig);
    }
    log(logLevel, logMessage, logCallback) {
        if (this.debugStatus) {
            this.winstonLogger.log(logLevel, logMessage, logCallback);
        }
    }
}
//# sourceMappingURL=debug.js.map