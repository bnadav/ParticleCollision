MinPq = function() {
  this.arr = [];
  this.arr.push('unused');
}

MinPq.prototype.insert = function(elem) {
  this.arr.push(elem);
  this.swim(this.arr.length-1);
}

MinPq.prototype.min = function() {
  return this.arr[1];
}


MinPq.prototype.del_min = function() {
  var min;
  var last;
  if(this.any()) {
    min = this.min(); 
    last = this.arr.pop()
    if(this.l_index() > 1) {
      this.arr[1] = last;
      this.sink(1);
    }
  }
  return min;
}

MinPq.prototype.sink = function(index) {
  var c_index = index*2;
  if(c_index > this.l_index()) { return; }
  if((c_index+1 <= this.l_index()) && this.less(c_index+1, c_index)) {
    c_index++;
  }

  if(this.less(c_index, index)) {
    this.exchange(index, c_index);
    this.sink(c_index);
  }

}

MinPq.prototype.swim = function(index) {
  if(index == 1) { return; }
  var parent_index = Math.floor(index / 2);
  if(this.less(index, parent_index)) {
    this.exchange(index, parent_index);
    this.swim(parent_index);
  }
}

MinPq.prototype.l_index = function() {
  return this.arr.length - 1;
}

MinPq.prototype.any = function() {
  return (this.arr.length > 1);
}

MinPq.prototype.less = function(a, b) {
  return(this.arr[a].key < this.arr[b].key);
}

MinPq.prototype.exchange = function(a, b) {
  var tmp = this.arr[a];
  this.arr[a] = this.arr[b];
  this.arr[b] = tmp;
}

MinPq.prototype.to_s = function() {
  console.log(this.arr);
}

simulator.events = new MinPq();
/*
   mp = new MinPq();
//console.log("Empty");
// mp.to_s();
console.log("Add 2");
mp.insert({key:2, value:3});
// mp.to_s();
console.log("Add 1");
mp.insert({key:1, value:3});
// mp.to_s();
console.log("Add 55");
mp.insert({key:55, value:3});
// mp.to_s();
console.log("Add 0");
mp.insert({key:0, value:3});
// mp.to_s();


console.log("del min")
console.log(mp.del_min());
// mp.to_s();
console.log("del min")
console.log(mp.del_min());
// mp.to_s();
console.log("del min")
console.log(mp.del_min());
//add 43
console.log("Add 43");
mp.insert({key:43, value:3});
console.log("del min")
console.log(mp.del_min());
console.log("del min")
console.log(mp.del_min());
*/
