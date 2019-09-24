/* 
	
		
*/


// 工具类函数
let random = (min, max) => ~~(Math.random() * (max - min) + min);


let c = document.getElementById('c'),
	ctx = c.getContext('2d'),
	w = c.width = window.innerWidth,
	h = c.height = window.innerHeight;

// let tick = 0;	
// 烟花数组
let flowerArr = [];
// 
let particleArr = []

class Line{
	constructor(x = w/2,y = 0){
		// 线条出生点
		this.x = x;
		this.y = y;
		// y轴速度
		this.iSpeedY = 5;
		// 色值
		this.h = random(100,200);
		// 透明度
		this.a = 0.01;
		// 存放烟花粒子
		// this.particleArr = [];
		// 烟花粒子数量
		this.n = 0;
		// 烟花是否结束应该收回绳索
		this.flag = false;
	}
	render(){
		// 绘制烟花粒子
		particleArr.forEach(item => {
			item.render();
			item.update();
		})
		
		// 线条的绘制
		ctx.beginPath();
		ctx.strokeStyle = 'hsla('+ this.h +',50%,50%,1)';
		ctx.shadowColor = '#fff';
		ctx.shadowBlur = 0;
		ctx.moveTo(this.x,0);
		ctx.lineTo(this.x,this.y + this.iSpeedY);
		ctx.closePath();
		ctx.stroke();
		// 椭圆的绘制
		ctx.beginPath();
		ctx.fillStyle = 'hsla('+ this.h +',50%,50%,'+ this.a +')';
		ctx.shadowColor = 'hsla('+ this.h +',50%,50%,'+ this.a +')';
		ctx.shadowBlur = 10;
		ctx.ellipse(this.x,this.y + this.iSpeedY + 5,4,6,0,0,Math.PI*2);
		ctx.fill();
		
	}
	update(){
		// 下落阶段
		if(!this.flag){
			
			this.y += this.iSpeedY;
			// 停止移动,开花
			if(this.y >= h/2 * 0.8){
				this.y = h/2 * 0.8;
				this.start();
			}
			
		}else if(this.flag && particleArr.length == 0){
			// 数组元素为空并且烟花确定收回
			this.end();
			// this.y += this.iSpeedY;
			
		}
		
	}
	start(){
		if(this.a < 1){
			this.a += 0.01;
		}else{
			if(this.n == 300){
				this.flag = true;
				return;
			}
			this.n ++;
			// console.log('1')
			particleArr.push(new Particle(this.x,this.y + this.iSpeedY + 5,this.h));
		}
	}
	end(){
		if(this.a > 0){
			this.a -= 0.01;
		}else{
			this.y -= this.iSpeedY;
			if(this.y <= 0){
				flowerArr[0] = new Line(random(w*0.2,w*0.8));
			}
		}
	}
} 

class Particle{
	constructor(x,y,h){
		// 初始坐标点
		this.x = x;
		this.y = y;
		// 色值
		this.h = h;
		// 透明度
		this.a = 1;
		// xy轴速度
		this.iSpeedX = (Math.random() - 0.5) * 0.8 * 2;
		this.iSpeedY = 1;
	}
	render(){
		ctx.beginPath();
		ctx.fillStyle = 'hsla('+ this.h +',50%,50%,'+ this.a +')';
		ctx.arc(this.x,this.y,random(1,3),0,Math.PI*2);
		ctx.fill();
	}
	update(){
		this.x += this.iSpeedX;
		this.y += this.iSpeedY;
		
		this.iSpeedY += (Math.random() - 0.5);
		
		// 
		if(this.a > 0){
			this.a -= 0.01;
		}else{
			this.remove();
		}
		
	}
	remove(){
		particleArr.find((item,index,arr) => {
			if(this == item){
				arr.splice(index,1);
				return true;
			}
		})
	}
}


let init = () => {
	for(let i = 0; i < 1; i ++){
		setTimeout(() => {
			flowerArr.push(new Line())
		},1000 * i)
	}
}

init();


let loop = () => {

	// 隐藏原内容和新内容重叠的部分。
	ctx.globalCompositeOperation = 'destination-out';

	ctx.fillStyle = 'rgba(0,0,0,.3)';
	ctx.fillRect(0, 0, w, h);

	ctx.globalCompositeOperation = 'lighter';

	flowerArr.forEach(item => {
		item.render();
		item.update();
	})

	window.requestAnimationFrame(loop);
}

loop();
