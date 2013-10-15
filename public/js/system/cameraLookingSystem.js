define(['js/wrapper/document'],
  function(document) {
    return CES.System.extend({
      init: function() {
        
      },
      update: function (dt) {
        if(!this.disabled) {
          var entities
            , camera
            , mouse = this.mouse;
          entities = this.world.getEntities('camera');

          entities.forEach(function (entity) {
            camera = entity.getComponent('camera');
            var yawRotation = -(mouse.movementX * 0.002);
            camera.updateYaw(yawRotation);
            var pitchRotation = -(mouse.movementY * 0.002);
            camera.updatePitch(pitchRotation);
          });
        }
      },
      disabled : false
    });
  }
);