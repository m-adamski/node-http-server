export class Provider {
    _dataCollection: Set<any>;
}

export class AuthProvider extends Provider {
    hasToken(token: string): boolean;
}
