import * as Hapi from "hapi";
import {Debug} from "../../debug/lib/debug";

export class HttpServer {
    protected _hapiConfig: Hapi.IServerConnectionOptions;
    protected _hapiServer: Hapi.Server;

    constructor(hapiConfig?: Hapi.IServerConnectionOptions);
    public debugService(value: Debug): void;
    public registerRoute(hapiRoute: Hapi.IRouteConfiguration): void;
    public startServer(): void;
}
