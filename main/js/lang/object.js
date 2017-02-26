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
        while (prototype && (typeof prototype[funName] === 'function')) {
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
    nl.Object.prototype.init = function () {
        this._observers = {};
        this._observersCount = {};
        this._data = {};
    }
    nl.Object.prototype.addObserver = function (name, cb, cbThis, index) {
        if (!this._observers[name]) {
            this._observers[name] = [];
            this._observersCount[name] = 0;
        }
        if (arguments.length > 1) {
            if (arguments.length < 3) {
                cbThis = win;
            }
            if (arguments.length < 5) {
                index = 0;
            }
            for (var i = 0, len = this._observers[name].length; i < len; ++i) {
                var observer = this._observers[name][i];
                if (observer.index > index) {
                    this._observers[name].splice(i, 0, {
                        cb: cb,
                        cbThis: cbThis,
                        index: index,
                        remove: false
                    });
                    return;
                } else if (observer.index === index && observer.cb === cb &&
                    observer.cbThis === cbThis) {
                    if (observer.remove) {
                        observer.remove = false;
                        this._observersCount[name]++;
                    }
                    return;
                }
            }
            this._observers[name].push({
                cb: cb,
                cbThis: cbThis,
                index: index,
                remove: false
            });
            this._observersCount[name]++;
        }
    }
    nl.Object.prototype.removeObserver = function (name, cb, cbThis, index) {
        if (this._observers[name] && arguments.length > 0) {
            if (arguments.length < 2) {
                for (var i = this._observers[name].length; i >= 0; --i) {
                    var observer = this._observers[name][i];
                    observer.remove = true;
                    this._observersCount[name]--;
                }
            } else if (arguments.length < 3) {
                for (var i = this._observers[name].length; i >= 0; --i) {
                    var observer = this._observers[name][i];
                    if (observer.cb === cb) {
                        observer.remove = true;
                        this._observersCount[name]--;
                    }
                }
            } else if (arguments.length < 4) {
                for (var i = this._observers[name].length; i >= 0; --i) {
                    var observer = this._observers[name][i];
                    if (observer.cb === cb && observer.cbThis === cbThis) {
                        observer.remove = true;
                        this._observersCount[name]--;
                    }
                }
            } else {
                for (var i = this._observers[name].length; i >= 0; --i) {
                    var observer = this._observers[name][i];
                    if (observer.cb === cb && observer.cbThis === cbThis && observer.index === index) {
                        observer.remove = true;
                        this._observersCount[name]--;
                    }
                }
            }
        }
    }
    nl.Object.prototype.postNotification =  function (name, param) {
        if (this._observers[name]) {
            var observers = this._observers[name];
            for (var i = 0, len = observers.length; i < len; ++i) {
                var observer = observers[i];
                if (observer.remove) {
                    observers.splice(i, 1);
                    i--;
                    len--;
                } else {
                    observer.cb.call(observer.cbThis, param);
                }
            }
        }
    }
    nl.Object.prototype.setProperty = function (name, value) {
        if (this[name] !== value) {
            this[name] = value;
            this.postNotification(nl.NOTIFICATION.onProperty, this, {
                key: name,
                value: value
            });
        }
    }
    nl.Object.prototype.getProperty = function (name) {
        return this[name];
    }
    nl.Object.prototype.setData = function (name, value) {
        if (this._data[name] !== value) {
            this._data[name] = value;
            this.postNotification(nl.NOTIFICATION.onData, this, {
                key: name,
                value: value
            });
        }
    }
    nl.Object.prototype.getData = function (name) {
        return this._data[name];
    }
    nl.Object.prototype.destory = function () {
        this.postNotification(nl.NOTIFICATION.onDestroy, this);
        delete this._observers;
        delete this._observersCount;
    }
    
})(nl, window, document);