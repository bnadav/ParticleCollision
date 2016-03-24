function Ev(time, particle_a, particle_b) {
  this.time = time;
  this.pa_index = particle_a;
  this.pb_index = particle_b;
  this.pa_counter = this.bp_counter = undefined;
  if(particle_a) { this.pa_counter = particles[this.pa_index].collision_counter }
  if(particle_b) { this.pb_counter = particles[this.pb_index].collision_counter }
}

Ev.prototype.valid = function() {
  var pa = particles[this.pa_index];
  //console.log("index " + this.pa_index + " counter: " + pa.counter + ", expected " + this.pa_counter);
  return (this.pa_index != null && (particles[this.pa_index].collision_counter === this.pa_counter));
  
  /*
  return(!((this.pa && this.pa.collision_counter != this.pa_counter) ||
           (this.pb && this.pb.collision_counter != this.pb_counter))
        )
  */
}

/*
Event.prototype.to_dic = function() {
  return {key: this.t, value: this};
}
*/

