/** 
 * 实现思路
 *      在一个固定位置，生成200个圆
 *      让半径小于一定值的元素上升
 *      同时左右摇摆上升
 *      上升的同时改变其大小
 * 
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


// 存放所有火焰
var balls = [];

// 默认火焰粒子数量
var num = 200;

// 工具类函数
function random(min,max){
    return ~~(Math.random() * (max - min) + min);
}

var x = w/2;
var y = h/2;

function Ball(){
    // 火焰坐标
    this.x = x;
    this.y = y;

    // 火焰上升速度
    this.iSpeedX = 0;
    this.iSpeedY = random(5,15) / 8;
    // 圆的半径
    this.radius = random(1,25);
    // 颜色设置
    this.hue = 0;
    this.saturation = random(50,100);
    this.lightness = random(20,70);
    this.alpha = random(1,10) / 100;
}

Ball.prototype.render = function(){ // 只提供渲染
    ctx.beginPath();
    ctx.fillStyle = 'hsla('+this.hue+', '+this.saturation+'%, '+this.lightness+'%, '+this.alpha+')';
    // ctx.fillStyle = 'red';
    ctx.arc(this.x,this.y,this.radius,0,Math.PI * 2);
    ctx.fill()
}

Ball.prototype.update = function(){
    // this.x 
    // 半径小于一定值的火焰上升
    if(this.radius < 20){
        this.y -= this.iSpeedY;
        this.x += (Math.random() - 0.5) * 4;
        // 改变其半径
        this.radius -= random(1,10) / 40;

        // 如果他的半径小于一定值，则将x，y重新归为
        if(this.radius <= 0){
            this.x = x;
            this.y = y;
            this.radius = random(1,25);
            this.lightness = random(20,70);
            this.saturation = random(50,100);
        }
    }else{
        this.radius = random(1,25);
    }

    // 让透明度改变
    this.alpha -= 0.004;
    if(this.alpha <= 0){
        this.alpha = random(1,10) / 100;
    }

    this.hue <= 50 ? this.hue ++ : this.hue = random(0,50);
}

// 页面一加载，渲染火焰
for(var i = 0; i < num; i++){
    balls.push(new Ball())
}

function loop() {

    // 隐藏原内容和新内容重叠部分
    ctx.globalCompositeOperation = 'destination-out';

    ctx.fillStyle = 'rgba(0,0,0,0.08)';
    ctx.fillRect(0, 0, w, h);

    // 恢复
    ctx.globalCompositeOperation = 'lighter';

    var count = balls.length;
    while (count--) {
        balls[count].render();
        balls[count].update();
    }

    window.requestAnimationFrame(loop);
}

loop()

c.onmousemove = function(e){
    var event = window.event || e;
    x = event.clientX;
    y = event.clientY;

}

c.onmouseleave = function(){
    x = w/2;
    y = h/2;
}