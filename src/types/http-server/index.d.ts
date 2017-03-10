import {Server, IServerConnectionOptions, IRouteConfiguration} from "hapi";

export = HttpServerModule;
export as namespace HttpServerModule;

declare namespace HttpServerModule {

    export class HttpServer {
        protected hapiConfig: IServerConnectionOptions;
        protected hapiServer: Server;

        constructor(hapiConfig?: IServerConnectionOptions);
        registerRoute(hapiRoute: IRouteConfiguration): void
        startServer(): void;
    }
}
