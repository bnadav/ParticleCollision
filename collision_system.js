$(function(){

  window.timer = 0;

  counter = 0;

  simulator.board.init($("canvas"), 400, 400);

  insert_initial_events();

  simulator.board.draw();

  fetch_collision();

  function insert_initial_events() {
    for(var i=0; i<particles.length; i++) {
      insert_horizontal_collisoin(i);
      insert_vertical_collisoin(i);
      for(var j=i+1; j<particles.length; j++) {
        //  simulator.events.insert(new Event(particles[i].collides(j), i, j).to_dic());
      }
    }
  }

  function fetch_collision() {
    var event;
    if(simulator.events.any) {
      event = simulator.events.del_min().value;
      var valid = event.valid();
      if(event.valid()) { progress_time(event); }
      else {
        console.log("Event no valid"); 
        fetch_collision();   // ignore current event
      }
    }
  }

  function progress_time(event) {
    var delta = event.time - timer;
    var ev = event;
    tick();

    function tick() {
      //console.log("timer = " + timer + " event time " + ev.time);
      if(timer <= ev.time) {
        particles.forEach(function(p){p.progress()});
        //console.log(p.y);
        //simulator.board.draw();
		timer++;
        setTimeout(tick, 100);
      }
      else {
        after_draw(ev);
      }
    }
  }

  function after_draw(event) {
   // console.log(event.pa_index + " " + particles[event.pa_index].y + " num evets " + simulator.events.l_index());
    calculate_collisions(event);
    fetch_collision();  // to next phase
  }

  function calculate_collisions(event) {
      //vertical_collision(event);
      //simulator.board.draw(loop_action);
      if (event.pa_index === null) { horizontal_collision(event) }
      else if(event.pb_index == null) { vertical_collision(event) }
  }

  function insert_vertical_collisoin(particle_index) {
    var event;
    var obj = {};
    var particle = particles[particle_index];
    var time_to_collision = particle.collidesY();
    var c_time = + time_to_collision + timer;
      //console.log("insert vertical Particle collision time " + c_time);
    if(time_to_collision && (time_to_collision > 0) ) {
      event = new Ev(c_time, particle_index, null);
      obj.key = c_time; obj.value = event;
      simulator.events.insert(obj);
      //console.log("Insert vertical index " + particle_index + " time to collision " + time_to_collision);      
    }
  }

  function insert_horizontal_collisoin(particle_index) {
    var event;
    var obj = {};
    var particle = particles[particle_index];
    var time_to_collision = particle.collidesX();
    var c_time = + time_to_collision + timer;
      //console.log("insert horizontal Particle collision time " + c_time);
    if(time_to_collision && (time_to_collision > 0) ) {
      event = new Ev(c_time, null, particle_index);
      obj.key = c_time; obj.value = event;
      simulator.events.insert(obj);
      //console.log("Insert horizontal index " + particle_index + " time to collision " + time_to_collision);      
    }
  }

  /*
     function progress_time(event) {
     var delta = event.time - timer;
     particles.forEach(function(p) {p.progress(delta)})
     timer = event.time;
     }
     */


  function horizontal_collision(e) {
    //console.log("horizontal_collision");
    var particle = particles[e.pb_index];
    particle.bounceX();
    insert_horizontal_collisoin(e.pb_index);
  }

  function vertical_collision(e) {
    //console.log("vertical_collision");
    var particle = particles[e.pa_index];
    particle.bounceY();
    insert_vertical_collisoin(e.pa_index);
  }

})
