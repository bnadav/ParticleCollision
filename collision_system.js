$(function(){

  window.timer = 0;

  counter = 0;

  simulator.board.init($("canvas"), 400, 400);

  insert_initial_events();

  loop_action();

  //while
  //
  function insert_initial_events() {
    for(var i=0; i<particles.length; i++) {
      //insert_horizontal_collisoin(particles[i]);
      insert_vertical_collisoin(i);
      for(var j=i+1; j<particles.length; j++) {
        //  simulator.events.insert(new Event(particles[i].collides(j), i, j).to_dic());
      }
    }
  }

  /*
  function event_loop() {
    //while(simulator.events.any()) {
    for(var k=0; k<10; k++) {
      loop_action();
    }
  }
  */

  function loop_action() {
    if (counter++ > 5) { return};
    var event = simulator.events.del_min().value;
    //console.log("events size = " + simulator.events.arr.length);
    //console.log(simulator.events.arr);
    //console.log(simulator.events.arr);
    if(event.valid()) {
      console.log(event);
      console.log("y coords = " + particles[event.pa].y);
      progress_time(event);
      vertical_collision(event);
      simulator.board.draw(loop_action);
      //if (event.pa == null) { horizontal_collision(event) }
      //else if(event.pb == null) { vertical_collision(event) }
    }
  }
 

  function insert_vertical_collisoin(particle_index) {
    var event;
    var obj = {};
    var particle = particles[particle_index];
    var time_to_collision = particle.collidesY();
    var c_time = + time_to_collision + timer;
  //  console.log("Time to collision " + time_to_collision);
  //  console.log("insert vertical Particle collision time " + c_time);
    if(time_to_collision ) {
      //console.log("Insert vertical");
      event = new Ev(c_time, particle_index, null);
      obj.key = c_time; obj.value = event;
      simulator.events.insert(obj);
    }
  }

  function insert_horizontal_collisoin(particle_index) {
    var event;
    var obj = {};
    console.log("horizontal Particle collision time " + p.collidesX());
    var c_time = p.collidesX() + timer;
    if(c_time) {
      console.log("Insert horizontal");
      event = new Ev(c_time, null, particle_index);
      obj.key = event.time; obj.value = event;
      simulator.events.insert(obj);
    }
  }

  function progress_time(event) {
   var delta = event.time - timer;
   particles.forEach(function(p) {p.progress(delta)})
   timer = event.time;
  }

/*
  function progress_time(event) {
    var wait_time = event.time - timer;
    p = particles[0];
    console.log(p.y);
    console.log("timer is:" + timer + ", event time is " + event.time);
    while(timer++ <= wait_time) {
    //  console.log(timer);
      particles.forEach(function(p){p.tick()});
      //console.log(p.y);
      simulator.board.draw();
    }
  }
  */

  function horizontal_collision(e) {
    console.log("horizontal_collision");
    var particle = particles[e.pb];
    particle.bounceX();
    insert_horizontal_collisoin(particle);
  }

  function vertical_collision(e) {
    //console.log("vertical_collision");
    var particle = particles[e.pa];
    particle.bounceY();
    insert_vertical_collisoin(e.pa);
  }

})
