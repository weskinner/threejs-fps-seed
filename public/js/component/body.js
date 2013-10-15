define((function() {
  var body = CES.Component.extend({
    name: 'body',
    init: function (scene /*, obs...*/) {
      var args = Array.prototype.slice.call(arguments);
      args.shift();

      this.rootObject = new THREE.Object3D();
      args.forEach(function(obj) {
        this.pitchObject.add( obj );
      });

      scene.add(this.rootObject);
    },
    getObject: function() {
      return this.rootObject;
    }
  });

  return function() {
    return body;
  }
})());