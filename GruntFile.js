var fs = require('fs');
module.exports = function(grunt){
    'use strict';

    grunt.initConfig({
       jshint:{
           files:{
               src:['public/js/**/*.js']
           }
       },

        env : {
            options : {
                //Shared Options Hash
            },
            dev : {
                NODE_ENV : 'development',
                DEST     : 'temp'
            },
            build : {
                NODE_ENV : 'production',
                DEST     : 'dist',
                concat   : {
                    PATH     : {
                        'value': 'node_modules/.bin',
                        'delimiter': ':'
                    }
                }
            },
            functions: {
                BY_FUNCTION: function() {
                    var value = '123';
                    grunt.log.writeln('setting BY_FUNCTION to ' + value);
                    return value;
                }
            }
        }

    });



    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-env');

    grunt.registerTask('default', ['jshint', 'env']);
};