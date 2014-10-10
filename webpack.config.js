var webpack = require('webpack');
module.exports = {
    entry: { 
        scorm_compliance_test: "./client/js/src/index.js",
        vendor: ['react', 'lodash'],
    },
    output: {
        path: "./dest/",
        filename: "[name].bundle.js"
    },
    plugins: [
        new webpack.BannerPlugin('"use strict";', {raw: true}),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.bundle.js"),
        new webpack.optimize.AggressiveMergingPlugin(),
        new webpack.optimize.OccurenceOrderPlugin()
    ],
    cache: false,
    stats: {
        modules: true,
    },
    resolve: {
        extensions: ['','.js','.jsx'],    
        modulesDirectories: ['libs','node_modules'],                
        alias: {
            react: 'react/dist/react.js',
            lodash: 'lodash/dist/lodash.min.js',
            stampy: 'stampy/src'
        }
    },
    module: {
        loaders: [
            {test: /\.jsx$/, loader: 'jsx-loader?harmony?insertPragma=React.DOM'},
        ]
    }
};