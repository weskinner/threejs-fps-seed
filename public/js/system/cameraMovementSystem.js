define(['js/wrapper/document'],
  function(document) {
    return CES.System.extend({
      init: function() {
        
      },
      update: function (delta) {
        if(!this.disabled) {
          var entities, camera
            , input = this.keyMap;

          entities = this.world.getEntities('camera');

          entities.forEach(function (entity) {
            camera = entity.getComponent('camera');

            delta *= 0.1;

            camera.velocity.x += ( - camera.velocity.x ) * 0.08 * delta;
            camera.velocity.z += ( - camera.velocity.z ) * 0.08 * delta;

            if ( input.moveForward ) camera.velocity.z -= 0.12 * delta;
            if ( input.moveBackward ) camera.velocity.z += 0.12 * delta;

            if ( input.moveLeft ) camera.velocity.x -= 0.12 * delta;
            if ( input.moveRight ) camera.velocity.x += 0.12 * delta;

            camera.yawObject.translateX( camera.velocity.x );
            camera.yawObject.translateY( camera.velocity.y ); 
            camera.yawObject.translateZ( camera.velocity.z );
          });
        };
      },
      disabled: false
    });
});