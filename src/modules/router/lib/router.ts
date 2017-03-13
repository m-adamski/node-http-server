import {HttpServer} from "../../http-server/lib/http-server";
import {Controller} from "../../controller/lib/controller";
import {Route} from "./route";
import {Config} from "../../config/lib/config";
import {Debug} from "../../debug/lib/debug";

export class Router {

    protected _httpService: HttpServer;
    protected _debugService: Debug;
    protected _configService: Config;
    protected _controllersCollection: Map<string, Controller>;

    /**
     * Initialize Router.
     *
     * @param httpService
     * @param debugService
     * @param configService
     */
    constructor(httpService: HttpServer, debugService: Debug, configService: Config) {
        this._httpService = httpService;
        this._debugService = debugService;
        this._configService = configService;

        this._controllersCollection = new Map<string, Controller>();
    }

    /**
     * Register Controller.
     *
     * @param controller
     */
    public registerController(controller: Controller): void {

        if (!this._controllersCollection.has(controller.controllerName)) {

            // Add Controller to Collection
            this._controllersCollection.set(controller.controllerName, controller);

            // Inject
            this._controllersCollection.get(controller.controllerName).configService = this._configService;
            this._controllersCollection.get(controller.controllerName).debugService = this._debugService;

            // Get Controller Routes Collection
            this._controllersCollection.get(controller.controllerName).routesCollection.forEach((route: Route) => {
                this._httpService.registerRoute(route);
            });
        }
    }
}
