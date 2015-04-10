(function() {
   
  /* @ngInject */
  function AjaxInterceptorModuleConfig() {
    
  }
   
  /* @ngInject */
  function AjaxInterceptorModuleRun($rootScope) {

  }
   
   
  var dependencies = [
    'Code-Y.ajax'
  ];
  

  angular
    .module('Code-Y.ajax.sample', dependencies)
    .config(AjaxInterceptorModuleConfig)
    .run(AjaxInterceptorModuleRun)
  ;
}).call(this);
