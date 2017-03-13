import {Route} from "../router/index";
import {Debug} from "../debug/index";
import {Config} from "../config/index";

export class Controller {

    protected _controllerName: string;
    protected _routesCollection: Set<Route>;
    protected _debugService: Debug;
    protected _configService: Config;

    registerRoute(route: Route): void;
    controllerName(): string;
    routesCollection(): Set<Route>;
    debugService(value: Debug);
    configService(value: Config);
}
