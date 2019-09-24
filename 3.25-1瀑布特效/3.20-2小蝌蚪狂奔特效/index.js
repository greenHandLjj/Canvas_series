
/**
 *  实现思路 ： 
 *      以屏幕中心点为范围，向外扩展200半径
 *      随机在这w/2 - 300 w/2 + 300, h/2 - 300
 *      奔跑吧，小蝌蚪
 * */

// 兼容处理
window.requestAnimationFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function (fn) {
            setTimeout(fn, 1000 / 60);
        }
})();


var c = document.getElementById('c'),
    w = c.width = window.innerWidth,
    h = c.height = window.innerHeight,
    ctx = c.getContext('2d');

// 存放所有线条数据
var lines = [];

// 线条数量
var num = 400;

// 扩散半径
var radius = 250;

var screenC = {
    x: w / 2,
    y: h / 2
}

// 工具类函数
function random(min, max) { // 区间
    return ~~(Math.random() * (max - min) + min);
}

// 线条的构造函数
function Line() {
    // 出生点,屏幕中心
    this.originX = screenC.x;
    this.originY = screenC.y;
    // 目标点
    this.targetX = random(screenC.x - radius, screenC.x + radius);
    this.targetY = random(screenC.y - radius, screenC.y + radius);
    // 移动速度
    this.iSpeedX = (this.targetX - this.originX) / 20;
    this.iSpeedY = (this.targetY - this.originY) / 20;
    // 色值
    this.colorH = random(random(0,50),random(100,150));
    // 半径
    this.radius = random(1, 3);
}

Line.prototype = {
    render: function () {
        ctx.beginPath();
        ctx.fillStyle = 'hsla(' + this.colorH + ',100%,50%,1)';
        ctx.arc(this.originX, this.originY, this.radius, 0, Math.PI * 2);
        ctx.fill();
    },
    update: function () {

        this.originX += this.iSpeedX + (Math.random() - 0.5) * random(1,5);
        this.originY += this.iSpeedY + (Math.random() - 0.5) * random(1,5);

        // 超出屏幕清除
        if (this.originX > w || this.originX < 0 || this.originY < 0 || this.originY > h && Math.random() > 0.8) {
            this.delete()
        }
    },
    delete: function () {
        lines.find(function (item, index, arr) {
            if (item == this) {
                arr.splice(index, 1);
                return true;
            }
        }, this)
    }
}

// 渲染值
for (var i = 0; i < num; i++) {
    lines.push(new Line());
}

function loop() {

    // 隐藏原内容和新内容重叠部分
    ctx.globalCompositeOperation = 'destination-out';

    ctx.fillStyle = 'rgba(0,0,0,0.1)';
    ctx.fillRect(0, 0, w, h);

    // 恢复
    ctx.globalCompositeOperation = 'lighter';

    var count = lines.length;
    while (count--) {
        lines[count].render();
        lines[count].update();
    }

    window.requestAnimationFrame(loop);
}

loop()

c.onclick = function (e) {
    var event = window.event || e;

    // 更改当前中心点
    screenC = {
        x: event.clientX,
        y: event.clientY
    }

    num = random(200, 300);
    // 渲染值
    for (var i = 0; i < num; i++) {
        lines.push(new Line());
    }

}