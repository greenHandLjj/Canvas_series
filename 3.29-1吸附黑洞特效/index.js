/* 
	实现思路
		
 */

// 工具类函数
let random = (min,max) => ~~(Math.random() * (max - min) + min);


let c = document.getElementById('c'),
	ctx = c.getContext('2d'),
	w = c.width = window.innerWidth,
	h = c.height = window.innerHeight;
	
// 存放所有粒子数据
let particleArr = [];
// 存放所有旋转方块数据
let rectArr = []; 
// 所有粒子的数量
let particleN = 100;
// 所有方块的数量
let rectN = 10;


class Rect{
	constructor(){
		// 色值
		this.h = random(100,200);
		// 旋转度数
		this.range = 0;
		// 方块的大小
		this.w = random(0,w > h ? w/2 : h/2);
		// 旋转速度
		this.iSpeed = random(5,10); 
		// 透明度
		this.opacity = 1;
	}
	render(){
		// 保存当前画布状态并放置栈的最顶层
		ctx.save();
		ctx.beginPath();
		ctx.translate(w/2,h/2);
		ctx.rotate(this.range * Math.PI / 180);
		ctx.strokeStyle = 'hsla('+ this.h +',50%,50%,'+ this.opacity +')';
		ctx.strokeRect(-this.w/2,-this.w/2,this.w,this.w);
		ctx.stroke();
		// 还原画布状态
		ctx.restore();
	}
	update(){
		// this.range += 30;
		this.range < 360 ? this.range += this.iSpeed : this.range = 0;
		// 宽度变化
		if(this.w > 0){
			this.w -= this.iSpeed;
		}else{
			// 重新复活
			this.w = random(0,w > h ? w/2 : h/2);
			// 淡化
			this.opacity = 0
		}
		
		this.opacity < 1 ? this.opacity += 0.02 : this.opacity = 1;
		
	}
}

class Particle{
	constructor(){
		// 圆的坐标
		this.x = random(0,w) * ((Math.random() - 0.5) * 10);
		this.y = random(0,h) * ((Math.random() - 0.5) * 10);
		// 目标点
		this.targetX = w/2;
		this.targetY = h/2;
		// 色值
		this.h = random(100,200);
		// 透明度
		this.opacity = 1;
		// 半径
		this.r = random(1,3);
		// 速度
		this.iSpeedX = (this.targetX - this.x) / 20;
		this.iSpeedY = (this.targetY - this.y) / 20;

	}
	render(){
		ctx.beginPath();
		ctx.fillStyle = 'hsla('+ this.h +',50%,50%,'+ this.opacity +')';
		ctx.arc(this.x,this.y,this.r,0,Math.PI * 2);
		ctx.fill();
	}
	update(){
		// 赋值
		this.x += this.iSpeedX;
		this.y += this.iSpeedY;
		
		// 重新计算速度
		this.iSpeedX = (this.targetX - this.x) / 20;
		this.iSpeedY = (this.targetY - this.y) / 20;
		
		// 保存公有值，避免重复计算
		let x = Math.abs(this.x - this.targetX);
		let y = Math.abs(this.y - this.targetY);
	
		// 判断抵达中心点
		if(x <= 1 && y <= 1){
			// 圆的坐标
			this.x = random(0,w) * ((Math.random() - 0.5) * 10);
			this.y = random(0,h) * ((Math.random() - 0.5) * 10);
		}
	
	}
}

// 初始化函数
let init = () => {
	// 生成方块
	for(let i = 0; i < rectN; i++){
		rectArr.push(new Rect());
	}
	// 生成粒子
	for(let i = 0; i < particleN; i++){
		particleArr.push(new Particle());
	}
}

init()

let loop = () => {
	// 隐藏原内容和新内容重叠的部分。
    ctx.globalCompositeOperation = 'destination-out';

    ctx.fillStyle = 'rgba(0,0,0,.25)';
    ctx.fillRect(0, 0, w, h);

    // 恢复 
    ctx.globalCompositeOperation = 'lighter';
	// 方块渲染
	rectArr.forEach(item => {
		item.render();
		item.update();
	});
	// 粒子渲染
	particleArr.forEach(item => {
		item.render();
		item.update();
	});

	window.requestAnimationFrame(loop);
}

loop()