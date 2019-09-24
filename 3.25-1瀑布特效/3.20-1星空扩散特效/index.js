
/**
 * 实现思路
 *      动画一开始，生成满屏小方格，100
 * 
 *      以屏幕的中心点向外扩散 50 个半径
 *      随机生成x，y轴坐标
 *      越靠近w,h的，越大,同时速度越快
 * 
 * 
 */

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
// 存放所有粒子数据
var particles = [];
// 屏幕中心点坐标
var screenC = {
    x: w / 2,
    y: h / 2
}
// 动画一开始随机生成方格数量
var num = 1000;

// 工具类函数
function random(min, max) { // 求区间随机数
    return ~~(Math.random() * (max - min) + min);
}

function Particle(x,y) {
    this.x = x;
    this.y = y;
    this.iSpeedX = this.x > screenC.x ? 1 * Math.random() + 0.1 : -1 * Math.random() + 0.1;
    this.iSpeedY = this.y > screenC.y ? 1 * Math.random() + 0.1 : -1 * Math.random() + 0.1;
    this.size = 1;
    this.colorAngle = ~~(Math.random() * 50);
}

Particle.prototype = {
    render: function () {

        ctx.fillStyle = 'hsla(' + this.colorAngle + ',100%,50%,1)';
        ctx.fillRect(this.x,this.y,this.size,this.size);
        ctx.fill();

    },
    update: function () {
        // this.size += 0.2;
        this.size = Math.abs( screenC.x - this.x ) / 130 + Math.abs( screenC.y - this.y ) / 130;

        this.x += this.iSpeedX;
        this.y += this.iSpeedY;

        if(this.x > w + 100 || this.x < - 100 || this.y > h + 100 || this.y < - 100 && Math.random() > 0.99){
            // 超出屏幕范围，重新计算x，y
            this.x = random( screenC.x - 50,screenC.x + 50 );
            this.y = random( screenC.y - 50,screenC.y + 50 );
            this.size = 1;
        }

        // 颜色处理
        this.colorAngle < 360 ? this.colorAngle++ : this.colorAngle = 0;
    }
}

// 随机生成num 个小方格
for(var  i = 0; i < num; i ++){
    particles.push(new Particle( random(0,w),random(0,h) ));
}

function loop() {

    // 隐藏原内容和新内容重叠部分
    ctx.globalCompositeOperation = 'destination-out';

    ctx.fillStyle = 'rgba(0,0,0,0.01)';
    ctx.fillRect(0, 0, w, h);

    // 恢复
    ctx.globalCompositeOperation = 'lighter';

    var count = particles.length;
    while(count --){
        particles[count].render();
        particles[count].update();
    }

    window.requestAnimationFrame(loop);
}

loop();

window.addEventListener('resize',function(){
    // 当窗口大小发生改变时重新计算属性，并且重新开始动画
    particles = [];
    screenC = {
        x: w / 2,
        y: h / 2
    }
})
