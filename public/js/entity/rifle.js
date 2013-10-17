define(function() {
  function Rifle() {
    var material = new THREE.MeshBasicMaterial({color: 0x442233})
      , geometry = new THREE.CylinderGeometry(2, 2, 5, 10, 1, false);

    this.object = new THREE.Mesh(geometry, material);
  }

  Rifle.prototype.getObject = function() {
    return this.object;
  }

  return Rifle;
})