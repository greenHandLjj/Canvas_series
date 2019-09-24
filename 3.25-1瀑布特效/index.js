/**
 * 实现思路：
 *      定义水流出现位置，随机在这个位置中，出现线条，
 *      线条向下运动，抵达一定坐标点后变成圆形
 *           
 *      
 * 
 * */

var c = document.getElementById('c'),
    w = c.width = window.innerWidth,
    h = c.height = window.innerHeight,
    ctx = c.getContext('2d');

// 存放所有水滴
var waterArr = [];
// 初始化x，y轴位置
var originX = w / 2;
var originY = h * 0.2;
// 下降到的位置
var targetY = h * 0.4;
// 水滴数量
var waterNum = 2000;

// 工具类函数
window.requestAnimationFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function (fn) {
            setTimeout(fn, 1000 / 60);
        }
}());

function random(min, max) {
    return ~~(Math.random() * (max - min) + min);
}


class Water {
    constructor() {
        this.x = random(originX - 40, originX + 40);
        this.y = originY;
        // 水滴的下降速度
        this.iSpeedY = Math.random() * 1.5;
        this.reallyHeight = 1;
        // 水滴的长度
        this.height = random(30, 50);
        // 颜色处理
        this.hue = random(200, 220);
        this.saturation = random(30, 60);
        this.lightness = random(30, 60);
        // 控制水滴高度
        this.n = Math.random() * 1.2;
        // 水滴落地后的
        this.r = random(0, 10);
    }

    render() {

        ctx.beginPath();
        ctx.strokeStyle = 'hsla(' + this.hue + ', ' + this.saturation + '%, ' + this.lightness + '%, .05)';
        ctx.lineWidth = 3;
        ctx.strokeRect(this.x, this.y, 1, this.reallyHeight);
        ctx.stroke();

    }

    update() {

        // 水滴下落
        this.y += this.iSpeedY;
        // this.height *= 1.04;
        this.reallyHeight += this.n;

        if (this.reallyHeight >= this.height) {
            this.reallyHeight = this.height;
        }

        // 水滴着地
        if (this.y + this.height >= targetY) {
            // this.iSpeedY *= -1
            // this.height *= 0.95;
            // this.height *= 0.96;
            this.y = originY;
            this.iSpeedY = Math.random() * 1.5 + 0.2;
            this.reallyHeight = 1;
            // 水滴的长度
            this.height = random(15, 30);
            // 水滴爆炸
            this.boom();
        }
    }

    // 绘制水滴爆炸
    boom() {

        ctx.beginPath();
        ctx.fillStyle = 'hsla(' + this.hue + ', ' + this.saturation + '%, ' + this.lightness + '%, .8)';
        ctx.arc(this.x,targetY - 15, this.r, 0, Math.PI * 2);
        ctx.fill();

    }
}

// var water = new Water();
function init() {
    for (var i = 0; i < waterNum; i++) {
        waterArr.push(new Water());
    }
}

init();

function loop() {

    // 隐藏原内容和新内容重叠的部分。
    ctx.globalCompositeOperation = 'destination-out';

    ctx.fillStyle = 'rgba(0,0,0,.45)';
    ctx.fillRect(0, 0, w, h);

    // 恢复 
    ctx.globalCompositeOperation = 'lighter';

    // 绘制一条线
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(255,255,255,0.5)';
    ctx.lineWidth = 0.3;
    ctx.moveTo(originX - 60, originY);
    ctx.lineTo(originX + 60, originY);
    ctx.stroke();

    // 循环遍历元素
    waterArr.forEach(function (item) {
        item.render();
        item.update();
    })

    window.requestAnimationFrame(loop);
}

loop()


window.onresize = function () {

    w = c.width = window.innerWidth;
    h = c.height = window.innerHeight;

}