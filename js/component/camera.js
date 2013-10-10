define((function() {
  var Camera = CES.Component.extend({
    name: 'camera',
    init: function (scene, camera) {
      this.camera = camera;
      this.camera.rotation.set( 0, 0, 0 );

      this.pitchObject = new THREE.Object3D();
      this.pitchObject.add( camera );

      this.yawObject = new THREE.Object3D();
      this.yawObject.position.y = 10;
      this.yawObject.add( this.pitchObject );

      scene.add(this.yawObject);

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

  return function() {
    return Camera;
  }
})());