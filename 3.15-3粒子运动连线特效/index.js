; (function () {

    var c = document.getElementById('c'),
        w = c.width = window.innerWidth,
        h = c.height = window.innerHeight,
        ctx = c.getContext('2d');

    // 粒子的总数
    var num = 80;
    var arr = [];

    function Particle() {
        // 半径
        this.r = 2;
        // 初始x轴坐标,下面是求出一个区间，避免球体溢出屏幕可视区部分
        this.x = (w - this.r * 4) * Math.random() + this.r * 2;
        // 初始y轴坐标
        this.y = (h - this.r * 4) * Math.random() + this.r * 2;
        // 颜色
        // this.color = 'hsla('+parseInt(Math.random() * 361)+','+parseInt(Math.random() * 101)+'%,80%,0.8)';
        this.color = 'rgba(255,' + parseInt(Math.random() * 256) + ',' + parseInt(Math.random() * 256) + ',0.8)'
        // vX 横向速度
        this.vX = (Math.random() - 0.5) * 5;
        // vY 纵向速度
        this.vY = (Math.random() - 0.5) * 5;
    }

    Particle.prototype = {
        // 渲染
        render: function () {

            ctx.beginPath();
            ctx.fillStyle = this.color;
            // ctx.shadowBlur = 5;
            ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
            ctx.fill();

            // 检测是否能连线

        },
        // 更新
        update: function () {
            this.x += this.vX;
            this.y += this.vY;

            // 碰撞检测
            if (this.x <= this.r || this.x + this.r >= w) { // 左右边界到了
                this.vX *= -1;
            }

            if (this.y <= this.r || this.y + this.r >= h) { // 上下边界到了
                this.vY *= -1;
            }

        },
        // 连线
        join: function (target) {
            // console.log(1)
            ctx.beginPath();
            ctx.strokeStyle = this.color;
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(target.x, target.y);
            ctx.stroke();

        }
    }

    // 将元素先装进去
    for (var i = 0; i < num; i++) {
        arr.push(new Particle());
        arr[i].render();
    }

    // 记录鼠标坐标
    arr.push({});

    function loop() {
        // 清除整个画布
        // ctx.clearRect(0,0,w,h);
        ctx.fillStyle = 'rgba(0,0,0,0.25)';
        ctx.fillRect(0, 0, w, h);
        // 每隔16毫秒执行一次
        window.requestAnimationFrame(loop);
        // 开启循环
        arr.forEach(function (item) {
            // 因为鼠标交互的问题，需要判断其属性一定存在
            item.render && item.render();
            item.render && item.update();
            // 检测连接
            for (var i = 0; i < num + 1; i++) {
                // console.log(item.y - arr[i].y)
                // a的平方 + b的平方 = c的平方
                if (Math.pow(Math.abs(item.y - arr[i].y), 2) + Math.pow(Math.abs(item.x - arr[i].x), 2) <= Math.pow(150, 2)) {
                    item.join && item.join(arr[i]);
                }
            }
        });
    }

    loop();

    // 鼠标交互事件
    document.onmousemove = function(e){
        var event = window.evnet || e;
        arr[num].x = event.clientX;
        arr[num].y = event.clientY;
    }

    // 鼠标离开屏幕清除坐标点
    document.onmouseleave = function(){
        arr[num].x = null;
        arr[num].y = null;
    }

    window.addEventListener('resize', function () {

        w = c.width = window.innerWidth;
        h = c.height = window.innerHeight;

    })


}())