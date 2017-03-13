import {Provider} from "../modules/provider/index";

export class AuthProvider extends Provider {
    public hasToken(token: string): boolean;
}
