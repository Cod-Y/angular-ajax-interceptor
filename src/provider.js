
  /* @ngInject */
  function AjaxInterceptorProviderFactory($httpProvider) {
    var self = this;

    self.types = function AjaxInterceptorProviderSetType(type) {
      angular.extend(TYPES, type);

      return self;
    };
    self.setHeaderKey = function(newKey) {
      if(angular.isString(newKey)) {
        INTERCEPTOR_HEADER_KEY = newKey;
      }

      return self;
    };
    self.ignoreType = function(type) {
      if(angular.isString(type)) {
        ignoredTypes.push(type);
      }

      return self;
    };


    $httpProvider.interceptors.push(function AjaxInterceptorRegister($q, $log) {
      var resolve = $q.when;
      var reject = $q.reject;



      return {
        "request": function AjaxInterceptorRequestInterceptor(config) {
          var _interceptType = _getInterceptRequestConfig(config);

          if(!_interceptType) {
            return config || resolve(config);
          }

          switch(_interceptType) {
            case TYPES.form:
              config.data = config.adaptAsPlainData ? config.data : { "fields" : config.data };
              break;
          }

          return config || resolve(config);
        },
        "response": function AjaxInterceptorResponseInterceptor(response) {
          return _adaptResponse(response, resolve, reject, $log);
        },
        "responseError": function AjaxInterceptorResponseErrorInterceptor(response) {
          if( !response.config.adapt ) {
            return reject(response);
          }

          return reject( new ErrorAjaxResponse(response) );
        }
      };
    });


    self.$get = function AjaxInterceptorFactory() {
      return new AjaxAdapter();
    };
  }
