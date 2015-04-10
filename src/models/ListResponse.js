var ListAjaxResponse = (function() {
    _extendResponse(ListAjaxResponse);

    function ListAjaxResponse(res) {
        ListAjaxResponse.__super__.constructor.apply(this, arguments);

        this.type = TYPES.list;
        this.items = res.data.items || [];
        this.value = res.data.value || {};
        this.totalPages = res.data.totalPages || 1;
        this.currentPage = res.data.currentPage || this.totalPages;
    }

    return ListAjaxResponse;
}).call(this);
