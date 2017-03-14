import * as Hapi from "hapi";
import { Router } from "../../router/lib/router";
import { HttpServerTokenAuth } from "./http-server-auth";
export class HttpServer {
    constructor(httpServerConfig, authProvider, debugService, configService) {
        this._authProvider = authProvider;
        this._debugService = debugService;
        this._configService = configService;
        this._hapiServer = this.initHapi(httpServerConfig);
        this._routerService = new Router(this, debugService, configService);
    }
    startServer() {
        this._hapiServer.start((error) => {
            if (error) {
                throw error;
            }
            this.logMessage("info", `Server running at: ${this._hapiServer.info.uri}`);
        });
    }
    registerRoute(route) {
        let matchStatus = false;
        if (!Array.isArray(route.method)) {
            matchStatus = (this._hapiServer.match(route.method, route.path) != null);
        }
        else {
            route.method.forEach((method) => {
                if (this._hapiServer.match(method, route.path) != null) {
                    matchStatus = true;
                    return false;
                }
            });
        }
        if (!matchStatus) {
            this._hapiServer.route(route);
        }
        else {
            this.logMessage("error", `Route [${route.method}] ${route.path} is already registered`);
        }
    }
    get routerService() {
        return this._routerService;
    }
    initHapi(httpServerConfig) {
        let hapiServer = new Hapi.Server();
        hapiServer.connection(httpServerConfig);
        HttpServerTokenAuth.register(hapiServer, this._authProvider);
        this.defineEventListeners(hapiServer);
        return hapiServer;
    }
    defineEventListeners(hapiServer) {
        hapiServer.on("request", (request) => {
            this.logMessage("info", `New request: [${request.info.remoteAddress}] [${request.method.toUpperCase()}] ${request.path}`);
        });
        hapiServer.on("route", (route) => {
            this.logMessage("info", `New route added: [${route.method.toUpperCase()}] ${route.path}`);
        });
        hapiServer.on("request-error", (request, err) => {
            this.logMessage("error", `Error response (500) sent for request: [${request.info.remoteAddress}] [${request.method.toUpperCase()}] ${request.path} because: ${err.message}`);
        });
    }
    logMessage(logLevel, logMessage) {
        if (this._debugService) {
            this._debugService.log(logLevel, logMessage, "HTTP Server");
        }
    }
}
//# sourceMappingURL=http-server.js.map