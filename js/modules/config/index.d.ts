export class Config {

    protected _configFile: string;
    protected _configContent: Object;
    protected _configBranchesSeparator: string;

    constructor(configFile: string);
    get($propertyPath?: string): any;
    has($propertyPath: string): boolean;
}
