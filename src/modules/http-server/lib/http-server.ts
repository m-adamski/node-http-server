import * as Hapi from "hapi";

export class HttpServer {

    protected hapiConfig: Hapi.IServerConnectionOptions;
    protected hapiServer: Hapi.Server;

    /**
     * Create instance of HttpServer.
     *
     * @param hapiConfig
     */
    constructor(hapiConfig?: Hapi.IServerConnectionOptions) {
        this.hapiConfig = hapiConfig;
        this.hapiServer = this.initHapi(hapiConfig);
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
        hapiServer.on("request", (request: Hapi.Request) => {
            console.log(request);
        });

        return hapiServer;
    }

    /**
     * Run HTTP Server.
     */
    public startServer(): void {
        this.hapiServer.start((error) => {
            if (error) {
                throw error;
            }
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
            matchStatus = (this.hapiServer.match(hapiRoute.method, hapiRoute.path) == null);
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
        }
    }
}
