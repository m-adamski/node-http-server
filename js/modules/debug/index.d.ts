import * as Winston from "winston";

export class Debug {

    private _debugStatus: boolean;
    protected _winstonLogger: Winston.LoggerInstance;

    constructor(status?: boolean);
    addTransporter(transporter: Winston.TransportInstance, transporterConfig?: Winston.TransportOptions): void;
    log(logLevel: string, logMessage: string, logOwner?: string, logCallback?: Winston.LogCallback): void;
    debugStatus(): boolean;
    debugStatus(value: boolean);
}
