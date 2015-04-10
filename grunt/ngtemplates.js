module.exports = function(grunt, options) {
  'use strict';

  var frontend = options.frontend;

  var task = {
    views: {
      options: {
        module: frontend.ng.app,
        htmlmin: {
          collapseBooleanAttributes:      true,
          collapseWhitespace:             true,
          removeAttributeQuotes:          true,
          removeComments:                 true,
          removeEmptyAttributes:          true,
          removeRedundantAttributes:      true,
          removeScriptTypeAttributes:     true,
          removeStyleLinkTypeAttributes:  true
        },
        url: function(_url) {
          _url = _url.replace(frontend.ng.src, '/partials/');
          return _url;
        }
      },
      src: frontend.ng.src + '**/*.html',
      dest: frontend.build.tplsJs
    }
  };

  return task;
};
