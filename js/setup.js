(function($, THREE) {

  $(document).ready(function() {
    var bodyElement = document.body
      , $container = $('#container')
      , $instructions = $('#instructions');

    /* Setup Fullscreen and Pointerlock Events */
    setupFullscreen();

    var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);

    var scene = new THREE.Scene();
    scene.add(camera);
    scene.fog = new THREE.Fog( 0xffffff, 0, 750 );

    var light = new THREE.DirectionalLight( 0xffffff, 1.5 );
    light.position.set( 1, 1, 1 );
    scene.add( light );

    var light = new THREE.DirectionalLight( 0xffffff, 0.75 );
    light.position.set( -1, - 0.5, -1 );
    scene.add( light );

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

    renderer.render(scene, camera);

    startGame(renderer, scene, camera)
  });

  function startGame(renderer, scene, camera) {
    var time = Date.now();

    var movement = setupMouse();
    var keyMap = setupKeyboard();
    var updateCES = SetupCES(camera, movement, keyMap);

    var frame = function() {
      window.requestAnimationFrame(frame);

      updateCES(Date.now() - time);

      renderer.render(scene, camera);

      time = Date.now();
    };

    frame();
  }

  function setupMouse() {
    var movement = {movementX: 0, movementY: 0};

    var onMouseMove = function ( event ) {
      movement.movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
      movement.movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;
    };

    document.addEventListener( 'mousemove', onMouseMove, false );

    return movement;
  }

  function setupKeyboard() {
    var keyMap = {};

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

    return keyMap;
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
      document.body.requestPointerLock();
    })
  }

})(jQuery, THREE);