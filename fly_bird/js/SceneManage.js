(function(){
	
	var SceneManage = window.SceneManage = function(){
		//场景编号0--开始页面，1--游戏页面，2--结束页面
		this.sceneNumber = 0;
		//构建场景
		this.bg = new Background();
		this.land = new Land();
		this.bird = new Bird();
		//Logo y轴偏移量
		this.logoY = -50;
		//play 按钮y轴偏移量
		this.playY = game.can.height;
		//play 按钮的x轴偏移量
		this.playX = (game.can.width - 116)/2;
		//OK 按钮的x轴和y轴
		this.T = game.can.height * 0.618;
		this.L = game.can.width/2 - 100;
		//绑定点击
		this.bindEvent();
	} 
	
	//场景渲染
	SceneManage.prototype.render = function(){
		//不管哪个场景，以下3个都存在
		this.bg.render();
		this.land.render();
		
		switch(this.sceneNumber){
			case 0: //start
				this.bird.x = game.can.width/2;
				this.bird.y = 200;
				//进入游戏提示，图片固定宽度196
				game.ctx.drawImage(game.R['ready'],(game.can.width - 196)/2,this.logoY)
				//play按钮
				game.ctx.drawImage(game.R['button_play'],this.playX,this.playY)
				break;
			case 1: //runing
				//每隔一段距离渲染一个新管子
				game.num % 100 == 0 && new Pipe()
				break;
			case 2: //gameOver
				//保存管子
				var len = game.pipeArr.length;
				for(var i = 0; i < len; i++){
					game.pipeArr[i] && game.pipeArr[i].render();
				}
				//渲染结束图标
				game.ctx.drawImage(game.R['text_game_over'],(game.can.width - 204)/2,game.can.height * (1-0.618));
				//渲染下方按钮，（菜单以及OK） 图片固定宽为80，高为28
				game.ctx.drawImage(game.R['button_ok'],this.L + 120,this.T);
				game.ctx.drawImage(game.R['button_menu'],this.L,this.T);
				
				break;
		}
		
		//鸟的层级最高
		this.bird.render();	
		
	}
	//场景内容更新
	SceneManage.prototype.update = function(){
		switch(this.sceneNumber){
			case 0: //start
				this.logoY += 10;
				this.playY -= 20;
				if(this.logoY > 120){
					this.logoY = 120;
				}
				if(this.playY < game.can.height/2){
					this.playY = game.can.height/2
				}
				break;
			case 1: //runing
				this.bg.update();
				this.land.update();
				var len = game.pipeArr.length;
				for(var i = 0; i < len; i++){
					game.pipeArr[i] && game.pipeArr[i].render();
					game.pipeArr[i] && game.pipeArr[i].update();
					if(game.pipeArr[i] && game.pipeArr[i].x < -300){
						game.pipeArr[i].godie()
					}
				}
				this.bird.update();
				var scoreLen = game.score.toString().length;
				for(var i = 0; i < scoreLen; i++){
					//渲染分数
					game.ctx.drawImage(game.R['score' + game.score.toString().charAt(i)],game.can.width/2 - scoreLen*24/2 + 24 * i,20);
				}
				
				break;
			case 2: //gameOver
				
				break;
		}
	}
	//场景进入
	SceneManage.prototype.enter = function(num){
		
		//切换场景
		this.sceneNumber = num; 
		//每一次进入场景需要重置
		switch(num){
			case 0:
				//Logo y轴偏移量
				this.logoY = -50;
				//play 按钮y轴偏移量
				this.playY = game.can.height;
				//鸟的速率归0
				this.bird.f = 0;
				//鸟的旋转角度归0
				this.bird.angle = 0;
				//鸟的煽动翅膀频率恢复
				this.bird.birdSpeed = 10;
				//上方帧编号归0
				game.num = 0;
				//分数归0
				game.score = 0;
				break;
			case 1:
				//进入场景1需要经管子数组置为空
				game.pipeArr = []
				break;
			case 2:
				/* this.bird.x = game.can.width/2;
				this.bird.y = 200;
				this.bird.angle = 0; */
				break;
		}
	}
	//绑定点击事件
	SceneManage.prototype.bindEvent = function(){
		var self = this
		game.can.onclick = function(e){
			var x = e.clientX;
			var y = e.clientY;
			switch(self.sceneNumber){
				case 0:
					//116和70是图片的宽高,点击了开始按钮
					if(x > self.playX && x < self.playX + 116 && y > self.playY && y < self.playY + 70){
						//进入游戏场景
						self.enter(1);
					}
					break;
				case 1:
					//注入能量
					self.bird.isActive = true;
					//小鸟抬头
					self.bird.angle = -0.4;
					//将计数器归0
					self.bird.f = 0;
					//煽动翅膀频率加快
					self.bird.birdSpeed = 1;
					break;
				case 2:
					//点击MENU
					if(x > self.L && x < self.L + 80 && y > self.T && y < self.T + 28){
						alert('本功能暂未完善')
					}
					//点击OK
					if(x > self.L + 120 && x < self.L + 200 && y > self.T && y < self.T + 28){
						//结束页面回到场景0
						self.enter(0);
					}
					break;
			}
		}
	}
	
})()