/**
         *  实现思路
         *      随机一定数量的长方形
         *      随机宽度
         *      随机初始化值，左右移动
         *      抵达边界
         *  */

var c = document.getElementById('c'),
    w = c.width = window.innerWidth,
    h = c.height = window.innerHeight,
    ctx = c.getContext('2d');

// 存放所有水晶的数组
var crystalArr = [];
// 水晶数量
var crystalNum = 70;

// 随机颜色
var hue = random(0, 200);

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

// 水晶的构造函数
function Crystal() {
    // 水晶的x轴坐标和y轴坐标
    // this.y = 0;
    this.x = random(0, w);

    // 水晶的随机宽度
    this.width = random(2, 14);

    // 随机的x速度
    this.iSpeedX = (Math.random() * 0.35);
    // 随机的渐变上边距
    this.linearYT = random(0, h / 2 - 100);
    // 随机的渐变下边距
    this.linearYB = random(h / 2 + 100, h);
}

Crystal.prototype = {
    // 渲染数据
    render: function () {

        ctx.beginPath();
        // 添加模糊值 
        ctx.shadowColor = "hsla(" + hue + 80 + ",50%,50%,.8)";
        ctx.shadowBlur = 5;
        // 添加渐变
        var linearGradient = ctx.createLinearGradient(0, this.linearYT, 0, this.linearYB);
        linearGradient.addColorStop(0, "hsla(" + hue + ",50%,50%,.0)");
        linearGradient.addColorStop(0.2, "hsla(" + hue + 20 + ",50%,50%,0.2)");
        linearGradient.addColorStop(0.5, "hsla(" + hue + 40 + ",50%,50%,.8)");
        linearGradient.addColorStop(0.8, "hsla(" + hue + 60 + ",50%,50%,.5)");
        linearGradient.addColorStop(1, "hsla(" + hue + 80 + ",50%,50%,.0)");
        ctx.fillStyle = linearGradient;

        ctx.fillRect(this.x, 0, this.width, h);
        ctx.fill();

    },
    // 改变数据值
    update: function () {
        // 改变其x轴
        this.x += this.iSpeedX;
        // 如果抵达边界
        if (this.x > w + this.width) {
            this.x = -this.width;
        }
    }
}

// 初始化数据
function init() {
    // 循环出100个水晶对象
    for (var i = 0; i < crystalNum; i++) {
        crystalArr[i] = new Crystal();
    }
}

init();

// 循环函数
function loop() {

    // 隐藏原内容和新内容重叠的部分。
    ctx.globalCompositeOperation = 'destination-out';

    ctx.fillStyle = 'rgba(0,0,0,.5)';
    ctx.fillRect(0, 0, w, h);

    // 恢复 
    ctx.globalCompositeOperation = 'lighter';

    // 循环遍历元素
    crystalArr.forEach(function (item) {
        item.render();
        item.update();
    })

    window.requestAnimationFrame(loop);
}


loop();

// 窗口变化
window.onresize = function () {
    // 重新初始化
    init();
    w = c.width = window.innerWidth;
    h = c.height = window.innerHeight;
}   

// 点击canvas
c.onclick = function(){
    hue = random(0, 200);
    init();
}

// c.onmousemove = function(e){
//     var evnet = window.evnet || e;
//     var x = event.clientX;
    
//     crystalArr.forEach(function(item){
//         item.iSpeedX = 0;
//         item.x = item.x + (x - w/2)/7;
//     })

// }
// // 鼠标移开
// c.onmouseleave = function(){
//     crystalArr.forEach(function(item){
//         item.iSpeedX = (Math.random() * 0.35);
//     })
// }