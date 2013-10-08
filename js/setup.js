(function($, THREE) {

  $(document).ready(function() {
    var bodyElement = document.body
      , $container = $('#container')
      , $instructions = $('#instructions');

    /* Setup Fullscreen and Pointerlock Events */
    setupFullscreen();
    var movement = setupMouse();
    var keyMap = setupKeyboard();

    var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);

    var Camera = CES.Component.extend({
        name: 'camera',
        init: function (camera) {
            camera.rotation.set( 0, 0, 0 );

            this.pitchObject = new THREE.Object3D();
            pitchObject.add( camera );

            this.yawObject = new THREE.Object3D();
            yawObject.position.y = 10;
            yawObject.add( pitchObject );

            this.velocity = new THREE.Vector3();
        },
        updateYaw: function(movementX) {
            yawObject.rotation.y -= movementX * 0.002;
        },
        updatePitch: function(movementY) {
            pitchObject.rotation.x -= movementY * 0.002;
            pitchObject.rotation.x = Math.max( - PI_2, Math.min( PI_2, pitchObject.rotation.x ) );
        }
    });

    var Mouse = CES.Component.extend({
        name: 'mouse',
        init: function (movement) {
            this.movement = movement;
        }
    });

    var Keyboard = CES.Component.extend({
        name: 'mouse',
        init: function (keyMap) {
            this.keyMap = keyMap;
        }
    });

    var player = new CES.Entity();
    player.addComponent(new Camera(camera));
    player.addComponent(new Mouse(movement));
    player.addComponent(new Keyboard(keyMap));

    var CameraLookingSystem = CES.System.extend({
        update: function (dt) {
            var entities, mouse, camera;

            entities = this.world.getEntities('mouse', 'camera');

            entities.forEach(function (entity) {
                mouse = entity.getComponent('mouse');
                camera = entity.getComponent('camera');
                camera.updateYaw(mouse.movement.movementX);
                camera.updatePitch(mouse.movement.movementY);
            });
        }
    });

    var CameraMovementSystem = CES.System.extend({
        update: function (dt) {
            var entities, keyboard, camera;

            entities = this.world.getEntities('keyboard', 'camera');

            entities.forEach(function (entity) {
                keyboard = entity.getComponent('keyboard');
                camera = entity.getComponent('camera');
                
                delta *= 0.1;

                camera.velocity.x += ( - velocity.x ) * 0.08 * delta;
                camera.velocity.z += ( - velocity.z ) * 0.08 * delta;

                if ( keyboard.keyMap.moveForward ) camera.velocity.z -= 0.12 * delta;
                if ( keyboard.keyMap.moveBackward ) camera.velocity.z += 0.12 * delta;

                if ( keyboard.keyMap.moveLeft ) camera.velocity.x -= 0.12 * delta;
                if ( keyboard.keyMap.moveRight ) camera.velocity.x += 0.12 * delta;

                camera.yawObject.translateX( velocity.x );
                camera.yawObject.translateY( velocity.y ); 
                camera.yawObject.translateZ( velocity.z );
            });
        }
    });

    var world = new CES.World();

    world.addEntity(player);

    world.addSystem(new CameraLookingSystem());
    world.addSystem(new CameraMovementSystem());

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

  function loop(renderer, world) {
    var time = Date.now();

    var frame = function() {
      window.requestAnimationFrame(frame);

      world.update(Date.now() - time);

      time = Date.now();
    };

    frame();
  }

  function setupMouse() {
    var movement = {};

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
      document.body.requestFullScreen();
    })
  }

})(jQuery, THREE);