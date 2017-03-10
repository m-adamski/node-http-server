import * as Fs from "fs";
import * as Yaml from "js-yaml"

export class Config {

    protected configFile: string;
    protected configContent: Object;

    /**
     * Create instance of Config.
     *
     * @param configFile
     */
    constructor(configFile: string) {
        this.configFile = configFile;
        this.configContent = this.readConfig(configFile);
    }

    /**
     * Function return property from specified path.
     * When property does not exist it return undefined.
     *
     * @param $propertyPath
     * @return {any}
     */
    public get($propertyPath?: string): any {
        if ($propertyPath) {

            // Search & return found item
            return this.readProperty($propertyPath);
        } else {

            // Return all config items
            return this.configContent;
        }
    }

    /**
     * Function check if specified item exist.
     *
     * @param $propertyPath
     * @return {any}
     */
    public has($propertyPath: string): boolean {
        return this.readProperty($propertyPath, true);
    }

    /**
     * Function scan specified branch for property with specified name.
     * Throw exception when property with specified name does not exist in current branch.
     *
     * @param $propertyName
     * @param $propertyBranch
     * @return {any}
     */
    private scanConfigTree($propertyName: string, $propertyBranch: Object): any {
        if ($propertyBranch[$propertyName]) {
            return $propertyBranch[$propertyName];
        }

        throw new Error('Property with specified name does not exist');
    }

    /**
     * Function read config file and return found item or status bool.
     *
     * @param $propertyPath
     * @param $returnBool
     * @return {boolean}
     */
    private readProperty($propertyPath: string, $returnBool?: boolean): any {

        let returnBool = $returnBool || false;

        // Cut specified $propertyPath by dot
        let propertyPathArray: Array<string> = $propertyPath.split('.');
        let currentProperty: any = this.configContent;

        // If propertyPathArray length is bigger than zero then move every branch
        if (propertyPathArray.length > 0) {
            propertyPathArray.forEach((propertyBranch: string) => {
                try {
                    currentProperty = this.scanConfigTree(propertyBranch, currentProperty);
                } catch (error) {
                    currentProperty = undefined;
                    return false;
                }
            });
        }

        return (returnBool) ? (currentProperty != undefined) : currentProperty;
    }

    /**
     * Read Config File and return Content.
     *
     * @param configFile
     * @return {IConfig}
     */
    private readConfig(configFile: string): Object {

        // Check if specified Config File exist
        if (Fs.existsSync(configFile)) {

            // Read Config File & convert to IConfig Object
            return Yaml.safeLoad(Fs.readFileSync(configFile, 'utf8'));
        }

        throw new ReferenceError('Config File does not exist.');
    }
}
