define((function() {
  var localVelocity = CES.Component.extend({
    name: 'localVelocity',
    init: function () {
      this.velocity = new THREE.Vector3();
    }
  });

  return function() {
    return localVelocity;
  }
})());