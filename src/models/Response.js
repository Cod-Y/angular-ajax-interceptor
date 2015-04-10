var Response = (function() {
  function Response(res) {
    this.code = res.status;
    this.message = (isObject(res.data) && res.data.message) ? res.data.message : res.statusText;
    this.type = 'Response';
    this.success = (this.code >= 200 && this.code < 300);

    this._res = res;
  }

  return Response;
}).call(this);

var _extendResponse = function(child) {
  /* jshint ignore:start */
  for(var key in Response) {
    if(Response.hasOwnProperty(key)) {
      child[key] = Response[key]
    }
  }

  function __construct() {
    /* jshint validthis:true */
    this.constructor = child;
  }
  __construct.prototype = Response.prototype;

  child.prototype = new __construct();
  child.__super__ = Response.prototype;

  /* jshint ignore:end */
  return child;
};
