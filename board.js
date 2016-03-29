simulator.board = 
  {
  init: function(element, height, width) {
    this.elem = element;
    this.height = height;
    this.width = width;
    var dimensions = {width: width+"px", height: height+"px"};
    element.css(dimensions).attr(dimensions);
    this.ctx = element[0].getContext("2d");
    //this.draw();
  },

  // x,y between 0-99
  draw: function() {
    var real_x, real_y, p;
    var focus = this.width/100;
    if (focus != this.height/100) { console.log("width and height should be in the same proportion")}
    this.ctx.clearRect(0,0, this.width, this.height);
    for(var i=0; i < window.particles.length; i++) {
      p = window.particles[i];
      real_x = p.x*focus;
      real_y = p.y*focus;
      real_r = p.r*focus

      this.ctx.beginPath();
      this.ctx.arc(real_x, real_y, real_r, 0, 2 * Math.PI);
      this.ctx.fillStyle = p.color;
      this.ctx.fill();
    }
    window.requestAnimationFrame(this.draw.bind(this));
  }
}
