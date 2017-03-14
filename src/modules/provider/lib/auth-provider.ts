import {Provider} from "./provider";

export class AuthProvider extends Provider {

    /**
     * Check if Token exist.
     *
     * @param token
     * @return {boolean}
     */
    public hasToken(token: string): boolean {

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
