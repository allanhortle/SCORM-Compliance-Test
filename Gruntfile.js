/*global module,require jshint -W097 */
'use strict';
module.exports = function (grunt) {

    require('time-grunt')(grunt);
    require('jit-grunt')(grunt);

    var webpack = require('webpack');

    // Project configuration.
    grunt.initConfig({

        clean: [".sass-cache"],


        //   C S S   T A S K S   //

        cssflow: {
            options: {
                autoprefixer: {
                    browsers: ['last 2 version', 'ie 8', 'ie 9']
                }
            },
            ing: {
                files: {
                    '<%=config.css%>/screen-TOYOTA.css'       :'<%=config.scss%>/screen-TOYOTA.scss',
                } 
            }            
        },

        //   J A V A S C R I P T   T A S K S   //
 
        webpack: {
            options: require('./webpack.config.js'),              
        },



        /*
        |--------------------------------------------------------------------------
        | Watching / Serving
        |--------------------------------------------------------------------------
        |
        */

        watch: {
            options: {
                livereload: 38888,
                spawn: false
            },
            webpack: {
                files: ['trc/**/*.js', 'trc/**/*.jsx', 'node_modules/stampy/**/*.jsx'],
                tasks: ['webpack:dev']
            },
            templates: {
                files: ['trc/src/templates/**/*.hbs'],
                tasks: ['handlebars', 'webpack:dev'],
            },
            sass: {
                files: ['<%= config.scss %>/**/*.scss'],
                tasks: ['styleguide', 'css'],
            },
            jsp: {
                files: ['../../WEB-INF/views/**/*.jsp'],
                tasks: ['css']
            },
            styleguide: {
                files: ['../kss/**/*', '<%= config.scss %>/**/*.md'],
                tasks: ['styleguide']
            }
        },

    });


    grunt.registerTask('default', ['css', 'old-js', 'uglify:production','webpack:production']);

};
