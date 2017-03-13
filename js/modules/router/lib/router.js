"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Router = (function () {
    function Router(httpService, debugService, configService) {
        this._httpService = httpService;
        this._debugService = debugService;
        this._configService = configService;
        this._controllersCollection = new Map();
    }
    Router.prototype.registerController = function (controller) {
        var _this = this;
        if (!this._controllersCollection.has(controller.controllerName)) {
            this._controllersCollection.set(controller.controllerName, controller);
            this._controllersCollection.get(controller.controllerName).configService = this._configService;
            this._controllersCollection.get(controller.controllerName).debugService = this._debugService;
            this._controllersCollection.get(controller.controllerName).routesCollection.forEach(function (route) {
                _this._httpService.registerRoute(route);
            });
        }
    };
    return Router;
}());
exports.Router = Router;
//# sourceMappingURL=router.js.map