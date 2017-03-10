import * as Fs from "fs";
import * as Yaml from "js-yaml";
export class Config {
    constructor(configFile) {
        this.configFile = configFile;
        this.configContent = this.readConfig(configFile);
    }
    get($propertyPath) {
        if ($propertyPath) {
            return this.readProperty($propertyPath);
        }
        else {
            return this.configContent;
        }
    }
    has($propertyPath) {
        return this.readProperty($propertyPath, true);
    }
    scanConfigTree($propertyName, $propertyBranch) {
        if ($propertyBranch[$propertyName]) {
            return $propertyBranch[$propertyName];
        }
        throw new Error('Property with specified name does not exist');
    }
    readProperty($propertyPath, $returnBool) {
        let returnBool = $returnBool || false;
        let propertyPathArray = $propertyPath.split('.');
        let currentProperty = this.configContent;
        if (propertyPathArray.length > 0) {
            propertyPathArray.forEach((propertyBranch) => {
                try {
                    currentProperty = this.scanConfigTree(propertyBranch, currentProperty);
                }
                catch (error) {
                    currentProperty = undefined;
                    return false;
                }
            });
        }
        return (returnBool) ? (currentProperty != undefined) : currentProperty;
    }
    readConfig(configFile) {
        if (Fs.existsSync(configFile)) {
            return Yaml.safeLoad(Fs.readFileSync(configFile, 'utf8'));
        }
        throw new ReferenceError('Config File does not exist.');
    }
}
//# sourceMappingURL=config.js.map