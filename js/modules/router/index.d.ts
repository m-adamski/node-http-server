import * as Hapi from "hapi";
import {Debug} from "../debug/index";
import {HttpServer} from "../http-server/index";
import {Config} from "../config/index";
import {Controller} from "../controller/index";

export class Router {

    protected _httpService: HttpServer;
    protected _debugService: Debug;
    protected _configService: Config;
    protected _controllersCollection: Map<string, Controller>;

    constructor(httpService: HttpServer, debugService: Debug, configService: Config);
    registerController(controller: Controller): void;
}

export class Route implements Hapi.IRouteConfiguration {
    path: string;
    method: string|string[];
    vhost?: string;
    handler?: Hapi.ISessionHandler | Hapi.IStrictSessionHandler | string | Hapi.IRouteHandlerConfig;
    config?: Hapi.IRouteAdditionalConfigurationOptions;
}
