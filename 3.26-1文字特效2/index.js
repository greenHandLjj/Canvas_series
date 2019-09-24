var canvas = document.getElementById('canvas'),
  ctx = canvas.getContext('2d'),
  w = canvas.width = window.innerWidth,
  h = canvas.height = window.innerHeight;
// 存放所有粒子的数据
var particles = [];

// 绘制的文字
var text = '';

// 动画运行时间
var fno = 0;
var a = 1;

// 工具类函数
let random = (min, max) => {
  return ~~(Math.random() * (max - min) + min);
};

let distance = (origin, target) => {
  let a = Math.abs(origin.x - target.x);
  let b = Math.abs(origin.y - target.y);

  return Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
}

class Particle {
  constructor(x, y) {
    // 当前原点
    this.originX = random(0, w);
    this.originY = random(0, h);
    // 目标点
    this.targetX = x + (Math.random() - 0.5) * 10;
    this.targetY = y + (Math.random() - 0.5) * 10;
    // 圆的半径
    this.r = random(1, 3);
    // 颜色值
    this.h = random(100, 200);
    // 透明度
    this.a = 1;
    // x,y轴的速度
    this.iSpeedX = (this.targetX - this.originX) / 30;
    this.iSpeedY = (this.targetY - this.originY) / 30;
  }
  init() {
    // console.log(particles)

    ctx.clearRect(0, 0, w, h);

    ctx.fillStyle = '#fff';
    ctx.font = '5vw "微软雅黑"';
    ctx.textAlign = 'center';
    ctx.fillText(text, w / 2, h / 2);

    let data = ctx.getImageData(0, 0, w, h).data;
    // console.log(data)
    for (let i = 0; i < w; i++) {
      for (let j = 0; j < h; j++) {
        var x = (j * w + i) * 4;
        if (data[x + 3] > 250) {
          particles.push(new Particle(i, j));
        }
      }
    }
    // 清除画布

    ctx.clearRect(0, 0, w, h);

  }
  render() {

    ctx.beginPath();
    ctx.fillStyle = 'hsla(' + this.h + ',50%,50%,' + this.a + ')';
    ctx.arc(this.originX, this.originY, this.r, 0, Math.PI * 2);
    ctx.fill();

  }
  update() {
    this.originX += this.iSpeedX;
    this.originY += this.iSpeedY;

    if (this.originX >= w + this.r || this.originX < 0 - this.r || this.originY >= h + this.r || this.originY < 0 - this.r) {
      // this.iSpeedX *= 0.5;
      this.iSpeedX = 0;
      this.originX = this.targetX;
      this.iSpeedY = 0;
      this.originY = this.targetY;
      this.a = 0;
      this.h = random(100, 200);
    }

    if (this.a < 1) {
      this.a += 0.01;
    }

    if (this.h < 200) {
      this.h++
    }

  }
}

// 初始化数据
// new Particle().init();

let loop = function () {

  fno++;

  // 隐藏原内容和新内容重叠的部分。
  ctx.globalCompositeOperation = 'destination-out';

  ctx.fillStyle = 'rgba(0,0,0,.45)';
  ctx.fillRect(0, 0, w, h);

  // 恢复 
  ctx.globalCompositeOperation = 'lighter';

  particles.forEach(function (item) {
    item.render();
    item.update();
  });

  if(fno > 100){
      a -= 0.04;
  }

  if (a >= 0) {
    // 提示文字
    ctx.fillStyle = 'hsla(360,100%,100%,' + a + ')';
    ctx.font = '2.5vw "微软雅黑"';
    ctx.textAlign = 'center';
    ctx.fillText('请等待动画结束,稍后输入文字按下回车', w / 2, h * 0.8);
  }


  window.requestAnimationFrame(loop);
}

loop();

var input = document.getElementById('input');
input.onkeydown = function(e){
  
  if(e.keyCode == 13){ // 回车

    particles = [];

    text = this.value;

    new Particle().init();

    this.value = '';
  }
}

var fontArr = ['3','2','1','I LOVE YOU','JavaScript'];
var n = 0;
var timer = setInterval(() => {

  particles = [];

  text = fontArr[n];

  new Particle().init();

  n ++;
  if(n == fontArr.length){
    clearInterval(timer);
    input.style.opacity = 1;
  }
},4000);