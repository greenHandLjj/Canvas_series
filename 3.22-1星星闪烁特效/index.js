/** 
 *  实现思路：
 *      星星的绘制：一共需要确定8个点的坐标
 *                 top1,top2,top3,left,right,bottom1,bottom2,bottom3
 *                  每条边的长度是一样的
 * 
 * 
*/

var dom = document.getElementById('demo');
var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d'),
    w = canvas.width = dom.offsetWidth,
    h = canvas.height = dom.offsetHeight;

// 把canvas插入dom中
dom.appendChild(canvas);

// 星星数量
var num = 200;
// 存放星星的数组
var starsArr = [];

// 根据num渲染星星数量
for(var i = 0; i < num; i++){
    starsArr.push(new Canvas());
}

// 工具类函数
function random(min, max) {
    return (Math.random() * (max - min) + min);
}

// 星星的构造函数
function Canvas() {
    // 中心点的坐标
    this.x = random(0,w);
    this.y = random(0,h);
    // 大小
    this.size = random(2,10);
    // 色值
    this.colorH = random(100,200);
    // 透明度
    this.colorO = random(0.5,1);
    // x，y轴的速度
    this.iSpeedX = (Math.random() - 0.5) * 0.5;
    this.iSpeedY = (Math.random() - 0.5);
}

Canvas.prototype.render = function () {

    ctx.beginPath();
    ctx.fillStyle = 'hsla(' + this.colorH + ',100%,50%,'+  this.colorO +')';
    // 顶点
    ctx.moveTo(this.x,this.y - this.size);
    // 左上坐标
    ctx.lineTo(this.x - this.size/4,this.y - this.size/4);
    // 最左坐标
    ctx.lineTo(this.x - this.size,this.y);
    // 左下坐标
    ctx.lineTo(this.x - this.size/4,this.y + this.size/4);
    // 底部坐标
    ctx.lineTo(this.x,this.y + this.size);
    // 右下坐标
    ctx.lineTo(this.x + this.size/4,this.y + this.size/4);
    // 最右坐标
    ctx.lineTo(this.x + this.size,this.y);
    // 右上坐标
    ctx.lineTo(this.x + this.size/4,this.y - this.size/4);
    // 关闭路径
    ctx.closePath();
    // 绘制
    ctx.fill();

};

Canvas.prototype.update = function () {
    // 位置移动
    this.x += this.iSpeedX;
    this.y += this.iSpeedY;

    if(this.x < 0 - this.size*2 || this.x > w + this.size * 2){
        this.x = w - this.x;
    }

    if(this.y < 0 - this.size*2 || this.y > h + this.size * 2){
        this.y = h - this.y;
    }

    // 大小随机变换
    this.size = random(1,6);
    // 透明度处理
    this.colorO <= 0 ? this.colorO = 1 : this.colorO -= 0.02;

    // 颜色处理
    this.colorH < 200 ? this.colorH++ : this.colorH = random(100,200);
};


function loop() {
    // 隐藏原内容和新内容重叠部分
    this.ctx.globalCompositeOperation = 'destination-out';

    this.ctx.fillStyle = 'rgba(0,0,0,0.5)';
    this.ctx.fillRect(0, 0, this.w, this.h);

    // 恢复
    this.ctx.globalCompositeOperation = 'lighter';

    for (var i = 0; i < num; i++) {
        starsArr[i].render();
        starsArr[i].update();
    }

    // this指向问题处理
    window.requestAnimationFrame(loop)
};

loop()