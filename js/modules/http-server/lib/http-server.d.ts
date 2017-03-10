import * as Hapi from "hapi";
import {Debug} from "../../debug/lib/debug";

export class HttpServer {
    protected _hapiServer: Hapi.Server;
    protected _debugService: Debug;

    constructor(hapiConfig?: Hapi.IServerConnectionOptions);
    public debugService(value: Debug): void;
    public registerRoute(hapiRoute: Hapi.IRouteConfiguration): void;
    public startServer(): void;
}
