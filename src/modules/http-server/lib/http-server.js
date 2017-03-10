import { Server } from "hapi";
export class HttpServer {
    constructor(hapiConfig) {
        this.hapiConfig = hapiConfig;
        this.hapiServer = this.initHapi(hapiConfig);
    }
    initHapi(hapiConfig) {
        let hapiServer = new Server();
        hapiServer.connection(hapiConfig);
        hapiServer.on("request", (request) => {
            console.log("Request");
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
            matchStatus = (this.hapiServer.match(hapiRoute.method, hapiRoute.path) == null) ? false : true;
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
        else {
        }
    }
}
//# sourceMappingURL=http-server.js.map