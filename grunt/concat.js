var fs = require('fs');

module.exports = function(grunt, options) {
  'use strict';

  var frontend = options.frontend;


  var task = {
    bannerize: {
      options: {
        stripBanners: true,
        banner: frontend.banner
      },
      files: [
        {
          nonull: true,
          src: frontend.ng.output,
          dest: frontend.ng.output
        },
        {
          nonull: true,
          src: frontend.ng.outputMin,
          dest: frontend.ng.outputMin
        }
      ]
    }
  };


  return task;
};
