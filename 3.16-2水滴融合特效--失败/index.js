// var c = document.getElementById('c'),
// 	w = c.width = window.innerWidth / 1.2,
// 	h = c.height = window.innerHeight / 2,
//     ctx = c.getContext('2d');







  /* Settings */
  
  var GROUPS        = [50,50,50],
      GROUP_COLOURS = ['rgba(97,160,232'];

//   
  var fluid = function() {
      
      var   ctx, 
            width, 
            height, 
            num_x, 
            num_y, 
            particles, 
            grid, 
            meta_ctx, 
            threshold = 220, 
            play = false, 
            spacing = 45, 
            radius = 30, 
            limit = radius * 0.66, 
            textures, 
            num_particles;
  
      var process_image = function() {
          var imageData = meta_ctx.getImageData(0, 0, width, height),
              pix = imageData.data;
  
          for (var i = 0, n = pix.length; i < n; i += 4) {
              (pix[i + 3] < threshold) && (pix[i + 3] /= 6);
          }
  
          ctx.putImageData(imageData, 0, 0);
      };
  
      var run = function () {

          i = num_particles;
          while(i--) particles[i].draw();
  
          process_image();
  
      };
      
    // 
      var Particle = function (type, x, y) {
          this.type = type;
          this.x = x;
          this.y = y;
      };

    //   
      Particle.prototype.draw = function () {
  
          var size = radius * 2;
  
          meta_ctx.drawImage(
          textures[this.type],
          this.x - radius,
          this.y - radius,
          size,
          size);
      };
          
      return {
      
          init: function(canvas, w, h) {
  
              particles = [];
              grid      = [];
              close = [];
              textures  = [];
          
              var canvas 	  = document.getElementById(canvas);
              ctx   	      = canvas.getContext('2d');
              canvas.height = h || window.innerHeight;
              canvas.width  = w || window.innerWidth;
              width         = canvas.width;
              height        = canvas.height;
  
              var meta_canvas    = document.createElement("canvas");
              meta_canvas.width  = width;
              meta_canvas.height = height;
              meta_ctx           = meta_canvas.getContext("2d");
  
              for(var i = 0; i < GROUPS.length; i++) {
  
                  var colour;

                  if(GROUP_COLOURS[i]) {
                      colour = GROUP_COLOURS[i];
                  } else {
  
                    //   colour = 'hsla(' + Math.round(Math.random() * 360) + ', 80%, 60%';
                    colour = 'rgba(' + Math.round(Math.random() * 360) + ',255,255,1)';
                  }
                
                  textures[i] = document.createElement("canvas");
                  textures[i].width  = radius * 2;
                  textures[i].height = radius * 2;
                  var nctx = textures[i].getContext("2d");
  
                  var grad = nctx.createRadialGradient(
                      radius,
                      radius,
                      1,
                      radius,
                      radius,
                      radius
                      );
  
                  grad.addColorStop(0, colour + ',1)');
                  grad.addColorStop(1, colour + ',0)');
                  nctx.fillStyle = grad;
                //   nctx.fillStyle = 'rgba(' + Math.round(Math.random() * 360) + ',255,255,1)'
                  nctx.arc(radius, radius, radius, 0, Math.PI * 2, true);
                  nctx.fill();
              }
              
              for (var i = 0; i < GROUPS.length; i++ ) {
                  for (var k = 0; k < GROUPS[i]; k++ ) {
                      particles.push(
                          new Particle(
                              i,
                              radius + Math.random() * (width - radius * 2),
                              radius + Math.random() * (height - radius * 2)
                              )
                          );
                  }
              }
  
              num_particles = particles.length;

              run();
          }      
      };
      
  }();
  
  fluid.init('c', window.innerWidth, window.innerHeight);

