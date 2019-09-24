
var c = document.getElementById('c'),
    w = c.width = window.innerWidth,
    h = c.height = window.innerHeight,
    ctx = c.getContext('2d');

// 存放所有小球的实例
var balls = [];

function Ball(x,y){
    // x点坐标
    this.x = x;
    // y点坐标
    this.y = y;
    // 随机半径
    this.r = parseInt(30 * Math.random());
    // 透明度
    this.opacity = 1;
    // 颜色
    this.color = 'rgba('+ parseInt(Math.random() * 256) +','+ parseInt(Math.random() * 256) +','+ parseInt(Math.random() * 256) +','+ this.opacity +')';
    // 小球x轴方向
    this.vX = (Math.random() - 0.5) * 5;
    // 小球y轴方向
    this.vY = (Math.random() - 0.5) * 5;
}

// 渲染小球
Ball.prototype.render = function(){
    // 开始路径绘制
    ctx.beginPath();
    ctx.globalCompositeOperation = 'screen';
    ctx.shadowColor  = this.color;
    ctx.shadowBlur = 10; 
    ctx.fillStyle = this.color;
    ctx.arc(this.x,this.y,this.r,0,Math.PI * 2);
    // 填充上
    ctx.fill();
}

// 更新小球坐标
Ball.prototype.update = function(){
    // 改变小球x，y轴坐标
    this.x += this.vX;
    this.y += this.vY;
    // 改变半径
    this.r -= 0.5;
    // 改变透明度
    this.opacity -= 0.02;

    if(this.r <= 0){ // 球体半径小于一定程度则清除该圆
        // 清除
        this.r = 0;
        if(this.opacity <= 0){ // 透明度小于一定程度再消失
            this.delete();
        }
    }

}

// 清除小球
Ball.prototype.delete = function(){
    // 备份this
    var self = this;
    // 找到需要清除的那个圆
    balls.find(function(item,index){
        if(item == self){
            balls.splice(index,1);
            return true;
        }
    })
}

function loop(){
    // 清除整个画布
    ctx.clearRect(0,0,w,h);
    // 渲染球体
    balls.forEach(function(item){
        // 渲染
        item.render();
        // 改变坐标等信息
        item.update();
    })
    // 每隔16毫秒进行绘制
    window.requestAnimationFrame(loop);
}

loop();

document.onmousemove = function(e){
    var event = window.event || e;
    var x = event.clientX;
    var y = event.clientY;
    // 推入数组，以便循环
    balls.push(new Ball(x,y));
}



window.addEventListener('resize',function(){

    w = c.width = window.innerWidth;
    h = c.height = window.innerHeight;

})