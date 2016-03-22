function Particle(x,y,r,m,vx,vy,color) {
  this.x = x;
  this.y = y;
  this.r = r;
  this.mass = m;
  this.vx = vx;
  this.vy = vy;
  this.color = color;
  this.collison_counter = 0;
  //this.pos();
}

Particle.prototype.collidesX = function() {
  if(this.vx >0)
    return Math.floor((99-this.r-this.x)/this.vx);
  else if(this.vx < 0)
    return Math.floor((this.r-this.x)/this.vx);
  else 
    return null; // infinity

}

Particle.prototype.collidesY = function() {
  if(this.vy >0)
    return Math.floor((99-this.r-this.y)/this.vy);
  else if(this.vy < 0) 
    return Math.floor((this.r-this.y)/this.vy);
  else 
    return null; // infinity
}

Particle.prototype.bounceX = function() {
  this.vx = -1*this.vx;
}

Particle.prototype.bounceY = function() {
  this.vy = -1*this.vy;
}

Particle.prototype.progress = function(t) {
//  console.log("tick. progressing by " + t + ". Before " + this.y);
  this.x += this.vx*t;
  this.y += this.vy*t;
//  console.log("After " + this.y);
  return(this);
}
