define(['js/wrapper/document'],
  function(document) {
  return function(mouse) {
    return CES.System.extend({
      init: function() {
        console.log('looking system');
      }
      update: function (dt) {
        if(!this.disabled) {
          var entities, camera;

          entities = this.world.getEntities('camera');

          entities.forEach(function (entity) {
            camera = entity.getComponent('camera');
            camera.updateYaw(mouse.movementX);
            camera.updatePitch(mouse.movementY);
          });
        }
      },
      disabled : true
    });
  }
});