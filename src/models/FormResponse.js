var FormAjaxResponse = (function() {
  _extendResponse(FormAjaxResponse);

  function FormAjaxResponse(res, isRejected) {
    FormAjaxResponse.__super__.constructor.apply(this, arguments);

    this.type = TYPES.form;
    this.value = res.data.value || {};
    this.errors = res.data.errors || [];
    this.errorsCount = res.data.errorCount || this.errors.length;
    this.hasErrors = (this.errors.length > 0);
    if(isRejected === true) {
      this.success = false;
    }
  }

  return FormAjaxResponse;
}).call(this);
