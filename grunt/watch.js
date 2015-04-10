module.exports = function(grunt, options) {
  'use strict';

  var frontend = options.frontend;

  var task = {
    compile: {
      tasks: ['default'],
      files: [
        frontend.ng.src + '**/*.js'
      ]
    },
    frontend: {
      options: {
        livereload: true,
        spawn: false
      },
      files: [
        './release/**/*.*',
        './index.html',
        './sample/**/*.*'
      ]
    }
  };

  return task;
};
