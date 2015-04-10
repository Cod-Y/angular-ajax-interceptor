module.exports = function(grunt, options) {
  'use strict';

  var frontend = options.frontend;


  var task =  {
    options: {
      mangle: false,
      sourceMap: true,
      compress: {
        sequences: false,
        unused: false
      },
      beautify: {
        indent_level: 3,
        indent_start: 3,
        ascii_only: true,
        beautify: true,
        bracketize: true,
        semicolons: true,
        quote_keys: true,
        width: 80
      },
      banner: "(function(window, angular) {\n   'use strict';\n",
      footer: '\n\n})(window, angular);',
      preserveComments: function(node, comment) {
        var whiteList = /(jshint|@ngInject|@preserve)/g;
        var keepComment = false;

        if( whiteList.test(comment.value) ) {
          keepComment = true;
        }

        return keepComment;
      }
    },
    development: {
      files: [
        {
          src: [
            './src/module.js',
            './src/helpers.js',
            './src/Adapter.js',
            './src/models/Response.js',
            './src/models/ErrorResponse.js',
            './src/models/FormResponse.js',
            './src/models/ListResponse.js',
            './src/models/SimpleResponse.js',
            './src/provider.js'
          ],
          dest: frontend.ng.output
        }
      ]
    },
    production: {
      options: {
        mangle: {
          except: [
            'AjaxAdapter',
            'SimpleAjaxResponse',
            'ListAjaxResponse',
            'FormAjaxResponse',
            'ErrorAjaxResponse',
            'AjaxInterceptor'
          ]
        },
        compress: {
          drop_console: true,
          join_vars: true,
          unused: true
        },
        beautify: {
          ascii_only: true,
          beautify: false
        },
        sourceMap: false,
        preserveComments: false,
        banner: '',
        footer: '\n'
      },
      files: [
        {
          src: frontend.ng.output,
          dest: frontend.ng.outputMin
        }
      ]
    }
  };

  return task;
};
