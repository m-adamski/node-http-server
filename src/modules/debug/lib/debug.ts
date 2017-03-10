import * as Winston from "winston";

export class Debug {

    protected debugStatus: boolean;
    protected winstonLogger: Winston.LoggerInstance;

    /**
     * Create instance of Debug.
     *
     * @param status
     */
    constructor(status?: boolean) {
        this.debugStatus = status || false;
        this.winstonLogger = new Winston.Logger();
    }

    /**
     * Add Transporter.
     *
     * @param transporter
     * @param transporterConfig
     */
    public addTransporter(transporter: Winston.TransportInstance, transporterConfig: Winston.TransportOptions): void {
        this.winstonLogger.add(transporter, transporterConfig);
    }

    /**
     * Log.
     *
     * @param logLevel
     * @param logMessage
     * @param logCallback
     */
    public log(logLevel: string, logMessage: string, logCallback?: Winston.LogCallback): void {
        if (this.debugStatus) {
            this.winstonLogger.log(logLevel, logMessage, logCallback);
        }
    }
}
