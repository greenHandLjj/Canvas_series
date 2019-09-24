

var c = document.getElementById('c'),
    w = c.width = window.innerWidth,
    h = c.height = window.innerHeight,
    ctx = c.getContext('2d');

// 灯泡雏形
var data = '&000000000000000000011110000000000000000000' +
    '&000000000000000011111111110000000000000000' +
    '&000000000000001111111111111100000000000000' +
    '&000000000000011111111111111110000000000000' +
    '&000000000000111111111111111111000000000000' +
    '&000000000001111111111111111111100000000000' +
    '&000000000011111111111111111111110000000000' +
    '&000000000011111111111111111111110000000000' +
    '&000000000111111111111111111111111000000000' +
    '&000000000111111111111111111111111000000000' +
    '&000000001111111111111111111111111100000000' +
    '&000000001111111111111111111111111100000000' +
    '&000000001111111111111111111111111100000000' +
    '&000000001111111111111111111111111100000000' +
    '&000000001111111111111111111111111100000000' +
    '&000000000111111111111111111111111000000000' +
    '&000000000111111111111111111111111000000000' +
    '&000000000111111111111111111111111000000000' +
    '&000000000011111111111111111111110000000000' +
    '&000000000011111111111111111111110000000000' +
    '&000000000001111111111111111111100000000000' +
    '&000000000001111111111111111111100000000000' +
    '&000000000000111111111111111111000000000000' +
    '&000000000000111111111111111110000000000000' +
    '&000000000000011111111111111110000000000000' +
    '&000000000000001111111111111100000000000000' +
    '&000000000000001111111111111100000000000000' +
    '&000000000000001111111111111000000000000000' +
    '&000000000000000111111111111000000000000000' +
    '&000000000000000111111111111000000000000000' +
    '&000000000000000111111111111000000000000000' +
    '&000000000000000111111111111000000000000000' +
    '&000000000000000011111111110000000000000000' +
    '&000000000000000010000000010000000000000000' +
    '&000000000000000011111111110000000000000000' +
    '&000000000000000010000000010000000000000000' +
    '&000000000000000011111111110000000000000000' +
    '&000000000000000010000000010000000000000000' +
    '&000000000000000011111111110000000000000000' +
    '&000000000000000000100001000000000000000000' +
    '&000000000000000000110011000000000000000000' +
    '&000000000000000000011110000000000000000000';

// 记录鼠标坐标点
var coordinate = {
    x: 0,
    y: 0
};

// 工具类函数
function random(min, max) {
    return ~~(Math.random() * (max - min) + min);
}

// 求出两点之间的距离
function distance(origin, target) {
    var a = Math.abs(origin.x - target.x);
    var b = Math.abs(origin.y - target.y);
    return Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
}

// 灯泡的构造函数
function LightBulb() {
    this.data = [];
    // 正方形的边长
    this.size = 12;
}

LightBulb.prototype = {
    // 初始化表格数据
    init: function () {
        var len = data.length;
        var y = h / 2;
        var x = w / 2;
        var s = 150;
        var col = 0;
        var row = 0; // 42;

        for (var i = 0; i < len; i++) {
            // x ++;
            // 列数
            col++;
            if (data[i] == '1') { // 小正方形
                var x1;
                var y1;
                // 计算x轴坐标
                if (col == 22) {
                    x1 = x;
                } else if (col < 22) {
                    x1 = x - (22 - col) * this.size;
                } else if (col > 22) {
                    x1 = x + (col - 22) * this.size;
                }

                // 计算y轴坐标
                if (row == 21) {
                    y1 = y;
                } else if (row < 21) {
                    y1 = y - (21 - row) * this.size;
                } else if (row > 21) {
                    y1 = y + (row - 21) * this.size;
                }


                // '&000000000000000000011110000000000000000000'
                this.data.push({
                    x: x1,
                    y: y1,
                    // 克隆原x位置
                    cloneX: x1,
                    // 克隆原y位置
                    cloneY: y1,
                    // x轴加速度
                    iSpeedX: 0,
                    // y轴加速度
                    iSpeedY: 0,
                    s : s,
                    a : 0,
                    color: 'hsl(' + s + ',50%,50%,0.9)',
                    // 拷贝一份颜色
                    // cloneColor: 'hsl(' + s + ',50%,50%,.9)',
                    rectSize: random(6, 12)
                })

            }
            // 每层的坐标
            if (i % 43 == 0) {
                // y ++;
                // 列数归0
                col = 0;
                row++;
                // x = w/2;
                s += 2;
            }
        }
    },
    render: function () {

        // var self = this;
        // 绘制图形
        this.data.forEach(function (item) {

            ctx.beginPath();
            ctx.fillStyle = item.color;
            ctx.fillRect(item.x, item.y, item.rectSize, item.rectSize);
            ctx.fill();
        })


    },
    update: function () {

        this.data.forEach(function (item) {

            var c = distance(coordinate, {
                x: item.x,
                y: item.y
            })

            // 靠近一定范围则改变，
            if (c < 80) {
                // item.color = 'hsl(200,80%,10%,1)';
                item.iSpeedX = (coordinate.x - item.x) / 7;
                item.iSpeedY = (coordinate.y - item.y) / 7;
            }

            item.x += item.iSpeedX;
            item.y += item.iSpeedY;

            // 抵达边界
            if (item.x >= w + 20 || item.x <= -20 || item.y >= h + 20 || item.y <= -20) {
                item.color = 'hsl(' + item.s + ',50%,50%,0)';
                item.x = item.cloneX;
                item.y = item.cloneY;
                item.iSpeedX = 0;
                item.iSpeedY = 0;
                item.a = 0;
            }

            // 透明度动画

            if(item.a < 0.9){
                item.a += 0.02;
                item.color = 'hsl(' + item.s + ',50%,50%,'+ item.a +')';
            }

        });

    }
}

// 构建新对象
var lightBulb = new LightBulb();
// 初始化
lightBulb.init();


function loop() {

    ctx.globalCompositeOperation = 'destination-out';

    ctx.fillStyle = 'rgba(0,0,0,0.8)';
    ctx.fillRect(0, 0, w, h);

    ctx.globalCompositeOperation = 'lighter';

    lightBulb.render();
    lightBulb.update();

    window.requestAnimationFrame(loop);
}

loop();

c.onmousemove = function (e) {
    var event = window.event || e;
    coordinate.x = e.clientX;
    coordinate.y = e.clientY;
}