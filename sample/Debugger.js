(function() {
  var debuggerValue = {};

  /* @ngInject */
  function DebuggerDirectiveFactory(debuggerValue) {


    return {
      restrict: 'E',
      templateUrl: '/sample/Debugger.html',
      link: function DebuggerPostLink(iScope, iElement, iAttrs) {
        iScope.debug = debuggerValue;
      }
    };
  }


  angular
    .module('Code-Y.ajax.sample')
    .value('debuggerValue', debuggerValue)
    .directive('debugger', DebuggerDirectiveFactory)
  ;
}).call(this);
