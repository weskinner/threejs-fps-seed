define(
  []
  ,function() {
    function Player(scene, camera) {
      var self = this;

      this.camera = camera;
      this.camera.rotation.set( 0, 0, 0 );

      this.pitchObject = new THREE.Object3D();
      this.pitchObject.add( camera );

      this.yawObject = new THREE.Object3D();
      this.yawObject.add(pitchObject);

      this.sceneObject = new THREE.Object3D();
      this.sceneObject.position.y = 10;
      this.sceneObject.add( this.yawObject );

      scene.add(this.sceneObject);

      this.velocity = new THREE.Vector3();

      self.intent = {};

      var onKeyDown = function ( event ) {
        switch ( event.keyCode ) {
          case 38: // up
          case 87: // w
            self.intent.moveForward = true;
            break;
          case 37: // left
          case 65: // a
            self.intent.moveLeft = true; break;
          case 40: // down
          case 83: // s
            self.intent.moveBackward = true;
            break;
          case 39: // right
          case 68: // d
            self.intent.moveRight = true;
            break;
        }
      };

      var onKeyUp = function ( event ) {
        switch( event.keyCode ) {
          case 38: // up
          case 87: // w
            self.intent.moveForward = false;
            break;
          case 37: // left
          case 65: // a
            self.intent.moveLeft = false;
            break;
          case 40: // down
          case 83: // a
            self.intent.moveBackward = false;
            break;
          case 39: // right
          case 68: // d
            self.intent.moveRight = false;
            break;
        }
      };

      document.addEventListener( 'keydown', onKeyDown, false );
      document.addEventListener( 'keyup', onKeyUp, false );

      var onMouseMove = function ( event ) {
        self.intent.yaw = event.movementX;
        self.intent.pitch = event.movementY;
      };

      document.addEventListener( 'mousemove', onMouseMove, false );
    }

    Player.prototype.update = function(dt) {
      var self = this;
        , PI_2 = Math.PI / 2;

      if ( self.intent.moveForward ) self.velocity.z -= 0.12 * dt;
      if ( self.intent.moveBackward ) self.velocity.z += 0.12 * dt;
      if ( self.intent.moveLeft ) self.velocity.x -= 0.12 * dt;
      if ( self.intent.moveRight ) self.velocity.x += 0.12 * dt;

      self.sceneObject.translateX( self.velocity.x );
      self.sceneObject.translateY( self.velocity.y ); 
      self.sceneObject.translateZ( self.velocity.z );

      var yawRotation = -(intent.yaw * 0.002);
      this.yawObject.rotation.y += yawRotation;
      var pitchRotation = -(intent.pitch * 0.002);
      this.pitchObject.rotation.x += pitchRotation;
      this.pitchObject.rotation.x = Math.max( - PI_2, Math.min( PI_2, this.pitchObject.rotation.x ) );
    }

    return function() {
      return new Player(arguments);
    }
  }
);