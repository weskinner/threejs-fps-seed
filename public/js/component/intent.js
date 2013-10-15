define(['js/wrapper/document'],
  (function() {
    var intent = CES.Component.extend({
      name: 'intent',
      init: function (document) {
        var self = this;

        var onKeyDown = function ( event ) {
          switch ( event.keyCode ) {
            case 38: // up
            case 87: // w
              self.moveForward = true;
              break;
            case 37: // left
            case 65: // a
              self.moveLeft = true; break;
            case 40: // down
            case 83: // s
              self.moveBackward = true;
              break;
            case 39: // right
            case 68: // d
              self.moveRight = true;
              break;
          }
        };

        var onKeyUp = function ( event ) {
          switch( event.keyCode ) {
            case 38: // up
            case 87: // w
              self.moveForward = false;
              break;
            case 37: // left
            case 65: // a
              self.moveLeft = false;
              break;
            case 40: // down
            case 83: // a
              self.moveBackward = false;
              break;
            case 39: // right
            case 68: // d
              self.moveRight = false;
              break;
          }
        };

        document.addEventListener( 'keydown', onKeyDown, false );
        document.addEventListener( 'keyup', onKeyUp, false );

        var onMouseMove = function ( event ) {
          self.yaw = event.movementX;
          self.pitch = event.movementY;
        };

        document.addEventListener( 'mousemove', onMouseMove, false );
      }
    });

    return function(document) {
      return function() {
        return new intent(document);
      }
    }
  })()
)