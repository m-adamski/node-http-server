import * as Hapi from "hapi";
import * as Boom from "boom";
import {AuthProvider} from "../../provider/lib/auth-provider";

export class HttpServerTokenAuth {

    /**
     * Function register new Hapi Module
     *
     * @static
     * @param {Hapi.Server} hapiServer
     * @param {AuthProvider} authProvider
     */
    public static register(hapiServer: Hapi.Server, authProvider: AuthProvider): void {

        // Register new Scheme
        hapiServer.auth.scheme("token", (server, options) => {

            return {
                authenticate: function (request, reply) {

                    let headerAuthorization: string = request.raw.req.headers.authorization;

                    if (headerAuthorization) {

                        let authorizationToken = HttpServerTokenAuth.getToken(headerAuthorization);

                        if (authorizationToken && authProvider.hasToken(authorizationToken)) {
                            return reply.continue({credentials: true});
                        }
                    }

                    return reply(Boom.unauthorized("Missing or wrong token"));
                }
            }
        });

        // Register new Auth Strategy
        hapiServer.auth.strategy("token", "token");
    }

    /**
     * Function return token value from Authorization header
     *
     * @static
     * @param {string} headerAuthorization
     * @returns {(string | false)}
     */
    private static getToken(headerAuthorization: string): string | false {
        let tokenRegex = /^Token (.*)$/g;
        let tokenExec = tokenRegex.exec(headerAuthorization);

        return (tokenExec) ? tokenExec[1] : false;
    }
}
