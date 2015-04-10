var ErrorAjaxResponse = (function() {
    _extendResponse(ErrorAjaxResponse);

    function ErrorAjaxResponse(res) {
        ErrorAjaxResponse.__super__.constructor.apply(this, arguments);
        this.success = false;
        this.type = TYPES.error;
    }

    return ErrorAjaxResponse;
}).call(this);
