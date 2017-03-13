import * as Hapi from "hapi";

export class HttpServerConfig implements Hapi.IServerConnectionOptions {

    host?: string;
    address?: string;
    port?: string | number;
    uri?: string;
    listener?: any;
    autoListen?: boolean;
    cache?: {
        statuses: number[];
    };
    labels?: string | string[];
    tls?: boolean | {key?: string; cert?: string; pfx?: string;} | Object;
}
