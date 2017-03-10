import * as Hapi from "hapi";
export class HttpServer {
    constructor(hapiConfig) {
        this._hapiServer = this.initHapi(hapiConfig);
    }
    set debugService(value) {
        this._debugService = value;
    }
    startServer() {
        this._hapiServer.start((error) => {
            if (error) {
                throw error;
            }
            this.logMessage('info', `Server running at: ${this._hapiServer.info.uri}`);
        });
    }
    registerRoute(hapiRoute) {
        let matchStatus = false;
        if (!Array.isArray(hapiRoute.method)) {
            matchStatus = (this._hapiServer.match(hapiRoute.method, hapiRoute.path) != null);
        }
        else {
            hapiRoute.method.forEach((method) => {
                if (this._hapiServer.match(method, hapiRoute.path) != null) {
                    matchStatus = true;
                    return false;
                }
            });
        }
        if (!matchStatus) {
            this._hapiServer.route(hapiRoute);
        }
        else {
            this.logMessage('error', `Route [${hapiRoute.method}] ${hapiRoute.path} is already registered`);
        }
    }
    initHapi(hapiConfig) {
        let hapiServer = new Hapi.Server();
        hapiServer.connection(hapiConfig);
        this.defineEventListeners(hapiServer);
        return hapiServer;
    }
    defineEventListeners(hapiServer) {
        hapiServer.on('request', (request) => {
            this.logMessage('info', `New request: [${request.info.remoteAddress}] [${request.method.toUpperCase()}] ${request.path}`);
        });
        hapiServer.on('route', (route) => {
            this.logMessage('info', `New route added: [${route.method.toUpperCase()}] ${route.path}`);
        });
        hapiServer.on('request-error', (request, err) => {
            this.logMessage('error', `Error response (500) sent for request: [${request.info.remoteAddress}] [${request.method.toUpperCase()}] ${request.path} because: ${err.message}`);
        });
    }
    logMessage(logLevel, logMessage) {
        if (this._debugService) {
            this._debugService.log(logLevel, logMessage, 'HTTP Server');
        }
    }
}
//# sourceMappingURL=http-server.js.map