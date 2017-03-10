export class Config {
    protected _configFile: string;
    protected _configContent: Object;

    constructor(configFile: string);
    public get($propertyPath?: string): any;
    public has($propertyPath: string): boolean;
}
