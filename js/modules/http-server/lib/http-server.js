"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Hapi = require("hapi");
var router_1 = require("../../router/lib/router");
var http_server_auth_1 = require("./http-server-auth");
var HttpServer = (function () {
    function HttpServer(httpServerConfig, authProvider, debugService, configService) {
        this._hapiServer = this.initHapi(httpServerConfig);
        this._authProvider = authProvider;
        this._debugService = debugService;
        this._configService = configService;
        this._routerService = new router_1.Router(this, debugService, configService);
    }
    HttpServer.prototype.startServer = function () {
        var _this = this;
        this._hapiServer.start(function (error) {
            if (error) {
                throw error;
            }
            _this.logMessage("info", "Server running at: " + _this._hapiServer.info.uri);
        });
    };
    HttpServer.prototype.registerRoute = function (route) {
        var _this = this;
        var matchStatus = false;
        if (!Array.isArray(route.method)) {
            matchStatus = (this._hapiServer.match(route.method, route.path) != null);
        }
        else {
            route.method.forEach(function (method) {
                if (_this._hapiServer.match(method, route.path) != null) {
                    matchStatus = true;
                    return false;
                }
            });
        }
        if (!matchStatus) {
            this._hapiServer.route(route);
        }
        else {
            this.logMessage("error", "Route [" + route.method + "] " + route.path + " is already registered");
        }
    };
    Object.defineProperty(HttpServer.prototype, "routerService", {
        get: function () {
            return this._routerService;
        },
        enumerable: true,
        configurable: true
    });
    HttpServer.prototype.initHapi = function (httpServerConfig) {
        var hapiServer = new Hapi.Server();
        hapiServer.connection(httpServerConfig);
        http_server_auth_1.HttpServerTokenAuth.register(hapiServer, this._authProvider);
        this.defineEventListeners(hapiServer);
        return hapiServer;
    };
    HttpServer.prototype.defineEventListeners = function (hapiServer) {
        var _this = this;
        hapiServer.on("request", function (request) {
            _this.logMessage("info", "New request: [" + request.info.remoteAddress + "] [" + request.method.toUpperCase() + "] " + request.path);
        });
        hapiServer.on("route", function (route) {
            _this.logMessage("info", "New route added: [" + route.method.toUpperCase() + "] " + route.path);
        });
        hapiServer.on("request-error", function (request, err) {
            _this.logMessage("error", "Error response (500) sent for request: [" + request.info.remoteAddress + "] [" + request.method.toUpperCase() + "] " + request.path + " because: " + err.message);
        });
    };
    HttpServer.prototype.logMessage = function (logLevel, logMessage) {
        if (this._debugService) {
            this._debugService.log(logLevel, logMessage, "HTTP Server");
        }
    };
    return HttpServer;
}());
exports.HttpServer = HttpServer;
//# sourceMappingURL=http-server.js.map