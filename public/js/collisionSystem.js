define([], function() {
  function CollisionSystem() {
    this.objects = [];
  }

  CollisionSystem.prototype.addObject = function(obj) {
    this.objects.push(obj);
  }

  CollisionSystem.prototype.getIntersects = function(raycaster) {
    return raycaster.intersectObjects(this.objects, true /*recursive*/);
  }

  var collisionSystem = new CollisionSystem();

  return collisionSystem;
});