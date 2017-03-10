import * as Winston from "winston";

export class Debug {
    protected _debugStatus: boolean;
    protected _winstonLogger: Winston.LoggerInstance;

    constructor(status?: boolean);
    public addTransporter(transporter: Winston.TransportInstance, transporterConfig: Winston.TransportOptions): void;
    public log(logLevel: string, logMessage: string, logOwner?: string, logCallback?: Winston.LogCallback): void;
    public debugStatus(): boolean;
    public debugStatus(value: boolean);
}
