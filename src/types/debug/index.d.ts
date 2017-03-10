import * as Winston from "winston";

export = DebugModule;
export as namespace DebugModule;

declare namespace DebugModule {

    export class Debug {
        protected debugStatus: boolean;
        protected winstonLogger: Winston.LoggerInstance;

        constructor(status?: boolean);
        public addTransporter(transporter: Winston.TransportInstance, transporterConfig: Winston.TransportOptions): void;
        public log(logLevel: string, logMessage: string, logCallback?: Winston.LogCallback): void;
    }
}
