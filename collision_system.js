$(function(){

  window.timer = 0;

  simulator.board.init($("canvas"), 400, 400);

  // simulator.events = new MinPq();
  dc = 0;

  insert_initial_events();

  simulator.board.draw();

  fetch_collision();

  function insert_initial_events() {
    //for(var i=0; i<particles.length; i++) {
    insert_new_collisions(new Ev(0, 0, 1));
    //}
  }

  function fetch_collision() {
    var event;
    if(simulator.events.any) {
      event = simulator.events.del_min().value;
      if(event.valid()) { 
        progress_time(event); 
      } else {
        //console.log("Event no valid"); 
        //console.log(event);
        fetch_collision();   // ignore current event
      }
    }
  }

  function progress_time(event) {
    var delta = event.time - timer;
    tick();

    function tick() {
      //console.log("timer = " + timer + " event time " + ev.time);
      if(timer <= event.time) {
        particles.forEach(function(p){p.progress()});
        timer++;
        setTimeout(tick, 1000);
      }
      else {
        after_draw(event);
      }
    }
  }

  function after_draw(event) {
    update_velocities(event);
    insert_new_collisions(event);
    fetch_collision();  // to next phase
  }


  function update_velocities(e) {
    var pair = get_pair(e);
    var pa = pair[0]; 
    var pb = pair[1];

    if (pa === null) { pb.bounceX() }
    else if(pb === null) { pa.bounceY() }
    else { pa.bounce(pb)};
  }

  function insert_new_collisions(e) {
    var time_to_collision;
    var timer_at_collision;
    var t;
    var obj = {};


    insert_x_collision(e.pa_index);
    insert_x_collision(e.pb_index);
    insert_y_collision(e.pa_index);
    insert_y_collision(e.pb_index);
    insert_pp_collision(e.pa_index);
    insert_pp_collision(e.pb_index);

    function insert_y_collision(p_index) {
      if(p_index === null) {return}
      var p = particles[p_index];
      t = p.collidesY();
      if(t && (t > 0)) { 
        console.log("Inserting y collision for " + p_index + " at "  + (t+timer));
        obj = {};
        obj.key = t+timer; obj.value = new Ev(t+timer, p_index, null);
        simulator.events.insert(obj);
      }
    }

    function insert_x_collision(p_index) {
      if(p_index === null) {return}
      var p = particles[p_index];
      t = p.collidesX();
      if(t && (t > 0)) { 
        console.log("Inserting x collision for " + p_index + " at " + (t+timer) + " for index " + p_index);
        obj = {};
        obj.key = t+timer; obj.value = new Ev(t+timer, null, p_index);
        simulator.events.insert(obj);
      }
    }

    function insert_pp_collision(p_index) {
      var p;
      if(p_index === null) {return}
      for(var i=0; i<particles.length; i++) {
        if(p_index !== i) {
          p = particles[p_index];
          t=p.collides(particles[i]);
          if (t && t > 0 && t !== Infinity) { 
            console.log("Inserting pp collision " + p_index + " at " + (t+timer) + " t=" + t);
            obj = {};
            obj.key = t+timer; obj.value = new Ev(t+timer, p_index, i);
            simulator.events.insert(obj);
          }
        }
      }
    }
  }

  function get_pair(e) {
    var pa = e.pa_index == null ? null : particles[e.pa_index];
    var pb = e.pb_index == null ? null : particles[e.pb_index];
    return [pa, pb];
  }

})
