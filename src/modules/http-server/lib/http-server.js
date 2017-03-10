import * as Hapi from "hapi";
export class HttpServer {
    constructor(hapiConfig) {
        this.hapiConfig = hapiConfig;
        this.hapiServer = this.initHapi(hapiConfig);
    }
    initHapi(hapiConfig) {
        let hapiServer = new Hapi.Server();
        hapiServer.connection(hapiConfig);
        hapiServer.on("request", (request) => {
            console.log(request);
        });
        return hapiServer;
    }
    startServer() {
        this.hapiServer.start((error) => {
            if (error) {
                throw error;
            }
        });
    }
    registerRoute(hapiRoute) {
        let matchStatus = false;
        if (!Array.isArray(hapiRoute.method)) {
            matchStatus = (this.hapiServer.match(hapiRoute.method, hapiRoute.path) == null);
        }
        else {
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
//# sourceMappingURL=http-server.js.map