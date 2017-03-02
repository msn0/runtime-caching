const path = require('path');

module.exports = {
    entry: {
        index: './index.js',
        demo: './demo/app.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        libraryTarget: 'umd',
        publicPath: 'dist'
    },
    module: {
        rules: [{
            test: /\.js$/,
            use: [{
                loader: 'babel-loader'
            }]
        }]
    },
    devtool: 'source-map'
};
