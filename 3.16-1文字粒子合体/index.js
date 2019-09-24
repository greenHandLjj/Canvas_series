var c = document.getElementById('c'),
	w = c.width = window.innerWidth / 1.2,
	h = c.height = window.innerHeight / 2,
	ctx = c.getContext('2d');

var focallength = 250;

var Dot = function (centerX, centerY, centerZ, radius) {
	this.dx = centerX;  //保存原来的位置
	this.dy = centerY;
	this.dz = centerZ;
	this.tx = 0;     //保存粒子聚合后又飞散开的位置
	this.ty = 0;
	this.tz = 0;
	this.z = centerZ;
	this.x = 0;
	this.y = 0;
	this.radius = radius;
	this.r = radius;
}

Dot.prototype = {
	paint: function () {
		ctx.save();
		ctx.beginPath();
		var scale = focallength / (focallength + this.z);
		ctx.arc(w / 2 + (this.x - w / 2) * scale, h / 2 + (this.y - h / 2) * scale, this.radius * scale, 0, 2 * Math.PI);
		ctx.fillStyle = "rgba(50,50,50," + scale + ")";
		ctx.fill()
		ctx.restore();
	}
}

function getImageData() {

	drawText('J S');
	var dataImage = ctx.getImageData(0, 0, w, h);
	ctx.clearRect(0, 0, w, h);
	var dots = [];

	for (var i = 0; i < w; i++) {
		for (var j = 0; j < h; j++) {
			var x = (j * w + i) * 4;
			if (dataImage.data[x + 3] >= 128) {
				var dot = new Dot(i - 3, j - 3, 0, 2);
				dots.push(dot);
			}
		}
	}

	return dots;
}

function drawText(text) {
	ctx.save()
	ctx.font = "100px 微软雅黑 bold";
	ctx.fillStyle = "rgba(168,168,168,1)";
	ctx.textAlign = "center";
	ctx.textBaseline = "middle";
	ctx.fillText(text, w / 2, h / 2);
	ctx.restore();
}

var arr = getImageData();
var len = arr.length;

arr.forEach(function(item,index){
	
	ctx.beginPath();
	ctx.fillStyle = 'rgba(25,168,168,1)';

	item.x = parseInt(w * Math.random());
	item.y = parseInt(h * Math.random());
	item.radius = parseInt(item.radius *(Math.random() * 3));

	ctx.arc(item.x,item.y,item.radius,0,Math.PI * 5);
	ctx.fill();

},{'name':'LJJ'})


// 给出target ，有现在的坐标，x -> x1 y -> y1 r -> r1
function animate(){

	ctx.fillStyle = 'rgba(0,0,0,0.5)';
	ctx.fillRect(0,0,w,h);

	arr.forEach(function(item){
		var iSpeedX = (item.dx - item.x) / 7;
		var iSpeedY = (item.dy - item.y) / 7;
		var iSpeedR = (item.r - item.radius) / 3;
		// console.log(item.x,item.dx);
		item.x += iSpeedX;
		item.y += iSpeedY;
		item.radius += iSpeedR;
		ctx.beginPath();
		ctx.fillStyle = 'rgba(25,168,148,1)';
		ctx.arc(item.x,item.y,item.radius,0,Math.PI * 2);
		ctx.fill();
	})

}

function loop(){
	window.requestAnimationFrame(loop);
	// setTimeout(loop,500);
	animate();
}











// var image = new Image();
// // image.crossOrigin = 'anonymous';

// var particles = []; 
// // 
// var imageData = null;

// // 图片加载完成
// image.onload = function(){
//     ctx.drawImage(this,100,100);
//     imageData = ctx.getImageData(100,100,this.width,this.height);
// 	console.log(imageData.data);
// 	calculate();
// }

// image.src = './images/logo.png';

// function calculate(){

// }


// /* // 计算并保存坐标
// function calculate(){
// 	// var len = imageData.length;
// 	// 只保存100行，100列的像素值
// 	var cols = 100,
// 		rows = 100;
// 	// 设置成100行，100列的宽高
// 	var s_width = parseInt(image.width/cols);
// 	var s_height = parseInt(image.height/rows);
// 	// 数组中的位置
// 	var pos = 0;
// 	// 粒子的x，y坐标
// 	var par_x,par_y;
// 	// 像素值数组
// 	var data = imageData.data;
// 	// i，j从1开始
// 	for(var i = 1; i <= cols; i++){
// 		for(var j = 1; j <= rows; j++){
// 			// 计算（i，j）在数组中的R的坐标值
// 			pos = [(j * s_height - 1) * image.width + (i * s_width - 1)]*4;
// 			console.log(data[pos])
// 			// 判断R值是否符合要求
// 			if(data[pos] > 250){
// 				var particle = {
// 					// 偏移，x，y轴坐标都随机一下
// 					x : image.x + j * s_width + (Math.random() - 0.5) * 20,
// 					y : image.y + j * s_height + (Math.random() - 0.5) * 20,
// 					fillStyle : '#006eff'
// 				}
// 				// 符合要求的粒子存放进数组
// 				particles.push(particle);
// 			}
// 		}
// 	}

// } */

