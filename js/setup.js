(function($, THREE) {

  $(document).ready(function() {
    var bodyElement = document.body
      , $container = $('#container')
      , $instructions = $('#instructions');

    /* Setup Fullscreen and Pointerlock Events */
    setupFullscreen();

    var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);

    var scene = new THREE.Scene();
    scene.fog = new THREE.Fog( 0xffffff, 0, 750 );

    var light = new THREE.DirectionalLight( 0xffffff, 1.5 );
    light.position.set( 1, 1, 1 );
    scene.add( light );

    var light = new THREE.DirectionalLight( 0xffffff, 0.75 );
    light.position.set( -1, - 0.5, -1 );
    scene.add( light );

    controls = firstPersonCameraControls(camera);
    scene.add( controls.getObject() );

    ray = new THREE.Raycaster();
    ray.ray.direction.set( 0, -1, 0 );

    // floor

    geometry = new THREE.PlaneGeometry( 2000, 2000, 100, 100 );
    geometry.applyMatrix( new THREE.Matrix4().makeRotationX( - Math.PI / 2 ) );

    material = new THREE.MeshBasicMaterial( { vertexColors: THREE.VertexColors } );

    mesh = new THREE.Mesh( geometry, material );
    scene.add( mesh );

    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );

    document.body.appendChild( renderer.domElement );

    loop(renderer, [controls])
  });

  function firstPersonCameraControls(camera) {
    var scope = this;

    camera.rotation.set( 0, 0, 0 );

    var pitchObject = new THREE.Object3D();
    pitchObject.add( camera );

    var yawObject = new THREE.Object3D();
    yawObject.position.y = 10;
    yawObject.add( pitchObject );

    var moveForward = false;
    var moveBackward = false;
    var moveLeft = false;
    var moveRight = false;

    var velocity = new THREE.Vector3();

    var PI_2 = Math.PI / 2;

    var onMouseMove = function ( event ) {

      if ( scope.enabled === false ) return;

      var movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
      var movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;

      yawObject.rotation.y -= movementX * 0.002;
      pitchObject.rotation.x -= movementY * 0.002;

      pitchObject.rotation.x = Math.max( - PI_2, Math.min( PI_2, pitchObject.rotation.x ) );

    };

    var onKeyDown = function ( event ) {

      switch ( event.keyCode ) {

        case 38: // up
        case 87: // w
          moveForward = true;
          break;

        case 37: // left
        case 65: // a
          moveLeft = true; break;

        case 40: // down
        case 83: // s
          moveBackward = true;
          break;

        case 39: // right
        case 68: // d
          moveRight = true;
          break;

        case 32: // space
          if ( canJump === true ) velocity.y += 10;
          canJump = false;
          break;

      }

    };

    var onKeyUp = function ( event ) {

      switch( event.keyCode ) {

        case 38: // up
        case 87: // w
          moveForward = false;
          break;

        case 37: // left
        case 65: // a
          moveLeft = false;
          break;

        case 40: // down
        case 83: // a
          moveBackward = false;
          break;

        case 39: // right
        case 68: // d
          moveRight = false;
          break;

      }

    };

    document.addEventListener( 'mousemove', onMouseMove, false );
    document.addEventListener( 'keydown', onKeyDown, false );
    document.addEventListener( 'keyup', onKeyUp, false );

    return {
      update: function(delta) {
        if ( scope.enabled === false ) return;

        delta *= 0.1;

        velocity.x += ( - velocity.x ) * 0.08 * delta;
        velocity.z += ( - velocity.z ) * 0.08 * delta;

        if ( moveForward ) velocity.z -= 0.12 * delta;
        if ( moveBackward ) velocity.z += 0.12 * delta;

        if ( moveLeft ) velocity.x -= 0.12 * delta;
        if ( moveRight ) velocity.x += 0.12 * delta;

        yawObject.translateX( velocity.x );
        yawObject.translateY( velocity.y ); 
        yawObject.translateZ( velocity.z );
      }
      ,getObject: function() {
        return yawObject;
      }
    }
  }

  function loop(renderer, objects) {
    var time = Date.now();

    var frame = function() {
      window.requestAnimationFrame(frame);

      for (var i = objects.length - 1; i >= 0; i--) {
        objects[i].update(Date.now() - time);
      };

      time = Date.now();
    };

    frame();
  }

  function setupFullscreen() {
    var bodyElement = document.body
      , $container = $('#container')
      , $instructions = $('#instructions');

    var pointerlockchange = function(event) {
      if(document.pointerLockElement === bodyElement) {
        // entering pointer lock
        $container.hide();
      } else {
        // leaving pointer lock
        $container.show();
      }
    };

    var pointerlockerror = function(event) {
      $container.show();
    };

    document.addEventListener('pointerlockchange', pointerlockchange, false);
    document.addEventListener('pointerlockerror', pointerlockerror, false);

    var fullscreenchange = function(event) {
      if(document.fullscreenEnabled) {
        console.log('entering fullscreen');
        document.body.requestPointerLock();
      } else {
        console.log('leaving fullscreen');
      }
    }

    document.addEventListener('fullscreenchange', fullscreenchange, false);

    $instructions.click(function(event) {
      document.body.requestFullScreen();
    })
  }

})(jQuery, THREE);