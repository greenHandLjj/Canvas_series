(function(){
	
	var Bird = window.Bird = function(){
		//随机小鸟color [0,1,2]
		this.color = parseInt(Math.random() * 3);
		//引入的三张小鸟图片，连续的小鸟图片
		this.image0 = game.R['bird' + this.color + '_0'];
		this.image1 = game.R['bird' + this.color + '_1'];
		this.image2 = game.R['bird' + this.color + '_2'];
		//n指代小鸟图片
		this.n = 0;
		//点击canvas区域，小鸟上升
		this.isActive = false;
		//煽动翅膀速度
		this.birdSpeed = 10;
		//小鸟x,y轴
		this.x = 100;
		this.y = 100;
		//小鸟旋转角度
		this.angle = 0;
		//计数器，控制速率
		this.f = 0;
	}
	//渲染
	Bird.prototype.render = function(){
		//由于定时器20毫秒执行一次，导致小鸟翅膀切换过快，进行一个减速操作
		if(game.num % this.birdSpeed == 0){
			this.n ++;
			if(this.n > 2){
				this.n = 0;
			}
		}
		game.ctx.save();
		game.ctx.translate(this.x,this.y);
		game.ctx.rotate(this.angle);
		game.ctx.drawImage(this['image' + this.n],-24,-24);//图片宽高为48
		game.ctx.restore();

		
	}
	//更新小鸟变化
	Bird.prototype.update = function(){
		
		if(this.isActive){
			//抬头20帧
			this.y -= 0.2 * (20 - this.f);
			if(this.f > 20){
				//重新归0，好让小鸟往下落
				this.f = 0;
				//无点击，小鸟下落
				this.isActive = false;
				//煽动翅膀频率恢复
				this.birdSpeed = 10;
			}
		}else{
			this.y += 0.2 * this.f;
		}
		//旋转向下俯冲
		this.angle += 0.03;
		this.f ++;
		
		if(this.y < 24){
			this.y = 24;
		}else if(this.y > game.can.height * 0.75){
			game.gameOver()
		}
		
		//存入小鸟位置信息，用于碰撞检测
		game.birdPosition.T = parseInt(this.y - 12); //12为图片的上间隙
		game.birdPosition.B = parseInt(this.y + 17);
		game.birdPosition.L = parseInt(this.x - 12);
		game.birdPosition.R = parseInt(this.x + 17);
		
	}
	
})()