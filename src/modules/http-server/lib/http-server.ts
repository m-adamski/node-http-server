import { Server, Request, IServerConnectionOptions, IRouteConfiguration } from "hapi";

export class HttpServer {

    protected hapiConfig: IServerConnectionOptions;
    protected hapiServer: Server;

    /**
     * Creates an instance of Http.
     *
     * @param {IServerConnectionOptions} [hapiConfig]
     *
     * @memberOf Http
     */
    constructor(hapiConfig?: IServerConnectionOptions) {
        this.hapiConfig = hapiConfig;
        this.hapiServer = this.initHapi(hapiConfig);
    }

    /**
     * Init Hapi Server.
     *
     * @private
     * @param {IServerConnectionOptions} hapiConfig
     * @returns {Server}
     *
     * @memberOf Http
     */
    private initHapi(hapiConfig: IServerConnectionOptions): Server {

        // Init Hapi Server
        let hapiServer = new Server();
        hapiServer.connection(hapiConfig);

        // Define Hapi Event Listeners
        hapiServer.on("request", (request: Request) => {
            console.log("Request");
        });

        return hapiServer;
    }

    /**
     * Run Hapi Server.
     *
     * @memberOf Http
     */
    public startServer(): void {
        this.hapiServer.start((error) => {
            if (error) {
                throw error;
            }

            // LogService.logInfo(`Server running at: ${this.hapiServer.info.uri}`, 'Hapi');
        });
    }

    /**
     * Register Route.
     *
     * @param {IRouteConfiguration} hapiRoute
     *
     * @memberOf Http
     */
    public registerRoute(hapiRoute: IRouteConfiguration): void {

        let matchStatus = false;
        if (!Array.isArray(hapiRoute.method)) {
            matchStatus = (this.hapiServer.match(hapiRoute.method, hapiRoute.path) == null) ? false : true;
        } else {

            hapiRoute.method.forEach((method) => {
                if (this.hapiServer.match(method, hapiRoute.path) != null) {
                    matchStatus = true;
                    return false;
                }
            });
        }

        if (!matchStatus) {
            this.hapiServer.route(hapiRoute);
        } else {
            // LogService.logError(`Route [${$hapiRoute.method}] ${$hapiRoute.path} is already registered`, 'Hapi');
        }
    }
}
