# Node HTTP Server
Simple Node HTTP Server framework wrote in Typescript. Framework prepared for small RESTful API applications.
It contain external libraries:

- [HapiJS - A rich framework for building applications and services](https://hapijs.com)
- [HapiJS Token Authorization Plugin](https://github.com/johnbrett/hapi-auth-bearer-token)
- [Boom - HTTP-friendly error objects](https://github.com/hapijs/boom)
- [Winston - A multi-transport async logging library for node.js](https://github.com/winstonjs/winston)
- [JS Yaml - Yaml parser](https://github.com/nodeca/js-yaml)

### Installation
Currently, the package is available only on Github. For development, we will also install Webpack with Typescript Loader.
```shell
$ npm install https://github.com/m-adamski/node-http-server.git --save
$ npm install typescript webpack ts-loader path --save-dev
```
When you use [Yarn](https://yarnpkg.com/lang/en), you should add following resources to your project:
```shell
$ yarn add https://github.com/m-adamski/node-http-server.git
$ yarn add typescript webpack ts-loader path --dev
```

### Project structure
Sample structure of your project:
```
- dist
    - app.js
- src
    - controllers
        - dashboard.ts
    - providers
        - custom-auth-provider.ts
    - app.ts
- node_modules
- package.json
- tsconfig.json
- webpack.config.js
```

### Application
Sample application contain one Dashboard Controller with two actions & Auth Provider with one token (used by AuthProvider).

dashboard.ts
```ts
import { Controller } from "node-http-server";

export class DashboardController extends Controller {

    protected _controllerName: string = "DashboardController";

    constructor() {
        super();

        // Register Routes
        this.registerRoute({
            method: "GET",
            path: "/",
            config: { handler: this.indexAction, bind: this }
        });

        this.registerRoute({
            method: "GET",
            path: "/auth",
            config: { handler: this.authAction, bind: this, auth: "token" }
        });
    }

    /**
     * GET /
     * Index Action
     *
     * @param {any} request
     * @param {any} response
     *
     * @memberOf DashboardController
     */
    public indexAction(request, response) {
        response({ code: 200, message: "Working.." });
    }

    /**
     * GET /auth
     * Auth Test Action
     *
     * @param {any} request
     * @param {any} response
     *
     * @memberOf DashboardController
     */
    public authAction(request, response) {
        response({ code: 200, message: "Token is correct. Welcome!" });
    }
}
```

custom-auth-provider.ts
```ts
import { AuthProvider } from "node-http-server";

export class CustomAuthProvider extends AuthProvider {

    constructor() {
        super();

        this._dataCollection = new Set<any>([
            { token: "f93178f68aa514ec5c31efa1ae5f6a831dc4a2eb", name: "Frank" }
        ]);
    }
}
```

app.ts
```ts
import * as Winston from "winston";
import { HttpServer, Debug, Config } from "node-http-server";
import { CustomAuthProvider } from "./providers/custom-auth-provider";
import { DashboardController } from "./controllers/dashboard";

// Initialize Config Service
let configService = new Config("./src/config.yml");

// Initialize Debug Service & add Console transporter
let debugService = new Debug(true);
debugService.addTransporter(new Winston.transports.Console({ colorize: true }));

// Initialize Http Server
let httpServer = new HttpServer({ host: "localhost", port: 3000 }, new CustomAuthProvider(), debugService, configService);
httpServer.startServer();

// Register Controllers
httpServer.routerService().registerController(new DashboardController());
```

### Webpack & Typescript configs
webpack.config.js
```js
var pathModule = require("path");

module.exports = {
    target: "node",
    entry: "./src/app.ts",
    output: {
        path: pathModule.resolve(__dirname, "dist"),
        filename: "app.js"
    },
    resolve: {
        modules: ["node_modules"],
        descriptionFiles: ["package.json"],
        extensions: [".js", ".ts"]
    },
    module: {
        rules: [
            {test: /\.ts$/, use: "ts-loader"}
        ]
    }
};
```

tsconfig.json
```json
{
    "compilerOptions": {
        "target": "es5",
        "emitDecoratorMetadata": true,
        "experimentalDecorators": true,
        "noImplicitAny": false,
        "removeComments": true,
        "preserveConstEnums": true,
        "sourceMap": true,
        "rootDir": "src",
        "outDir": "dist",
        "typeRoots": [
            "node_modules/@types"
        ]
    },
    "exclude": [
        "node_modules"
    ]
}
```

### Build Application
To compile your application just run command:
```shell
$ webpack
```

It should generate one file ``app.js`` in ``dist`` directory. Now you can run application with node:
```shell
$ node dist/app.js
```

Sample application is now available under ``http://localhost:3000``

### Licence
This library is available under MIT licence.
