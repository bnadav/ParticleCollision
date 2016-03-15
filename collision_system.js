$(function(){

  function Particle(x,y,r,color) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.color = color;
    this.pos();
  }

  Particle.prototype.pos = function() {
    this.x = Math.random()*100;
    this.y = Math.random()*100;
    setTimeout(this.pos.bind(this), 100);
  }

  var board = {


    init: function(element, height, width, particles) {
      console.log(this);
      this.particles = particles;
      this.elem = element;
      this.height = height;
      this.width = width;
      var dimensions = {width: width+"px", height: height+"px"};
      element.css(dimensions).attr(dimensions);
      this.ctx = element[0].getContext("2d");
    },

    // x,y between 0-99
    draw: function() {
      var real_x, real_y, p;
      this.ctx.clearRect(0,0, this.width, this.height);
      for(var i=0; i < this.particles.length; i++) {
        p = this.particles[i];
        real_x = p.x*this.width/100;
        real_y = p.y*this.height/100;

        this.ctx.beginPath();
        this.ctx.arc(real_x, real_y, p.r, 0, 2 * Math.PI);
        this.ctx.fillStyle = p.color;
        this.ctx.fill();
      }
      window.requestAnimationFrame(this.draw.bind(this));
    }
  }

  board.init($("canvas"), 400, 400, [new Particle(20,20,10,"red"), new Particle(10, 15, 10, "green")]);
  board.draw();

  //var p = new Particle(10, 20, 10, "red", draw);
})
