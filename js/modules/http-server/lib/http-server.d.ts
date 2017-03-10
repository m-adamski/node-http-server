import * as Hapi from "hapi";

export class HttpServer {
    protected hapiConfig: Hapi.IServerConnectionOptions;
    protected hapiServer: Hapi.Server;

    constructor(hapiConfig?: Hapi.IServerConnectionOptions);
    registerRoute(hapiRoute: Hapi.IRouteConfiguration): void
    startServer(): void;
}
