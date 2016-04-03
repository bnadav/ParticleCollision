function Ev(time, particle_a, particle_b) {
  ///console.log("creating event with " + time + " " + particle_a + " " + particle_b);
  this.time = time;
  this.pa_index = particle_a;
  this.pb_index = particle_b;
  this.pa_counter = this.pb_counter = 0;
  if(particle_a !== null) { this.pa_counter = particles[this.pa_index].collision_counter }
  if(particle_b !== null) { this.pb_counter = particles[this.pb_index].collision_counter }
}

Ev.prototype.valid = function() {
  var pa = particles[this.pa_index];
  //console.log("index " + this.pa_index + " counter: " + pa.counter + ", expected " + this.pa_counter);
  if(this.pa_index === null) {
	  return(this.pb_index !== null && (particles[this.pb_index].collision_counter === this.pb_counter));
  } else if (this.pb_index === null) {
	  return(this.pa_index !== null && (particles[this.pa_index].collision_counter === this.pa_counter));
  } else {
	  return((particles[this.pa_index].collision_counter === this.pa_counter) && (particles[this.pb_index].collision_counter === this.pb_counter));
  }
}

