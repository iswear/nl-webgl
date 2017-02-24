var nl = nl || {};
(function () {

    nl.extend = function (base) {
        var Zero = function (config) {
            this.init(config);
        }
        if (base) {
            Zero.prototype = Object.create(base.prototype);
            Zero.prototype._super_ = base.prototype;
        } else {
            Zero.prototype.init = function (config) { }
        }
        return Zero;
    }

})();