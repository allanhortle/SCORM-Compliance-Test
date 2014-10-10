/*global module,require *//* jshint -W097 */
'use strict';
module.exports = function (grunt) {
    require('jit-grunt')(grunt);
    var webpack = require('webpack');
    grunt.initConfig({

        config: {
            scss: 'client/scss/',
            js: 'client/js/src/',
            port: 9001
        },


        //   C S S   T A S K S   //

        cssflow: {
            options: {
                autoprefixer: {
                    browsers: ['last 2 version', 'ie 8', 'ie 9']
                }
            },
            ing: {
                files: {
                    'dest/screen.css': '<%= config.scss %>/screen.scss'
                } 
            }            
        },


        //   J A V A S C R I P T   T A S K S   //
 
        webpack: {
            options: require('./webpack.config.js'),
            dev: {
                cache: true
            }
        },


        //   W A T C H I N G   A N D   S E R V I N G   //

        watch: {
            webpack: {
                files: ['<%= config.js %>/**/*.js', '<%= config.js %>/**/*.jsx'],
                tasks: ['webpack']
            },
            sass: {
                files: ['<%= config.scss %>/**/*.scss'],
                tasks: ['cssflow'],
            },
            livereload: {
                options: {
                    livereload: 39001,
                },
                files: [
                    'dest/screen.css',
                    'dest/scorm_compliance_test.bundle.js'
                ]
            }
        },

        connect: {
            server: {
                options: {
                    livereload: '3<%= config.port %>',
                    port: '<%= config.port %>'
                }                
            }
        }

    });

    grunt.registerTask('default', ['cssflow', 'webpack', 'connect', 'watch']);
};
