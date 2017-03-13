import {Route} from "../../router/lib/route";
import {Debug} from "../../debug/lib/debug";
import {Config} from "../../config/lib/config";

export class Controller {

    protected _controllerName: string;
    protected _routesCollection: Set<Route>;
    protected _debugService: Debug;
    protected _configService: Config;

    constructor() {
        this._routesCollection = new Set<Route>();
    }

    /**
     * Register Controller Route.
     *
     * @param route
     */
    public registerRoute(route: Route): void {
        this._routesCollection.add(route);
    }

    /**
     * Get Controller Name.
     *
     * @return {string}
     */
    get controllerName(): string {
        return this._controllerName;
    }

    /**
     * Get Routes Collection.
     *
     * @return {Set<Route>}
     */
    get routesCollection(): Set<Route> {
        return this._routesCollection;
    }

    /**
     * Set Debug Service.
     *
     * @param value
     */
    set debugService(value: Debug) {
        this._debugService = value;
    }

    /**
     * Set Config Service.
     *
     * @param value
     */
    set configService(value: Config) {
        this._configService = value;
    }
}
