"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Boom = require("boom");
var HttpServerTokenAuth = (function () {
    function HttpServerTokenAuth() {
    }
    HttpServerTokenAuth.register = function (hapiServer, authProvider) {
        hapiServer.auth.scheme("token", function (server, options) {
            return {
                authenticate: function (request, reply) {
                    var headerAuthorization = request.raw.req.headers.authorization;
                    if (headerAuthorization) {
                        var authorizationToken = this.getToken(headerAuthorization);
                        if (authorizationToken && authProvider.hasToken(authorizationToken)) {
                            return reply.continue({ credentials: true });
                        }
                    }
                    return reply(Boom.unauthorized("Missing or wrong token"));
                }
            };
        });
        hapiServer.auth.strategy("token", "token");
    };
    HttpServerTokenAuth.getToken = function (headerAuthorization) {
        var tokenRegex = /^Token (.*)$/g;
        var tokenExec = tokenRegex.exec(headerAuthorization);
        return (tokenExec) ? tokenExec[1] : false;
    };
    return HttpServerTokenAuth;
}());
exports.HttpServerTokenAuth = HttpServerTokenAuth;
//# sourceMappingURL=http-server-auth.js.map