var c = document.getElementById('c'),
    w = c.width = window.innerWidth,
    h = c.height = window.innerHeight,
    ctx = c.getContext('2d');

// 文字大小
var size = 10;
// 有多少列
var columns = w / size;
// 存放所有字体的y轴坐标
var drops = [];
// 文字中心
var chinese = '开发者，欢迎回家';

for(var i = 0; i < columns; i++){
    drops[i] = 0;
}

function draw(){

    // 清除画布
    ctx.fillStyle = 'rgba(0,0,0,.06)';
    ctx.fillRect(0,0,w,h);

    ctx.fillStyle = 'rgba('+parseInt(Math.random() * 256)+',255,255,1)';
    ctx.font = size + 'px Arial';
    drops.forEach(function(item,index){
        // 选取文字
        var text = chinese[Math.floor(Math.random() * chinese.length)];
        
        // 绘制文字
        ctx.fillText(
            text,
            index * size,
            drops[index] * size
        )

        drops[index] ++;

        // 随机归位
        if(drops[index] * size > h && Math.random() > 0.975)
            drops[index] = 0;

        

    },{name:'LJJ'})

    window.requestAnimationFrame(draw);

}

draw();