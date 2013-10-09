function SetupCES (camera, movement, keyMap) {
  var Game = {
    Component: {},
    Entity: {},
    System: {}
  };

  var Camera = Game.Component.Camera = CES.Component.extend({
    name: 'camera',
    init: function (camera) {
      this.camera = camera;
      this.camera.rotation.set( 0, 0, 0 );

      this.pitchObject = new THREE.Object3D();
      this.pitchObject.add( camera );

      this.yawObject = new THREE.Object3D();
      this.yawObject.position.y = 10;
      this.yawObject.add( this.pitchObject );

      this.velocity = new THREE.Vector3();

      this.PI_2 = Math.PI / 2;
    },
    updateYaw: function(movementX) {
      this.yawObject.rotation.y -= movementX * 0.002;
    },
    updatePitch: function(movementY) {
      this.pitchObject.rotation.x -= movementY * 0.002;
      this.pitchObject.rotation.x = Math.max( - this.PI_2, Math.min( this.PI_2, this.pitchObject.rotation.x ) );
    }
  });

  Game.Component.Mouse = CES.Component.extend({
    name: 'mouse',
    init: function (movement) {
      this.movement = movement;
    }
  });

  Game.Component.Keyboard = CES.Component.extend({
    name: 'keyboard',
    init: function (keyMap) {
      this.keyMap = keyMap;
    }
  });

  Game.Entity.player = new CES.Entity();
  Game.Entity.player.addComponent(new Camera(camera));
  Game.Entity.player.addComponent(new Mouse(movement));
  Game.Entity.player.addComponent(new Keyboard(keyMap));

  Game.System.CameraLookingSystem = CES.System.extend({
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

  Game.System.CameraMovementSystem = CES.System.extend({
    update: function (delta) {
      var entities, keyboard, camera;

      entities = this.world.getEntities('keyboard', 'camera');

      entities.forEach(function (entity) {
        keyboard = entity.getComponent('keyboard');
        camera = entity.getComponent('camera');

        delta *= 0.1;

        camera.velocity.x += ( - camera.velocity.x ) * 0.08 * delta;
        camera.velocity.z += ( - camera.velocity.z ) * 0.08 * delta;

        if ( keyboard.keyMap.moveForward ) camera.velocity.z -= 0.12 * delta;
        if ( keyboard.keyMap.moveBackward ) camera.velocity.z += 0.12 * delta;

        if ( keyboard.keyMap.moveLeft ) camera.velocity.x -= 0.12 * delta;
        if ( keyboard.keyMap.moveRight ) camera.velocity.x += 0.12 * delta;

        camera.yawObject.translateX( camera.velocity.x );
        camera.yawObject.translateY( camera.velocity.y ); 
        camera.yawObject.translateZ( camera.velocity.z );
      });
    }
  });

  var world = new CES.World();

  world.addEntity(player);

  world.addSystem(Game.System.CameraLookingSystem());
  world.addSystem(Game.System.CameraMovementSystem());

  return world.update.bind(world);
};