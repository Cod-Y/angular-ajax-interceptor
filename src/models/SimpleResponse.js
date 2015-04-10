var SimpleAjaxResponse = (function() {
    _extendResponse(SimpleAjaxResponse);

    function SimpleAjaxResponse(res) {
        SimpleAjaxResponse.__super__.constructor.apply(this, arguments);
        this.value = res.data.value || {};
        this.type = TYPES.simple;
    }

    return SimpleAjaxResponse;
}).call(this);

