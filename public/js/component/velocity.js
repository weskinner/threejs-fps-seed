define((function() {
  var velocity = CES.Component.extend({
    name: 'camera',
    init: function (scene, camera) {
      this.velocity = new THREE.Vector3();
    }
  });

  return function() {
    return velocity;
  }
})());