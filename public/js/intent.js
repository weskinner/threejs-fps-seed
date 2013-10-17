define(function() {
  var intent = {};

  // keyboard

  var handleInput = function ( event, keyDown ) {
    switch ( event.keyCode ) {
      case 38: // up
      case 87: // w
        intent.moveForward = keyDown;
        break;
      case 37: // left
      case 65: // a
        intent.moveLeft = keyDown;
        break;
      case 40: // down
      case 83: // s
        intent.moveBackward = keyDown;
        break;
      case 39: // right
      case 68: // d
        intent.moveRight = keyDown;
        break;
      case 32: // space
        intent.jump = keyDown;
        break;
    }
  };

  document.addEventListener( 'keydown', function(e) { handleInput(e, true) } , false );
  document.addEventListener( 'keyup', function(e) { handleInput(e, false) }, false );

  // mouse
  
  var onMouseMove = function ( event ) {
    intent.yaw = Math.abs(event.movementX) > 1 ? event.movementX : 0;
    intent.pitch = Math.abs(event.movementY) > 1 ? event.movementY : 0;
    console.log("yaw: " + intent.yaw + " pitch: " + intent.pitch);
  };

  document.addEventListener( 'mousemove', onMouseMove, false );

  return function() {
    return intent;
  }
})