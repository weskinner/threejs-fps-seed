define([],
  function() {
    return CES.System.extend({
      init: function() {
        
      },
      update: function (dt) {
        if(!this.disabled) {
          var velocityEntities, viewEntities, intent, velocity, view;

          velocityEntities = this.world.getEntities('intent', 'localVelocity');
          velocityEntities.forEach(function (entity) {
            intent = entity.getComponent('intent');
            velocity = entity.getComponent('localVelocity');

            if ( intent.moveForward ) velocity.z -= 0.12 * dt;
            if ( intent.moveBackward ) velocity.z += 0.12 * dt;
            if ( intent.moveLeft ) velocity.x -= 0.12 * dt;
            if ( intent.moveRight ) velocity.x += 0.12 * dt;
          });

          viewEntities = this.world.getEntities('intent', 'view');
          viewEntities.forEach(function(entity) {
            intent = entity.getComponent('intent');
            view = entity.getComponent('view');

            var yawRotation = -(intent.yaw * 0.002);
            view.updateYaw(yawRotation);
            var pitchRotation = -(intent.pitch * 0.002);
            view.updatePitch(pitchRotation);
          });
        }
      },
      disabled : false
    });
  }
);