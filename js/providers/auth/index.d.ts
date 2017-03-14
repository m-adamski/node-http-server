import {Provider} from "../../modules/provider/index";

export class AuthProvider extends Provider {
    hasToken(token: string): boolean;
}
