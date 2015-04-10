module.exports = function(grunt, options) {
  'use strict';

  var frontend = options.frontend;

  var task = {
      options: {
        singleQuotes: true
      },
      modules: {
        files: [
          {
            src: frontend.ng.output,
            dest: frontend.ng.output
          }
        ]
      }
  };

  return task;
};
