import * as Boom from "boom";
export class HttpServerTokenAuth {
    static register(hapiServer, authProvider) {
        hapiServer.auth.scheme("token", (server, options) => {
            return {
                authenticate: function (request, reply) {
                    let headerAuthorization = request.raw.req.headers.authorization;
                    if (headerAuthorization) {
                        let authorizationToken = HttpServerTokenAuth.getToken(headerAuthorization);
                        if (authorizationToken && authProvider.hasToken(authorizationToken)) {
                            return reply.continue({ credentials: true });
                        }
                    }
                    return reply(Boom.unauthorized("Missing or wrong token"));
                }
            };
        });
        hapiServer.auth.strategy("token", "token");
    }
    static getToken(headerAuthorization) {
        let tokenRegex = /^Token (.*)$/g;
        let tokenExec = tokenRegex.exec(headerAuthorization);
        return (tokenExec) ? tokenExec[1] : false;
    }
}
//# sourceMappingURL=http-server-auth.js.map