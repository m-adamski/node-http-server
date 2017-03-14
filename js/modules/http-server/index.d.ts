import * as Hapi from "hapi";
import {Router, Route} from "../router/index";
import {Config} from "../config/index";
import {Debug} from "../debug/index";
import {AuthProvider} from "../provider/index";

export class HttpServer {

    protected _hapiServer: Hapi.Server;
    private _authProvider: AuthProvider;
    private _debugService: Debug;
    private _configService: Config;
    private _routerService: Router;

    constructor(httpServerConfig: HttpServerConfig, authProvider: AuthProvider, debugService: Debug, configService: Config);
    startServer(): void;
    registerRoute(route: Route): void;
    routerService: Router;
}

export class HttpServerTokenAuth {
    static register(hapiServer: Hapi.Server, authProvider: AuthProvider): void;
}

export class HttpServerConfig implements Hapi.IServerConnectionOptions {

    host?: string;
    address?: string;
    port?: string | number;
    uri?: string;
    listener?: any;
    autoListen?: boolean;
    cache?: {
        statuses: number[];
    };
    labels?: string | string[];
    tls?: boolean | {key?: string; cert?: string; pfx?: string;} | Object;
}
