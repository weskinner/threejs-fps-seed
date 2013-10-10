define(['js/wrapper/document'],
  function(document) {
    return CES.System.extend({
      init: function() {
        var keyMap = this.keyMap = {};

        var onKeyDown = function ( event ) {
          switch ( event.keyCode ) {
            case 38: // up
            case 87: // w
              keyMap.moveForward = true;
              break;
            case 37: // left
            case 65: // a
              keyMap.moveLeft = true; break;
            case 40: // down
            case 83: // s
              keyMap.moveBackward = true;
              break;
            case 39: // right
            case 68: // d
              keyMap.moveRight = true;
              break;
          }
        };

        var onKeyUp = function ( event ) {
          switch( event.keyCode ) {
            case 38: // up
            case 87: // w
              keyMap.moveForward = false;
              break;
            case 37: // left
            case 65: // a
              keyMap.moveLeft = false;
              break;
            case 40: // down
            case 83: // a
              keyMap.moveBackward = false;
              break;
            case 39: // right
            case 68: // d
              keyMap.moveRight = false;
              break;
          }
        };

        document.addEventListener( 'keydown', onKeyDown, false );
        document.addEventListener( 'keyup', onKeyUp, false );
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
      disabled: true
    });
});