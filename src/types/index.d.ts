import * as Winston from "winston";
import * as Hapi from "hapi";

export = NodeHttpServer;
export as namespace NodeHttpServer;

declare namespace NodeHttpServer {

    /**
     * Config Class.
     */
    export class Config {
        protected configFile: string;
        protected configContent: Object;

        constructor(configFile: string);
        get($propertyPath?: string): any;
    }

    /**
     * Debug Class.
     */
    export class Debug {
        protected debugStatus: boolean;
        protected winstonLogger: Winston.LoggerInstance;

        constructor(status?: boolean);
        public addTransporter(transporter: Winston.TransportInstance, transporterConfig: Winston.TransportOptions): void;
        public log(logLevel: string, logMessage: string, logCallback?: Winston.LogCallback): void;
    }

    /**
     * HttpServer Class.
     */
    export class HttpServer {
        protected hapiConfig: Hapi.IServerConnectionOptions;
        protected hapiServer: Hapi.Server;

        constructor(hapiConfig?: Hapi.IServerConnectionOptions);
        registerRoute(hapiRoute: Hapi.IRouteConfiguration): void
        startServer(): void;
    }
}
