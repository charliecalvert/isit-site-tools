module.exports = function(grunt) {
    'use strict';

    grunt.initConfig({

        pkg: '<json:package.json>',

        jshint: {
            files: ['**/*.js'],

            options: {
                ignores: [
                    '**/node_modules/**', '**/components/**'
                ],
                reporter: require('jshint-stylish'),
                strict: true,
                jasmine: true
            }
        },

        clean: {
            yourTarget: {
                src: ['**/node_modules/**', '**/components/**']
            }
        },



    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.registerTask('check', ['jshint']);
    grunt.registerTask('test', ['jshint', 'karma']);
};
