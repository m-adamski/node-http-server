"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Fs = require("fs");
var Yaml = require("js-yaml");
var Config = (function () {
    function Config(configFile) {
        this._configBranchesSeparator = ".";
        this._configFile = configFile;
        this._configContent = this.readConfig(configFile);
    }
    Config.prototype.get = function ($propertyPath) {
        if ($propertyPath) {
            return this.readProperty($propertyPath);
        }
        else {
            return this._configContent;
        }
    };
    Config.prototype.has = function ($propertyPath) {
        return this.readProperty($propertyPath, true);
    };
    Config.prototype.scanConfigTree = function ($propertyName, $propertyBranch) {
        if ($propertyBranch[$propertyName]) {
            return $propertyBranch[$propertyName];
        }
        throw new Error('Property with specified name does not exist');
    };
    Config.prototype.readProperty = function ($propertyPath, $returnBool) {
        var _this = this;
        var returnBool = $returnBool || false;
        var propertyPathArray = $propertyPath.split(this._configBranchesSeparator);
        var currentProperty = this._configContent;
        if (propertyPathArray.length > 0) {
            propertyPathArray.forEach(function (propertyBranch) {
                try {
                    currentProperty = _this.scanConfigTree(propertyBranch, currentProperty);
                }
                catch (error) {
                    currentProperty = undefined;
                    return false;
                }
            });
        }
        return (returnBool) ? (currentProperty != undefined) : currentProperty;
    };
    Config.prototype.readConfig = function (configFile) {
        if (Fs.existsSync(configFile)) {
            return Yaml.safeLoad(Fs.readFileSync(configFile, 'utf8'));
        }
        throw new ReferenceError('Config File does not exist.');
    };
    return Config;
}());
exports.Config = Config;
//# sourceMappingURL=config.js.map