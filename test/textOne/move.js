function getCSS(obj, style) {
  if (window.getComputedStyle) {
    return getComputedStyle(obj)[style];
  }
  return obj.currentStyle[style];
}
function move(obj, attr, target, step, fn) {
  //如果没有建立定时器对象，则在obj下建立定时器对象
  if (!obj.timers) { obj.timers = {}; }
  //清除定时器
  clearInterval(obj.timers[attr]);
  //声明当前值变量cur
  var cur;
  //判断步长step的正负值
  step = parseInt(getCSS(obj, attr)) < target ? step : -step;
  //开启定时器
  obj.timers[attr] = setInterval(function () {
    //如果样式是透明度
    if (attr == 'opacity') {
      //对当前值的取值进行四舍五入，去除由于javascript小数计数中的bug存在的小尾巴
      cur = Math.round(getCSS(obj, attr) * 100);
      if ((cur - target * 100) * step < 0) {
        //设置透明度
        obj.style.opacity = (cur + step * 100) / 100;
        //IE兼容
        obj.style.filter = 'alpha(opacity=' + (cur + step * 100) + ')';
        //透明度到达指定目标时
      } else {
        obj.style.opacity = target;
        obj.filter = 'alpha(opacity=' + target + ')';
        //清除定时器
        clearInterval(obj.timers[attr]);
        obj.timers[attr] = 0;
        //设置回调函数
        fn && fn.call(obj);
      }
      //当样式不是透明度时
    } else {
      //获取样式当前值并赋值给cur
      cur = parseFloat(getCSS(obj, attr));
      ////若步长设置值使得元素超过目标点时，将步长设置值更改为目标点值 - 当前值
      if ((cur + step - target) * step > 0) {
        step = target - cur;
      }
      //将合适的步长值赋值给元素的样式
      obj.style[attr] = cur + step + 'px';
      //当元素到达目标点后，停止定时器
      if (step == target - cur) {
        clearInterval(obj.timers[attr]);
        obj.timers[attr] = 0;
        fn && fn.call(obj);
      }
    }
  }, 30);
}