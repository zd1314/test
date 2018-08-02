/**
 * Created by Molay on 16/7/30.
 */
let webpack = require('webpack');
module.exports = {
    entry: {
        'timeLine.min': __dirname + '/src/index.js'
    },
    output: {
        path: __dirname + '/dist/',
        filename: '[name].js',
        library:"ChartLib",
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    resolve: {
        extensions: ['.js']
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015'],
                        plugins: [
                            "transform-class-properties"
                        ]
                    }
                }
            }
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]
};