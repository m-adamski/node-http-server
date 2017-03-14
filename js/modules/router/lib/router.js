export class Router {
    constructor(httpService, debugService, configService) {
        this._httpService = httpService;
        this._debugService = debugService;
        this._configService = configService;
        this._controllersCollection = new Map();
    }
    registerController(controller) {
        if (!this._controllersCollection.has(controller.controllerName)) {
            this._controllersCollection.set(controller.controllerName, controller);
            this._controllersCollection.get(controller.controllerName).configService = this._configService;
            this._controllersCollection.get(controller.controllerName).debugService = this._debugService;
            this._controllersCollection.get(controller.controllerName).routesCollection.forEach((route) => {
                this._httpService.registerRoute(route);
            });
        }
    }
}
//# sourceMappingURL=router.js.map