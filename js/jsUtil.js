// 因为继承要实现很多次，单独抽出来
var jsUtil = {
    // 圣杯模式
    inherit: function (target, origin) {
        var temp = function () {};
        temp.prototype = origin.prototype;
        target.prototype = new temp();
        target.prototype.constructor = target;
    },
    // 返回一个构造函数（子类），继承自origin
    extends: function (origin) {
        var result = function () {
            // 当这个构造函数进行new操作时，就会同时继承到origin上面的属性
            origin.apply(this, arguments);
        }
        // 圣杯模式继承origin的原型
        this.inherit(result, origin);
        return result;
    },
    // 返回一个继承了origin的构造函数，并且符合单例模式。如果没传origin，则不作继承。
    single: function(origin) {
        var singleResult = (function () {
            var instance = null;
            return function () {
                if(instance) {
                    return instance;
                }
                origin && origin.apply(this, arguments);
                instance = this;
            }       
        }());
        origin && this.inherit(singleResult, origin);
        return singleResult;
    },
    //节流
    throttle: function (origin, wait) {
        var startTime = 0;
        return function () {
            var lastTime = + new Date();
            if(lastTime - startTime >= wait) {
                origin.apply(this, arguments);
                startTime = lastTime;
            }          
        }
    }
}
