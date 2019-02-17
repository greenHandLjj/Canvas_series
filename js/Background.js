(function(){
	
	var Background = window.Background = function(){
		this.image = game.R.bg_day;
		//偏移的x,y值
		this.y = 0.75 * game.can.height - 396;
		this.x = 0;
		//固定png宽高
		this.w = 288;
		this.h = 512;
		//移动速度
		this.speed = 1;
	}	
	//渲染
	Background.prototype.render = function(){
		
		//绘制背景图，背景图需要重复才能进行动画操作
		game.ctx.drawImage(this.image,this.x,this.y);
		game.ctx.drawImage(this.image,this.x + this.w,this.y)
		game.ctx.drawImage(this.image,this.x + this.w * 2,this.y)
		//补全天空
		game.ctx.beginPath();
		game.ctx.fillStyle = '#4ec0ca';
		game.ctx.fillRect(0,0,game.can.width,this.y + 10);
	}
	
	//更新
	Background.prototype.update = function(){
		this.x -= this.speed;
		if(this.x < -this.w){
			this.x = 0;
		}
	}
	
	
})()