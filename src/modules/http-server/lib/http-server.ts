import * as Hapi from "hapi";
import {Debug} from "../../debug/lib/debug";
import {Route} from "../../router/lib/route";
import {HttpServerConfig} from "./http-server-config";
import {Config} from "../../config/lib/config";
import {Router} from "../../router/lib/router";
import {HttpServerTokenAuth} from "./http-server-auth";
import {AuthProvider} from "../../../providers/auth-provider";

export class HttpServer {

    protected _hapiServer: Hapi.Server;
    private _authProvider: AuthProvider;
    private _debugService: Debug;
    private _configService: Config;
    private _routerService: Router;

    /**
     * Create instance of HttpServer.
     *
     * @param httpServerConfig
     * @param authProvider;
     * @param debugService
     * @param configService
     */
    constructor(httpServerConfig: HttpServerConfig, authProvider: AuthProvider, debugService: Debug, configService: Config) {

        // Init Hapi Server
        this._hapiServer = this.initHapi(httpServerConfig);

        // Assign variables
        this._authProvider = authProvider;
        this._debugService = debugService;
        this._configService = configService;

        // Init Router
        this._routerService = new Router(this, debugService, configService);
    }

    /**
     * Run HTTP Server.
     */
    public startServer(): void {
        this._hapiServer.start((error) => {
            if (error) {
                throw error;
            }

            this.logMessage("info", `Server running at: ${this._hapiServer.info.uri}`);
        });
    }

    /**
     * Register Route.
     *
     * @param route
     */
    public registerRoute(route: Route): void {

        let matchStatus = false;
        if (!Array.isArray(route.method)) {
            matchStatus = (this._hapiServer.match(route.method, route.path) != null);
        } else {

            route.method.forEach((method) => {
                if (this._hapiServer.match(method, route.path) != null) {
                    matchStatus = true;
                    return false;
                }
            });
        }

        if (!matchStatus) {
            this._hapiServer.route(route);
        } else {
            this.logMessage("error", `Route [${route.method}] ${route.path} is already registered`);
        }
    }

    /**
     * Get Router Service.
     *
     * @return {Router}
     */
    get routerService(): Router {
        return this._routerService;
    }

    /**
     * Init HTTP Server.
     *
     * @param httpServerConfig
     * @return {Server}
     */
    private initHapi(httpServerConfig: HttpServerConfig): Hapi.Server {

        // Init Hapi Server
        let hapiServer = new Hapi.Server();
        hapiServer.connection(httpServerConfig);

        // Register additional module
        // Registration process is different than specification because
        // it does not work correctly with current routes definition method
        // https://hapijs.com/tutorials/auth?lang=en_US
        HttpServerTokenAuth.register(hapiServer, this._authProvider);

        // Define Hapi Event Listeners
        this.defineEventListeners(hapiServer);

        return hapiServer;
    }

    /**
     * Define Event Listeners.
     *
     * @param hapiServer
     */
    private defineEventListeners(hapiServer: Hapi.Server): void {

        // Define Request Event Listener
        hapiServer.on("request", (request) => {
            this.logMessage("info", `New request: [${request.info.remoteAddress}] [${request.method.toUpperCase()}] ${request.path}`);
        });

        // Define Route Event Listener
        hapiServer.on("route", (route) => {
            this.logMessage("info", `New route added: [${route.method.toUpperCase()}] ${route.path}`);
        });

        // Define Request Error Event Listener
        hapiServer.on("request-error", (request, err) => {
            this.logMessage("error", `Error response (500) sent for request: [${request.info.remoteAddress}] [${request.method.toUpperCase()}] ${request.path} because: ${err.message}`);
        });
    }

    /**
     * Log Message.
     *
     * @param logLevel
     * @param logMessage
     */
    private logMessage(logLevel: string, logMessage: string) {
        if (this._debugService) {
            this._debugService.log(logLevel, logMessage, "HTTP Server");
        }
    }
}
