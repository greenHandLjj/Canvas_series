/*
    动画拆解
        1.生成小圆点
            1.1 小圆点位置如何确定？（随机数 || 鼠标点击的x,y）
            1.2 小圆点如何不停闪烁？(最大值 - 最小值之间随机变换)
            
        2.生成线条
        3.烟花爆炸

*/



// 兼容性处理
window.requestAnimationFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        }
})();

var c = document.getElementById('c'),
    w = c.width = window.innerWidth,
    h = c.height = window.innerHeight,
    ctx = c.getContext('2d');

// 节流处理
var n = 0;

// 起始色调
var hue = 120;

// 存放烟花信息
var fireworks = [];
// 存放粒子信息
var particle = [];

// 工具类函数
function random(min, max) { // 计算随机数
    return Math.random() * (max - min) + min;
}
// function getDistance(origin, target) { // 计算两点之间的距离
//     var a = Math.abs(origin.x - target.x);
//     var b = Math.abs(origin.y - target.y);
//     //Math.sqrt 是求平方根 a² + b² = c²；求出c的平方根，则为两点的距离
//     return Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
// }


// 生成小圆点和线条
function Firework(x, y) {
    this.x = x;
    this.y = y;
    this.lineX = x;
    this.lineY = y;
    // 指示器圆的半径
    this.targetRadius = 1;
    // 颜色处理
    this.brightness = random(50, 70);
    // 两点之间的距离
    // this.distance = getDistance({ x: w / 2, y: h }, { x: this.x, y: this.y });
    // x轴增量
    this.iSpeedX = (x - w / 2) / 40;
    // y轴增量
    this.iSpeedY = (y - h) / 40;
    // 存放线条的两点坐标,分别是moveTo()  和  lineTo()  的坐标
    this.linePosiArr = [
        { x: w / 2, y: h }, // 起始点
        { x: w / 2 - this.iSpeedX * 5, y: h - this.iSpeedY * 5 }  // lineTo
    ];
}

Firework.prototype = {
    render: function () {
        // 颜色选择
        ctx.strokeStyle = 'hsl(' + hue + ', 100%, ' + this.brightness + '%)';
        // 绘制线条
        ctx.beginPath();
        ctx.moveTo(this.linePosiArr[0].x, this.linePosiArr[0].y);
        ctx.lineTo(this.linePosiArr[1].x, this.linePosiArr[1].y);
        // ctx.fillRect(this.linePosiArr[0].x,this.linePosiArr[0].y,5,5);
        // ctx.fillStyle = 'red';
        // ctx.fillRect(this.linePosiArr[1].x,this.linePosiArr[1].y,5,5);

        // 绘制线段
        ctx.stroke();
        // 开始绘制
        ctx.beginPath();
        // 假想绘制圆
        ctx.arc(this.x, this.y, this.targetRadius, 0, Math.PI * 2);
        // 实际绘制圆，以描边绘制
        ctx.stroke();
    },
    update: function () {
        // 半径增加,如果指示器的半径小于8，++，反之归位
        this.targetRadius < 8 ? this.targetRadius += 0.3 : this.targetRadius = 1;

        var i = this.linePosiArr.length;
        while (i--) {
            // 移动的方向moveTo
            this.linePosiArr[i].x += this.iSpeedX;
            this.linePosiArr[i].y += this.iSpeedY;
            // 移动的方向lineTo
        }

        // 备份this
        var self = this;
        // 判断抵达
        if (Math.abs(this.linePosiArr[0].x - this.x) <= 1 && Math.abs(this.linePosiArr[0].y - this.y) <= 1) {
            // console.log('抵达目标')
            // 清除自身
            fireworks.find(function (item, index, arr) {
                if (self == item) {
                    arr.splice(index, 1);
                    // 添加粒子
                    var num = 30;
                    while(num -- ){
                        particle.push(new Particle(self.x, self.y));
                    }

                    return true;
                }
            })
        }
        //


    }
}

// 粒子构造函数
function Particle(x, y) {
    // 粒子爆炸中心点
    this.x = x;
    this.y = y;

    this.coordinates = [];
	this.coordinateCount = 5;
	while( this.coordinateCount-- ) {
		this.coordinates.push( [ this.x, this.y ] );
	}
	// 在所有可能的方向设置一个随机角度，以弧度为单位
	this.angle = random( 0, Math.PI * 2 );
	this.speed = random( 1, 10 );
	// 摩擦会使粒子减速。
	this.friction = 0.95;
	// 施加重力并将颗粒向下拉。
	this.gravity = 1;
	// 将色调设置为总色调变量的随机数+-50
	this.hue = random( hue - 50, hue + 50 );
	this.brightness = random( 50, 80 );
	this.alpha = 1;
	// 设置粒子消失的速度
	this.decay = random( 0.015, 0.03 );
}

Particle.prototype = {
    render: function () {
        // 开始绘制
        ctx. beginPath();
        ctx.moveTo( this.coordinates[ this.coordinates.length - 1 ][ 0 ], this.coordinates[ this.coordinates.length - 1 ][ 1 ] );
        ctx.lineTo( this.x, this.y );
        ctx.strokeStyle = 'hsla(' + this.hue + ', 100%, ' + this.brightness + '%, ' + this.alpha + ')';
        // 结束绘制
        ctx.stroke();
    },
    update: function () {
        // 删除坐标数组中的最后一项
        this.coordinates.pop();
        // 将当前坐标添加到数组的开头
        this.coordinates.unshift( [ this.x, this.y ] );
        // 减慢粒子速度
        this.speed *= this.friction;
        // 将坐标重新赋值
        this.x += Math.cos( this.angle ) * this.speed;
        this.y += Math.sin( this.angle ) * this.speed + this.gravity;
        // 淡化粒子
        this.alpha -= this.decay;
        
        // 备份this
        var self = this;
        // remove the particle once the alpha is low enough, based on the passed in index
        if( this.alpha <= this.decay ) {
            particle.find(function(item,index,arr){
                if(self == item){
                    // 删除当前粒子
                    arr.splice(index,1);
                    return true;
                }
            })
        }

    }
}

// 每隔1秒自动放置一个粒子
setInterval(function(){
    fireworks.push( new Firework( random(1,w-1),random(1,h-1) ) );
},1000)

function loop() {  // 循环函数

    // 更新随机颜色
    hue = random(0, 360);

    // 隐藏原内容和新内容重叠部分
    ctx.globalCompositeOperation = 'destination-out';
    // 减淡画布内容
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(0, 0, w, h);

    ctx.globalCompositeOperation = 'lighter';

    var i = fireworks.length;
    while (i--) {
        // 烟花渲染和更新
        fireworks[i].render();
        fireworks[i].update();
    }

    var j = particle.length;
    while(j --){
        // 粒子的渲染和更新
        particle[j].render();
        particle[j].update();
    }

    window.requestAnimationFrame(loop);
}

loop()

// 鼠标点击事件和移动事件
c.onmousedown = function (e) {
    var event = window.event || e;
    fireworks.push(new Firework(event.clientX, event.clientY));
    // 阻止默认事件
    event.preventDefault();

    // 鼠标移动
    c.onmousemove = function (e) {
        n++;
        // 函数节流
        if (n % 6 == 0) {
            var event = window.event || e;
            fireworks.push(new Firework(event.clientX, event.clientY));
            // 阻止默认事件

            event.preventDefault();
        }

    }

    // 鼠标抬起
    c.onmouseup = function () {
        // 归位
        n = 0;
        // 注销事件
        c.onmousemove = null;
        c.onmouseup = null;
    }

}

