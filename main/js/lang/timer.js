var nl = nl || {};
(function (nl, win, doc) {

    var reqAniFrame = null;
    if (win.requestAnimationFrame) {
        reqAniFrame = win.requestAnimationFrame;
    } else if (win.webkitRequestAnimationFrame) {
        reqAniFrame = win.webkitRequestAnimationFrame;
    } else if (win.mozRequestAnimationFrame) {
        reqAniFrame = win.mozRequestAnimationFrame;
    } else if (win.oRequestAnimationFrame) {
        reqAniFrame = win.oRequestAnimationFrame;
    } else if (win.msRequestAnimationFrame) {
        reqAniFrame = win.msRequestAnimationFrame;
    }

    nl.timer = {};
    nl.timer.setTimeout = function (callBack, target, delay) {
        win.setTimeout(function () {
            callBack.call(target);
        }, delay);
    }
    nl.timer.setInterval = function (callBack, target, interval) {
        win.setInterval(function () {
            callBack.call(target);
        }, interval);
    }
    nl.timer.setLooper = function (callBack, target) {
        if (reqAniFrame) {
            function requestFrameProxy() {
                callBack.call(target);
                reqAniFrame(requestFrameProxy);
            }
            requestFrameProxy();
        } else {
            nl.timer.setInterval(callBack, target, 17);
        }
    }

})(nl, window, document);