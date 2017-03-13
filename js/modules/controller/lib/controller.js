"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Controller = (function () {
    function Controller() {
        this._routesCollection = new Set();
    }
    Controller.prototype.registerRoute = function (route) {
        this._routesCollection.add(route);
    };
    Object.defineProperty(Controller.prototype, "controllerName", {
        get: function () {
            return this._controllerName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Controller.prototype, "routesCollection", {
        get: function () {
            return this._routesCollection;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Controller.prototype, "debugService", {
        set: function (value) {
            this._debugService = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Controller.prototype, "configService", {
        set: function (value) {
            this._configService = value;
        },
        enumerable: true,
        configurable: true
    });
    return Controller;
}());
exports.Controller = Controller;
//# sourceMappingURL=controller.js.map