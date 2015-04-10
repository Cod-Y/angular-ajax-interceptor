/**!
 * @Project: angular-ajax-interceptor
 * @Authors: [Hitmands <gius.mand.developer@gmail.com>, Luca Pau <luca.pau82@gmail.com>]
 * @Link: https://github.com/Cod-Y/angular-ajax-interceptor
 * @License: MIT
 * @Date: 2015-04-10
 * @Version: 1.0.0
***/

(function(window, angular) {
   'use strict';

   function _getInterceptRequestConfig(requestConfigs) {
      var _type = requestConfigs.adapt;
      if (isUndefined(_type)) {
         return null;
      }
      for (var type in TYPES) {
         if (TYPES.hasOwnProperty(type) && TYPES[type] === _type) {
            return _type;
         }
      }
      return null;
   }

   function _adaptResponse(response, resolve, reject, $log) {
      var adapt = response.config.adapt;
      if (!adapt) {
         return response || resolve(response);
      }
      switch (adapt) {
       case TYPES.list:
         console.log("is: ", TYPES.list);
         return resolve(new ListAjaxResponse(response));

       case TYPES.simple:
         console.log("is: ", TYPES.simple);
         return resolve(new SimpleAjaxResponse(response));

       case TYPES.form:
         console.log("is: ", TYPES.form);
         return resolve(new FormAjaxResponse(response));

       case TYPES.error:
         console.log("is: ", TYPES.error);
         return reject(new ErrorAjaxResponse(response));

       default:
         $log.warn('AjaxAdapter [UNRECOGNIZED "' + adapt + '" RESPONSE TYPE]', response);
         return resolve(new SimpleAjaxResponse(response));
      }
   }

   /* @ngInject */
   function AjaxInterceptorProviderFactory($httpProvider) {
      var self = this;
      self.types = function AjaxInterceptorProviderSetType(type) {
         angular.extend(TYPES, type);
         return self;
      };
      self.setHeaderKey = function(newKey) {
         angular.isString(newKey) && (INTERCEPTOR_HEADER_KEY = newKey);
         return self;
      };
      self.ignoreType = function(type) {
         angular.isString(type) && ignoredTypes.push(type);
         return self;
      };
      $httpProvider.interceptors.push(['$q', '$log', function AjaxInterceptorRegister($q, $log) {
         var resolve = $q.when, reject = $q.reject;
         return {
            "request": function AjaxInterceptorRequestInterceptor(config) {
               var _interceptType = _getInterceptRequestConfig(config);
               if (!_interceptType) {
                  return config || resolve(config);
               }
               switch (_interceptType) {
                case TYPES.form:
                  config.data = config.adaptAsPlainData ? config.data : {
                     "fields": config.data
                  };
               }
               return config || resolve(config);
            },
            "response": function AjaxInterceptorResponseInterceptor(response) {
               return _adaptResponse(response, resolve, reject, $log);
            },
            "responseError": function AjaxInterceptorResponseErrorInterceptor(response) {
               return reject(response.config.adapt ? new ErrorAjaxResponse(response) : response);
            }
         };
      }]);
      self.$get = function AjaxInterceptorFactory() {
         return new AjaxAdapter();
      };
   }
   AjaxInterceptorProviderFactory.$inject = ['$httpProvider'];

   var isUndefined = angular.isUndefined, isArray = angular.isArray, isObject = function(value) {
      return angular.isObject(value) && !isArray(value);
   }, TYPES = {
      "form": "form",
      "upload": "upload",
      "simple": "simple",
      "list": "list",
      "error": "error"
   }, ignoredTypes = [ "error" ], INTERCEPTOR_HEADER_KEY = "x-ajax-adapt";

   angular.module("Code-Y.ajax", []).provider("AjaxInterceptor", AjaxInterceptorProviderFactory);

   var AjaxAdapter = function() {
      function AjaxAdapter() {
         var blackList = new RegExp(ignoredTypes.join("|"));
         angular.forEach(TYPES, function(value, type) {
            var method = "setType" + (type.charAt(0).toUpperCase() + type.slice(1));
            blackList.test(type) || (this[method] = function(configs) {
               return this._setType(configs, value);
            });
         }, this);
      }
      AjaxAdapter.prototype._types = TYPES;
      AjaxAdapter.prototype._setType = function(configs, _type) {
         isObject(configs) && (configs.adapt = _type);
         return this;
      };
      return AjaxAdapter;
   }.call(this), Response = function() {
      function Response(res) {
         this.code = res.status;
         this.message = isObject(res.data) && res.data.message ? res.data.message : res.statusText;
         this.type = "Response";
         this.success = this.code >= 200 && this.code < 300;
         this._res = res;
      }
      return Response;
   }.call(this), _extendResponse = function(child) {
      function __construct() {
         /* jshint validthis:true */
         this.constructor = child;
      }
      /* jshint ignore:start */
      for (var key in Response) {
         Response.hasOwnProperty(key) && (child[key] = Response[key]);
      }
      __construct.prototype = Response.prototype;
      child.prototype = new __construct();
      child.__super__ = Response.prototype;
      /* jshint ignore:end */
      return child;
   }, ErrorAjaxResponse = function() {
      function ErrorAjaxResponse(res) {
         ErrorAjaxResponse.__super__.constructor.apply(this, arguments);
         this.success = !1;
         this.type = TYPES.error;
      }
      _extendResponse(ErrorAjaxResponse);
      return ErrorAjaxResponse;
   }.call(this), FormAjaxResponse = function() {
      function FormAjaxResponse(res) {
         FormAjaxResponse.__super__.constructor.apply(this, arguments);
         this.type = TYPES.form;
         this.value = res.data.value || {};
         this.errors = res.data.errors || [];
         this.errorsCount = res.data.errorCount || this.errors.length;
         this.hasErrors = this.errors.length > 0;
      }
      _extendResponse(FormAjaxResponse);
      return FormAjaxResponse;
   }.call(this), ListAjaxResponse = function() {
      function ListAjaxResponse(res) {
         ListAjaxResponse.__super__.constructor.apply(this, arguments);
         this.type = TYPES.list;
         this.items = res.data.items || [];
         this.value = res.data.value || {};
         this.totalPages = res.data.totalPages || 1;
         this.currentPage = res.data.currentPage || this.totalPages;
      }
      _extendResponse(ListAjaxResponse);
      return ListAjaxResponse;
   }.call(this), SimpleAjaxResponse = function() {
      function SimpleAjaxResponse(res) {
         SimpleAjaxResponse.__super__.constructor.apply(this, arguments);
         this.value = res.data.value || {};
         this.type = TYPES.simple;
      }
      _extendResponse(SimpleAjaxResponse);
      return SimpleAjaxResponse;
   }.call(this);
//# sourceMappingURL=angular-codey-ajaxinterceptor.js.map

})(window, angular);