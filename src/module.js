var isUndefined = angular.isUndefined;
var isArray = angular.isArray;
var isObject = function(value) {
    return(angular.isObject(value) && !isArray(value));
};

var TYPES = {
    form: 'form',
    upload: 'upload',
    simple: 'simple',
    list: 'list',
    error: 'error'
};
var ignoredTypes = ['error'];


var INTERCEPTOR_HEADER_KEY = "x-ajax-adapt";
angular
    .module('Code-Y.ajax', [])
    .provider('AjaxInterceptor', AjaxInterceptorProviderFactory)
;