function Particle(x,y,r,m,vx,vy,color) {
  this.x = x;
  this.y = y;
  this.r = r;
  this.mass = m;
  this.vx = vx;
  this.vy = vy;
  this.color = color;
  this.collision_counter = 0;
  //this.pos();
}

Particle.prototype.collidesX = function() {
  if(this.vx >0)
    return Math.floor((99-this.r-this.x)/this.vx);
  else if(this.vx < 0)
    return Math.floor((this.r-this.x)/this.vx);
  else 
    return Infinity;

}

Particle.prototype.collidesY = function() {
  if(this.vy >0)
    return Math.floor((99-this.r-this.y)/this.vy);
  else if(this.vy < 0) 
    return Math.floor((this.r-this.y)/this.vy);
  else 
    return Infinity;
}

Particle.prototype.collides = function(that) {
    if (this == that) return Infinity;
    var dx  = that.x - this.x;
    var dy  = that.y - this.y;
    var dvx = that.vx - this.vx; 
    var dvy = that.vy - this.vy;
    var dvdr = dx*dvx + dy*dvy;
    if( dvdr > 0) return Infinity;
    var dvdv = dvx*dvx + dvy*dvy;
    var drdr = dx*dx + dy*dy;
    var sigma = this.r + that.r;
    var d = (dvdr*dvdr) - dvdv * (drdr - sigma*sigma);
    if (d < 0) return Infinity;
    var t = -1*(dvdr + Math.sqrt(d)) / dvdv;
    return Math.floor(t);
}

Particle.prototype.bounceX = function() {
  this.vx = -1*this.vx;
  this.collision_counter++;
}

Particle.prototype.bounceY = function() {
  this.vy = -1*this.vy;
  this.collision_counter++;
}

Particle.prototype.bounce = function(that) {
    var dx  = that.x - this.x;
    var dy  = that.y - this.y;
    var dvx = that.vx - this.vx;
    var dvy = that.vy - this.vy;
    var dvdr = dx*dvx + dy*dvy;
    var dist = this.r + that.r;
    var J = 2 * this.mass * that.mass * dvdr / ((this.mass + that.mass) * dist);
    var Jx = J * dx / dist;
    var Jy = J * dy / dist;
    this.vx += Jx / this.mass;
    this.vy += Jy / this.mass;
    that.vx -= Jx / that.mass;
    that.vy -= Jy / that.mass;
    console.log("In bounce this new vx = " + this.vx);
    console.log("In bounce that new vx = " + that.vx);
    this.collision_counter++;
    that.collision_counter++;
}


Particle.prototype.progress = function() {
//  console.log("tick. progressing by " + t + ". Before " + this.y);
  this.x += this.vx;
  this.y += this.vy;
//  console.log("After " + this.y);
  return(this);
}

