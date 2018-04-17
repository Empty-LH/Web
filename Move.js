//obj 元素
//json style
//time 速度
//fn 回掉函数
function startMove(obj, json,time, fn) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        var flag = true;
        for (var attr in json) {
            var iCur = null;
            var speed = null;
            if(attr == "opacity"){
                iCur = parseFloat(getStyle(obj, attr))*100;
            }else{
                iCur = parseInt(getStyle(obj, attr));
            }
            var target = json[attr];
            speed = (target - iCur) / 10;
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
            if (iCur != target) {
                flag = false;
                if(attr == "opacity"){
                    obj.style.opacity = (iCur + speed)/100;
                    obj.style.filter = 'alpha(opacity:'+(iCur+speed)+')';
                }else{
                    obj.style[attr] = iCur + speed + "px";
                }
            }
            if (flag) {
                clearInterval(obj.timer);
                if (fn) {
                    fn();
                }
            }
        }
    }, time)
}
function getStyle(obj, attr) {
    if (obj.currentStyle) {
        return obj.currentStyle[attr];
    } else {
        return getComputedStyle(obj, false)[attr];
    }

}