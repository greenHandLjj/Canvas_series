(function(){
	
	var Land = window.Land = function(){
		this.image = game.R.Land;
		//y,x偏移
		this.y = game.can.height * 0.75;
		this.x = 0;
		//固定png宽高
		this.w = 336;
		this.h = 112;
		//移动速度
		this.speed = 2;
	}
	//渲染
	Land.prototype.render = function(){
		game.ctx.drawImage(this.image,this.x,this.y);
		game.ctx.drawImage(this.image,this.x + this.w,this.y);
		game.ctx.drawImage(this.image,this.x + this.w * 2,this.y);
		
		//补充缺失大地块
		game.ctx.fillStyle = '#ded895';
		game.ctx.fillRect(0,this.y + this.h - 10,game.can.width,game.can.height - this.y)
	}
	//更新
	Land.prototype.update = function(){
		this.x -= this.speed;
		if(this.x < -this.w){
			this.x = 0;
		}
	}
	
})()