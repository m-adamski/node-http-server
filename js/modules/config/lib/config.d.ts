export class Config {
    protected configFile: string;
    protected configContent: Object;

    constructor(configFile: string);
    get($propertyPath?: string): any;
}
