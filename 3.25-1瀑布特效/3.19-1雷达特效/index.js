
/**
 * 实现思路：
 *  1.以窗口中心点为圆心，点击的位置为半径，绕着圈转
 *  越靠近圆心的线速度越快
 * 
 * */

window.requestAnimationFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function (fn) {
            window.setTimeout(fn, 1000 / 60);
        };
})();

var c = document.getElementById('c'),
    w = c.width = window.innerWidth,
    h = c.height = window.innerHeight,
    ctx = c.getContext('2d');


// 工具类函数
function getDistance(origin, target) { // 求出两点之间的距离
    var a = Math.abs(origin.x - target.x);
    var b = Math.abs(origin.y - target.y);
    return Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
}

function random(min,max){ //返回最大值到最小值的区间
    return ~~(Math.random() * (max - min) + min);
}

// 圆心确定
var circleCenter = {
    x: w / 2,
    y: h / 2
}
// 存放所有圆形对象的信息
var circles = [];

// 粒子的构造函数
function Circle(x, y) {

    this.dx = (w/2) - x;
    this.dy = (h/2) - y;
    // 求出两点距离
    this.distance = getDistance(circleCenter, {
        x: x,
        y: y
    });
    // 偏移角度
    this.angle = Math.atan2(this.dy, this.dx) + Math.PI / 2;
    // 上一个值的坐标
    this.lastX = x;
    this.lastY = y;
    // 圆形的初始值坐标
    this.x = x;
    this.y = y;
    // 颜色
    this.colorAngle = 0;
    // 半径
    this.radius = 1;
    // 移动速度 ~~ 是简写操作，将小数向下取整 ~~4.8 == 4
    this.speed = (random(5,10) / 1000) * (this.distance / 750) + 0.025;

}

Circle.prototype = {
    render: function () {
        // 开始路径
        ctx.beginPath();
        // 选择颜色
        ctx.fillStyle = 'hsla(' + this.colorAngle + ',100%,50%,1)';
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        // 填充
        ctx.fill();
    },
    update: function () {
        
        this.x = circleCenter.x + Math.sin(this.angle * -1) * this.distance;
        this.y = circleCenter.y + Math.cos(this.angle * -1) * this.distance;
        this.angle += this.speed;

        this.colorAngle < 255 ? this.colorAngle++ : this.colorAngle = 0;

    }
}


var count = 50;
while(count --){
    circles.push(new Circle(w / 2, h / 2 - (count * 2)))
}



function loop() {

    // 隐藏原内容和新内容重叠部分
    ctx.globalCompositeOperation = 'destination-out';

    // 减淡画布内容，出现光晕
    ctx.fillStyle = 'rgba(0,0,0,0.08)';
    ctx.fillRect(0, 0, w, h);

    // 恢复
    ctx.globalCompositeOperation = 'lighter';

    // 渲染圆心
    ctx.beginPath();
    ctx.fillStyle = 'red';
    ctx.arc(circleCenter.x, circleCenter.y, 2, 0, Math.PI * 2);
    ctx.fill();

    var i = circles.length;
    while (i--) {
        circles[i].render();
        circles[i].update();
    }

    // 尾递归调用
    window.requestAnimationFrame(loop);

}


loop();


c.onmousedown = function(e){
    var event = window.event || e;
    circles.push(new Circle(event.clientX,event.clientY));

    c.onmousemove = function(e){
        var event = window.event || e;
        circles.push(new Circle(event.clientX,event.clientY));

        // 阻止默认事件产生
        e.preventDefault();
    }

    c.onmouseup = function(e){
        c.onmousemove = null;
        c.onmouseup = null;
        
    }
    // 阻止默认事件产生
    e.preventDefault();
}
