var pathModule = require('path');

module.exports = {
    target: 'async-node',
    entry: './src/app/app.ts',
    output: {
        path: pathModule.resolve(__dirname, 'dist'),
        filename: 'app.js'
    },
    resolve: {
        modules: ['node_modules'],
        descriptionFiles: ['package.json'],
        extensions: ['.js', '.ts']
    },
    module: {
        rules: [
            {test: /\.ts$/, use: 'ts-loader'},
            {test: /\.json$/, use: 'json-loader'}
        ]
    }
};
