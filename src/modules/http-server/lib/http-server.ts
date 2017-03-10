import * as Hapi from "hapi";
import {Debug} from "../../debug/lib/debug";

export class HttpServer {

    protected _hapiServer: Hapi.Server;
    private _debugService: Debug;

    /**
     * Create instance of HttpServer.
     *
     * @param hapiConfig
     */
    constructor(hapiConfig?: Hapi.IServerConnectionOptions) {
        this._hapiServer = this.initHapi(hapiConfig);
    }

    /**
     * Set Debug Service.
     *
     * @param value
     */
    set debugService(value: Debug) {
        this._debugService = value;
    }

    /**
     * Run HTTP Server.
     */
    public startServer(): void {
        this._hapiServer.start((error) => {
            if (error) {
                throw error;
            }

            this.logMessage('info', `Server running at: ${this._hapiServer.info.uri}`);
        });
    }

    /**
     * Register Route.
     *
     * @param hapiRoute
     */
    public registerRoute(hapiRoute: Hapi.IRouteConfiguration): void {

        let matchStatus = false;
        if (!Array.isArray(hapiRoute.method)) {
            matchStatus = (this._hapiServer.match(hapiRoute.method, hapiRoute.path) == null);
        } else {

            hapiRoute.method.forEach((method) => {
                if (this._hapiServer.match(method, hapiRoute.path) != null) {
                    matchStatus = true;
                    return false;
                }
            });
        }

        if (!matchStatus) {
            this._hapiServer.route(hapiRoute);
        } else {
            this.logMessage('error', `Route [${hapiRoute.method}] ${hapiRoute.path} is already registered`);
        }
    }

    /**
     * Init HTTP Server.
     *
     * @param hapiConfig
     * @return {Server}
     */
    private initHapi(hapiConfig: Hapi.IServerConnectionOptions): Hapi.Server {

        // Init Hapi Server
        let hapiServer = new Hapi.Server();
        hapiServer.connection(hapiConfig);

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
        hapiServer.on('request', (request) => {
            this.logMessage('info', `New request: [${request.info.remoteAddress}] [${request.method.toUpperCase()}] ${request.path}`);
        });

        // Define Route Event Listener
        hapiServer.on('route', (route) => {
            this.logMessage('info', `New request: New route added: [${route.method.toUpperCase()}] ${route.path}`);
        });

        // Define Request Error Event Listener
        hapiServer.on('request-error', (request, err) => {
            this.logMessage('error', `Error response (500) sent for request: [${request.info.remoteAddress}] [${request.method.toUpperCase()}] ${request.path} because: ${err.message}`);
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
            this._debugService.log(logLevel, logMessage, 'HTTP Server');
        }
    }
}
