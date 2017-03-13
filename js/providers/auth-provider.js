"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var provider_1 = require("../modules/provider/lib/provider");
var AuthProvider = (function (_super) {
    __extends(AuthProvider, _super);
    function AuthProvider() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AuthProvider.prototype.hasToken = function (token) {
        var response = false;
        this._dataCollection.forEach(function (authItem) {
            if (authItem.token && authItem.token === token) {
                response = true;
                return true;
            }
        });
        return response;
    };
    return AuthProvider;
}(provider_1.Provider));
exports.AuthProvider = AuthProvider;
//# sourceMappingURL=auth-provider.js.map