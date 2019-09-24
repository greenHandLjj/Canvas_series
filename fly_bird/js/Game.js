(function(){
	
	//向全局暴露一个Game函数
	var Game = window.Game = function(obj){
		//获取canvas对象
		this.can = document.querySelector(obj.id);	
		//获取上下文
		this.ctx = this.can.getContext('2d');
		//初始化canvas对象
		this.init(this.can)
		//保存每个图片的信息
		this.R = {};
		//获取图片信息
		this.loadSource(obj.url,function(){
			//获取信息完毕，触发start
			this.start()
		});
		//储存小鸟飞行的所有数据，Top,Left,Bottom,Right;
		this.birdPosition = {};
		//所有管子信息
		this.pipeArr = [];
	}

	//初始化 
	Game.prototype.init = function(can){
		//让canvas宽高以iphone6为模板设置
		var width = window.innerWidth;
		var height = window.innerHeight;
		
		if(width > 414){
			width = 414;
		}
		
		if(height > 667){
			height = 667;
		}
			
		can.width = width;
		can.height = height;
	}
	
	//加载资源
	Game.prototype.loadSource = function(url,callback){
		var xhr = new XMLHttpRequest();
		var self = this;
		xhr.onreadystatechange = function(){
			if(xhr.readyState === 4 && xhr.status === 200){
				var reSourse = JSON.parse(xhr.responseText).images;
				var len = reSourse.length;
				//记录图片个数，
				var num = 0;
				for(var i = 0 ; i < len; i++){
					self.R[reSourse[i].name] = new Image();
					
					self.R[reSourse[i].name].src = reSourse[i].url;
					
					self.R[reSourse[i].name].onload = function(){
						
						num ++;
						self.ctx.clearRect(0,0,self.can.width,self.can.height);
						self.ctx.font = '24px 微软雅黑'
						self.ctx.textAlign = 'center';
						self.ctx.fillText('正在加载资源 ' + num + '/' + len + ' 请稍后...',self.can.width / 2,self.can.height * (1 - 0.618) );
						
						if(num == len){ //说明图片加载完毕
							//改变this指向，使其指向为Game实例 
							callback.call(self)
						}
						
					}
				}
				
			}
		};	
		xhr.open('GET',url,true);
		xhr.send();
	}
	
	//开始游戏
	Game.prototype.start = function(){
		var self = this;
		//计步器
		this.num = 0;
		//分数
		this.score = 0;
		//场景管理器
		this.sceneManage = new SceneManage()
		
		this.timer = setInterval(function(){
			
			self.num ++;
			self.ctx.clearRect(0,0,self.can.width,self.can.height);
			
			self.sceneManage.render();
			self.sceneManage.update();
			
			self.ctx.beginPath();
			self.ctx.fillStyle = '#000';
			self.ctx.font = '13px 微软雅黑';
			self.ctx.textAlign = 'left';
			self.ctx.fillText('FNO:' + self.num,10,20)
			self.ctx.fillText('当前场景:' + self.sceneManage.sceneNumber,10,40)
			
		},20)
		
	}
	
	Game.prototype.gameOver = function(){
		/* var self = this;
		var overImage = this.R.text_game_over;//204		
		clearInterval(this.timer);
		var tiemr = setTimeout(function(){
			self.ctx.drawImage(overImage,(self.can.width - 204)/2,self.can.height * (1-0.618));
		},10)	 */
		//进入场景2
		this.sceneManage.enter(2)
	}
	
	
})()