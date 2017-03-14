export class Controller {
    constructor() {
        this._routesCollection = new Set();
    }
    registerRoute(route) {
        this._routesCollection.add(route);
    }
    get controllerName() {
        return this._controllerName;
    }
    get routesCollection() {
        return this._routesCollection;
    }
    set debugService(value) {
        this._debugService = value;
    }
    set configService(value) {
        this._configService = value;
    }
}
//# sourceMappingURL=controller.js.map