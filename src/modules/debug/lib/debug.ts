import * as Winston from "winston";

export class Debug {

    private _debugStatus: boolean;
    protected _winstonLogger: Winston.LoggerInstance;

    /**
     * Create instance of Debug.
     *
     * @param status
     */
    constructor(status?: boolean) {
        this._debugStatus = status || false;
        this._winstonLogger = new Winston.Logger();
    }

    /**
     * Add Transporter.
     *
     * @param transporter
     * @param transporterConfig
     */
    public addTransporter(transporter: Winston.TransportInstance, transporterConfig?: Winston.TransportOptions): void {
        this._winstonLogger.add(transporter, transporterConfig);
    }

    /**
     * Log.
     *
     * @param logLevel
     * @param logMessage
     * @param logOwner
     * @param logCallback
     */
    public log(logLevel: string, logMessage: string, logOwner?: string, logCallback?: Winston.LogCallback): void {

        if (this._debugStatus) {
            if (logOwner) {
                this._winstonLogger.log(logLevel, `${logOwner} - ${logMessage}`, logCallback);
            } else {
                this._winstonLogger.log(logLevel, `${logMessage}`, logCallback);
            }
        }
    }

    /**
     * Get current Debug status.
     *
     * @return {boolean}
     */
    get debugStatus(): boolean {
        return this._debugStatus;
    }

    /**
     * Set Debug status.
     *
     * @param value
     */
    set debugStatus(value: boolean) {
        this._debugStatus = value;
    }
}
