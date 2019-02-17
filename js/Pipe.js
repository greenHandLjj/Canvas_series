(function(){
	
	//game.can.height * 0.75 管子范围，
	var Pipe = window.Pipe = function(){
		//上开口管子以及下开口管子
		this.pipe_up = game.R.pipe_up;
		this.pipe_down = game.R.pipe_down;
		//空隙
		this.interspace = 120;
		//总高度
		this.allHeight = game.can.height * 0.75;
		//管子固定高度
		this.pipe_height = 320;
		//下开口管子高度,限制最低高度以及最大高度
		this.down_height = 100 + parseInt(this.allHeight / 2 * Math.random() - 40);
		//上开口管子高度
		this.up_height = this.allHeight - this.down_height - this.interspace;
		//x轴偏移量
		this.x = game.can.width;
		//是否通过
		this.pass = false;
		//推入数组
		game.pipeArr.push(this);
	}
	
	//渲染
	Pipe.prototype.render = function(){
		game.ctx.drawImage(this.pipe_down,0,this.pipe_height - this.down_height,52,this.down_height,this.x,0,52,this.down_height);
		game.ctx.drawImage(this.pipe_up,0,0,52,this.up_height,this.x,this.down_height + this.interspace,52,this.up_height);
	}
	//更新
	Pipe.prototype.update = function(){
		this.x -= 2;
		//检测碰撞
		if(this.x < game.birdPosition.R && this.x + 52 > game.birdPosition.L){
			
			if(this.down_height > game.birdPosition.T || this.down_height + this.interspace < game.birdPosition.B){
				game.gameOver();
			}
		}
		//检测通过,并且加分
		if(this.x + 52 < game.birdPosition.L && !this.pass){
			game.score ++;
			this.pass = true;
		}
	}
	//删除
	Pipe.prototype.godie = function(){
		var len = game.pipeArr.length;
		for(var i = 0; i < len; i++){
			if(game.pipeArr[i] == this){
				game.pipeArr.splice(i,1)
			}
		}
	}
	
	
})()