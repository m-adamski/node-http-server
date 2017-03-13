import * as Hapi from "hapi";

export class Route implements Hapi.IRouteConfiguration {
    path: string;
    method: string|string[];
    vhost?: string;
    handler?: Hapi.ISessionHandler | Hapi.IStrictSessionHandler | string | Hapi.IRouteHandlerConfig;
    config?: Hapi.IRouteAdditionalConfigurationOptions;
}
