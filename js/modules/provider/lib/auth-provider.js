import { Provider } from "./provider";
export class AuthProvider extends Provider {
    hasToken(token) {
        let response = false;
        this._dataCollection.forEach((authItem) => {
            if (authItem.token && authItem.token === token) {
                response = true;
                return true;
            }
        });
        return response;
    }
}
//# sourceMappingURL=auth-provider.js.map