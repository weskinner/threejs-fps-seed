define(
['js/collisionSystem', 'js/intent', 'js/entity/rifle'],
function(CollisionSystem, getIntent, Rifle) {
  function Player(scene, camera) {
    var self = this;

    this.height = 10;

    this.camera = camera;
    this.camera.rotation.set( 0, 0, 0 );

    this.pitchObject = new THREE.Object3D();
    this.pitchObject.add( camera );

    this.yawObject = new THREE.Object3D();
    this.yawObject.position.y = this.height;
    this.yawObject.add(this.pitchObject);

    this.velocity = new THREE.Vector3();
    this.canJump = true;

    this.weapon = new Rifle();
    var rifleObject = this.weapon.getObject();
    rifleObject.position.y += 3;
    this.yawObject.add(rifleObject);

    scene.add(this.yawObject);
  }

  Player.prototype.update = function(dt) {
    var self = this
      , PI_2 = Math.PI / 2
      , intent = getIntent();


    // dampen movement
    self.velocity.z += (-self.velocity.z) * 0.1;
    self.velocity.x += (-self.velocity.x) * 0.1;

    // movement input
    if ( intent.moveForward ) self.velocity.z -= 0.3 * dt;
    if ( intent.moveBackward ) self.velocity.z += 0.3 * dt;
    if ( intent.moveLeft ) self.velocity.x -= 0.3 * dt;
    if ( intent.moveRight ) self.velocity.x += 0.3 * dt;
    if ( intent.jump && this.canJump ) {
      this.canJump = false;
      self.velocity.y += 1 * dt;
    }

    // update view orientation
    var yawRotation = -(intent.yaw * 0.002);
    this.yawObject.rotation.y += yawRotation;
    var pitchRotation = -(intent.pitch * 0.002);
    this.pitchObject.rotation.x += pitchRotation;

    // restrict view from looking further than straight up or down
    this.pitchObject.rotation.x = Math.max( - PI_2, Math.min( PI_2, this.pitchObject.rotation.x ) );

    // apply gravity
    self.velocity.y -= 0.1;

    // check for ground collision
    var groundCollisionRay = new THREE.Raycaster(this.yawObject.position, new THREE.Vector3(0,-1,0), 1, this.height);
    var intersects = CollisionSystem.getIntersects(groundCollisionRay);
    for (var i = intersects.length - 1; i >= 0; i--) {
      var intersect = intersects[i]
      if(intersect.distance < this.height)
      {
        this.canJump = false;
        self.velocity.y = 0;
        self.yawObject.position.y = intersect.point.y += this.height;
      }
    };

    // update velocity translated into view space
    self.yawObject.translateX( self.velocity.x );
    self.yawObject.translateY( self.velocity.y ); 
    self.yawObject.translateZ( self.velocity.z );
  }

  return Player;
});