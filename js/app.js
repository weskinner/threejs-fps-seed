requirejs(['js/component/camera', 'js/system/cameraLookingSystem', 'js/system/cameraMovementSystem'],
  function(cameraComp, cameraLookingSystem, cameraMovementSystem) {
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

  $instructions.click(function(event) {
    document.body.requestPointerLock();
  })

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

  var movement = {movementX: 0, movementY: 0};

  var onMouseMove = function ( event ) {
    movement.movementX = event.movementX;
    movement.movementY = event.movementY;
  };

  document.addEventListener( 'mousemove', onMouseMove, false );


  camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1000 );
  camera.position.y = 10;

  scene = new THREE.Scene();
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

  for ( var i = 0, l = geometry.vertices.length; i < l; i ++ ) {

    var vertex = geometry.vertices[ i ];
    vertex.x += Math.random() * 20 - 10;
    vertex.y += Math.random() * 2;
    vertex.z += Math.random() * 20 - 10;

  }

  for ( var i = 0, l = geometry.faces.length; i < l; i ++ ) {

    var face = geometry.faces[ i ];
    face.vertexColors[ 0 ] = new THREE.Color().setHSL( Math.random() * 0.2 + 0.5, 0.75, Math.random() * 0.25 + 0.75 );
    face.vertexColors[ 1 ] = new THREE.Color().setHSL( Math.random() * 0.2 + 0.5, 0.75, Math.random() * 0.25 + 0.75 );
    face.vertexColors[ 2 ] = new THREE.Color().setHSL( Math.random() * 0.2 + 0.5, 0.75, Math.random() * 0.25 + 0.75 );

  }

  material = new THREE.MeshBasicMaterial( { vertexColors: THREE.VertexColors } );

  mesh = new THREE.Mesh( geometry, material );
  scene.add( mesh );

  // objects

  geometry = new THREE.CubeGeometry( 20, 20, 20 );

  for ( var i = 0, l = geometry.faces.length; i < l; i ++ ) {

    var face = geometry.faces[ i ];
    face.vertexColors[ 0 ] = new THREE.Color().setHSL( Math.random() * 0.2 + 0.5, 0.75, Math.random() * 0.25 + 0.75 );
    face.vertexColors[ 1 ] = new THREE.Color().setHSL( Math.random() * 0.2 + 0.5, 0.75, Math.random() * 0.25 + 0.75 );
    face.vertexColors[ 2 ] = new THREE.Color().setHSL( Math.random() * 0.2 + 0.5, 0.75, Math.random() * 0.25 + 0.75 );

  }

  //

  renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );

  document.body.appendChild( renderer.domElement );

  var player = new CES.Entity();
  player.addComponent(new cameraComp(scene, camera));

  var world = new CES.World();

  world.addEntity(player);

  world.addSystem(new (cameraLookingSystem(movement))());
  world.addSystem(new (cameraMovementSystem(keyMap))());

  var lastTime = Date.now();
  var render = function () {
    requestAnimationFrame(render);

    world.update(Date.now() - lastTime);

    renderer.render(scene, camera);

    lastTime = Date.now();
  };

  render();
});