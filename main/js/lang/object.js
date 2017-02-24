var nl = nl || {};
(function (nl, win, doc) {

    nl.Object = nl.extend(null);
    nl.Object.prototype.super = function (funName, args) {
        if (arguments.length == 1 || !args) {
            args = [];
        }
        var that = this.__super_ ? this.__super_ : this;
        var prototype = that._super_;
        var ret = undefined;
        while (typeof prototype[funName] === 'function') {
            if (that[funName] === prototype[funName]) {
                prototype = prototype._super_;
                continue;
            } else {
                this.__super_ = prototype;
                ret = prototype[funName].apply(this, args);
                break;
            }
        }
        this.__super_ = null;
        return ret;
    }
    nl.Object.prototype.init = function (config) {
        this._observers = {};
        this._observersCount = {};
    }
    nl.Object.prototype.addObserver = function (name, target, callBack, sender, index) {
        if (!this._observers[name]) {
            this._observers = [];
            this._observersCount[name] = 0;
        }
        if (arguments.length < 5) {
            index = 0;
        }
        for (var i = 0, len = this._observers[name].length ; i < len; ++i) {
            var observer = this._observers[name][i];
            if (observer.index > index) {

            } else if () {
                
            }
        }
    }
    
})(nl, window, document);