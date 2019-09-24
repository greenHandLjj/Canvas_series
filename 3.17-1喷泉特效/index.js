
var c = document.getElementById('c'),
    w = c.width = window.innerWidth,
    h = c.height = window.innerHeight,
    ctx = c.getContext('2d');

// 
var fountains = [];
var letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var size = 20;
var num = 1;

function Fountain(){
    this.x =  w / 2;
    this.y = h - size;
    this.iSpeedX = (Math.random() * 20) - 10;
    this.iSPeedY = (Math.random() * 20) - 10;
    this.color = [155, 100, 50, .7];
    this.word = letters[Math.floor(Math.random() * letters.length)];
}

Fountain.prototype = {
    render : function(){

        ctx.beginPath();   
        // 文字颜色处理
        var h = this.color[0],
                s = this.color[1] + '%',
                l = this.color[2] + '%',
                a = this.color[3];

        ctx.fillStyle = `hsla(${h},${s},${l},${a})`;
        ctx.font = size + 'px Arial';
        ctx.fillText(this.word,this.x,this.y);

    },
    update : function(){
        this.x += this.iSpeedX;
        this.y += this.iSPeedY;
        this.y *= 0.98;
        this.x *= num;
        // console.log(this.y)
        
        this.color[2] *= 0.99;
        this.color[0] += 1;
        if(this.color[0] > 253){
            this.color[2] = 0;
            // 清除
            this.delete();
        }

    },
    delete : function(){
        var self = this;
        fountains.find(function(item,index){
            if(self == item){
                fountains.splice(index,1);
                return true;
            }
        },{name:'LJJ'})   
    }
}   

function loop(){

    // 保存信息
    fountains.push(new Fountain());

    ctx.fillStyle = 'rgba(0,0,0,0.1)';
    ctx.fillRect(0,0,w,h);
   
    fountains.forEach(function(item){
        item.render();
        item.update();
    });

    window.requestAnimationFrame(loop);

}

loop();


document.onmousemove = function(e){
    var event = window.event || e;
    var x = event.clientX;
    // 摇摆幅度
    num = x / (w * 10) + 0.95;

}

document.onmouseleave = function(){
    // 摇摆值归位
    num = 1;
}


/*

    鼠标移动思路

        num 值取值范围为 0.9 - 1.1
        
        如何让他与鼠标位置挂钩？

        左右两边为0.1的取值范围

        屏幕最左侧为 -0.1，屏幕最右侧为 +0.1

        移动到最左侧为0.9 0.9001 ... 1,
        移动到最右侧为1.1 1.0999 ... 1

        保障最小值是0.9


        ?小数区间是 0 - 0.2

        
        屏幕宽度1000 
        在x 轴 1000，
        1000 ？ ？ = 0.2
        0 ？ ？ = 0

        得出结果
        1000 / 5000 = 0.2
        0 / 5000 = 0;

        5000 是原屏幕5倍

        假设屏幕
        300，
        扩大5倍
        300 * 5
        300 / 300 *5


        ？ + 0.9


        0.95 - 1.05

        区间0.1

        1000 / ? = 0.1

*/
