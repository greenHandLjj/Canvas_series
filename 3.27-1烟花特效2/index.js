/* 
	实现思路
		随机生成烟花爆炸点
		获取到了烟花初始点坐标
		-> 烟花上升（动能） -> 
 */

var c = document.getElementById('c'),
	ctx = c.getContext('2d'),
	w = c.width = window.innerWidth,
	h = c.height = window.innerHeight;

// 存放烟花的数组
var particleArr = [];
// 存放爆炸的烟花的数组
var particleBom = [];
// 烟花出生点
var beginPoint = {
	x: w / 2,
	y: h + 20
}

// 工具类
let random = (min, max) => {
	return ~~(Math.random() * (max - min) + min);
};

class Particle {
	constructor(x,y) {
		// 其当前坐标
		this.nowX = beginPoint.x;
		this.nowY = beginPoint.y;
		// 需要抵达的目标点
		this.targetX = x;
		this.targetY = y;
		// 烟花颜色
		this.h = random(100,200);
		// 其烟花上升速度
		this.iSpeedX = (this.targetX - this.nowX) / 10;
		this.iSpeedY = (this.targetY - this.nowY) / 10;
		// 主烟花半径
		this.r = 3;
	}

	render() {
		ctx.beginPath();
		ctx.fillStyle = 'hsl('+ this.h +',50%,50%)';
		ctx.arc(this.nowX,this.nowY,this.r,0,Math.PI * 2);
		ctx.fill();
	}

	update() {

		this.nowX += this.iSpeedX;
		this.nowY += this.iSpeedY;
		// 每次移动重新计算速度
		this.iSpeedX = (this.targetX - this.nowX) / 10;
		this.iSpeedY = (this.targetY - this.nowY) / 10;		
		// 抵达目标点，删除当前对象,绘制爆炸
		if(Math.abs(this.nowX - this.targetX) <= 15 && Math.abs(this.nowY - this.targetY) <= 15 ){
			// this.boomInit();
			this.remove();
			// 创建爆炸的烟花
			this.createF();
		}

	}
	
	remove(){
		var self = this;
		particleArr.find((item,index,arr) => {
			if(item == self){
				arr.splice(index,1);
				return true;
			}
		})
	}
	
	createF(){
		var num = random(15,25);
		while(num --){
			particleBom.push(new Fireworks(this.targetX,this.targetY,this.h));
		}
	}
};

class Fireworks {
	
	constructor(x,y,h){
		// 烟花的出生位置
		this.x = x;
		this.y = y;
		// 生成烟花的目标点
		this.targetX = random(x-80,x+80);
		this.targetY = random(y-80,y+80);
		// 烟花的颜色
		this.h = h;
		// 烟花的不透明度
		this.opacity = 1;
		// 烟花的上升动能
		this.energy = 10;
		// 烟花X速度
		this.iSpeedX = (this.targetX - this.x) / 10;
		this.iSpeedY = (this.targetY - this.y) / 10;
		// 半径
		this.r = random(1,3);
		// 是否抵达目标点
		this.arrive = false;
	}
	
	render(){
		ctx.beginPath();
		ctx.fillStyle = 'hsla('+ this.h +',50%,50%,'+ this.opacity +')';
		ctx.arc(this.x,this.y,this.r,0,Math.PI * 2);
		ctx.fill();
	}
	
	update(){

			this.x += this.iSpeedX;
			this.y += this.iSpeedY;
			// 重新计算速度
			this.iSpeedX = (this.targetX - this.x) / 10;
			this.iSpeedY = (this.targetY - this.y) / 10;
			
			this.opacity -= 0.038;
			
			// 抵达目标点，删除当前对象,绘制爆炸
			if(Math.abs(this.x - this.targetX) <= 1 && Math.abs(this.y - this.targetY) <= 1 ){
				var num = random(0,5);
				while(num --){
					particleBom.push(new Fireworks(this.targetX,this.targetY,random(100,200)));
				}
			}
			
			// 删除
			if(this.opacity <= 0){
				this.remove();
			}	
	}
	
	remove(){
		particleBom.find((item,index,arr) => {
			if(item == this){
				arr.splice(index,1);
				return true;
			}
		})
	}
	
};

// 手动生成一个粒子
particleArr.push(new Particle(random(0,w),random(0,h)));

let loop = () => {
	
	// 隐藏原内容和新内容重叠的部分。
    ctx.globalCompositeOperation = 'destination-out';

    ctx.fillStyle = 'rgba(0,0,0,.3)';
    ctx.fillRect(0, 0, w, h);

    // 恢复 
    ctx.globalCompositeOperation = 'lighter';
	
	// 烟花爆炸
	particleBom.forEach(item => {
		item.render();
		item.update();
	})
	
	// 烟花上升
	particleArr.forEach(item => {
		item.render();
		item.update();
	})
	
	window.requestAnimationFrame(loop);
}

loop();

// 定时器生成烟花
setInterval(() => {
	particleArr.push(new Particle(random(0,w),random(0,h)));
},1000);