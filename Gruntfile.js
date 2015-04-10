module.exports = function(grunt) {
    'use strict';

    var frontendConfigs = grunt.file.readJSON('./config/frontend-configuration.json');
    var pkg = grunt.file.readJSON('./package.json');

    require('load-grunt-config')(grunt, {
        init: true,
        jitGrunt: {
            staticMappings: {
                "ngtemplates" : "grunt-angular-templates"
            }
        },
        data: {
            "frontend" : frontendConfigs,
            "pkg" : pkg
        }
    });



    grunt.task.registerTask('default', [
        'newer:uglify:development',
        'newer:ngAnnotate',
        'newer:jshint:frontend'
    ]);

    grunt.task.registerTask('ngapp', [
        'uglify:development',
        'ngAnnotate',
        'jshint:frontend',
        'uglify:production'
    ]);

  grunt.task.registerTask('release', [
    'ngapp',
    'concat:bannerize'
  ]);
};
