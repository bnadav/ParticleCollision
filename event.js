function Ev(time, particle_a, particle_b) {
  this.time = time;
  this.pa = particle_a;
  this.pb = particle_b;
  this.pa_counter = this.bp_counter = null;
  if(particle_a) { this.pa_counter = particle_a.collision_counter }
  if(particle_b) { this.pb_counter = particle_b.collision_counter }
}

Ev.prototype.valid = function() {
  return(!((this.pa && this.pa.collision_counter != this.pa_counter) ||
           (this.pb && this.pb.collision_counter != this.pb_counter))
        )
}

/*
Event.prototype.to_dic = function() {
  return {key: this.t, value: this};
}
*/

