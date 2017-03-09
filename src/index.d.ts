import * as Hapi from "hapi";

declare module "node-http-server" {

    export class HttpServer {
        constructor(hapiConfig?: Hapi.IServerConnectionOptions);
        registerRoute(hapiRoute: Hapi.IRouteConfiguration): void;
        startServer(): void;
    }
}
