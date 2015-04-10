(function() {


  /* @ngInject */
  function MenuDirectiveFactory(MenuService) {


    return {
      restrict: 'E',
      templateUrl: '/sample/Menu.html',
      link: function MenuPostLink(iScope, iElement, iAttrs) {
        iScope.callAsForm = function(event) {
          MenuService.form();
        };
        iScope.callAsList = function(event) {
          MenuService.list();
        };
        iScope.callAsSimple = function(event) {
          MenuService.simple();
        };
        iScope.callAsUpload = function(event) {
          MenuService.upload();
        };
        iScope.callAsError = function(event) {
          MenuService.error();
        };
      }
    };
  }


  /* @ngInject */
  function MenuServiceFactory($http, $q, debuggerValue, AjaxInterceptor) {
    var self = this;

    var _setValue = function(value, type) {
      debuggerValue.value = value;
      debuggerValue.type = type || 'info';
    };

    self.form = function() {
      return $http.post('/api/v1/test/form', { fieldA: 'hello', fieldB: 'world' }, { adapt: 'form' /*, adaptAsPlainData: true */ }).then(
        function(result) {
          _setValue(result);
          return result;
        },
        function(result) {
          _setValue(result, 'danger');
          return $q.reject(result);
        }
      );
    };
    self.simple = function() {
      return $http.post('/api/v1/test/simple', null, { adapt: 'simple' }).then(
        function(result) {
          _setValue(result);
          return result;
        },
        function(result) {
          _setValue(result, 'danger');
          return $q.reject(result);
        }
      );
    };
    self.list = function() {
      return $http.post('/api/v1/test/list', null, { adapt: 'list' }).then(
        function(result) {
          _setValue(result);
          return result;
        },
        function(result) {
          _setValue(result, 'danger');
          return $q.reject(result);
        }
      );
    };
    self.upload = function() {
      return $http.post('/api/v1/test/upload', null, { adapt: 'upload' }).then(
        function(result) {
          _setValue(result);
          return result;
        },
        function(result) {
          _setValue(result, 'danger');
          return $q.reject(result);
        }
      );
    };
    self.error = function() {
      return $http.post('/api/v1/test/error', null, { adapt: 'form' }).then(
        function(result) {
          _setValue(result, 'danger');
          return $q.reject(result);
        }, function(result) {
          _setValue(result, 'danger');
          return $q.reject(result);
        }
      );
    };
  }

  angular
    .module('Code-Y.ajax.sample')
    .service('MenuService', MenuServiceFactory)
    .directive('navMenu', MenuDirectiveFactory)
  ;
}).call(this);
