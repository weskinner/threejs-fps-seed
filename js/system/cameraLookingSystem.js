define(function() {
  return function(mouse) {
    return CES.System.extend({
      update: function (dt) {
        var entities, camera;

        entities = this.world.getEntities('camera');

        entities.forEach(function (entity) {
          camera = entity.getComponent('camera');
          camera.updateYaw(mouse.movementX);
          camera.updatePitch(mouse.movementY);
        });
      }
    });
  }
});