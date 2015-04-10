var AjaxAdapter = (function() {
    function AjaxAdapter() {
        var blackList = new RegExp(ignoredTypes.join('|'));

        angular.forEach(TYPES, function(value, type) {
            var method = 'setType' + (type.charAt(0).toUpperCase() + type.slice(1));

            if(!blackList.test(type)) {
                this[method] = function(configs) {
                    return this._setType(configs, value);
                };
            }
        }, this);

    }

    AjaxAdapter.prototype._types = TYPES;

    AjaxAdapter.prototype._setType = function(configs, _type) {
        if(isObject(configs)) {

            configs.adapt = _type;

        }

        return this;
    };

    return AjaxAdapter;
}).call(this);
