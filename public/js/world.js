define(['js/entity/player', 'js/setupScene', 'js/collisionSystem'],
	function(Player, setupScene, collisionSystem) {
		return {
      setup: function() {
        this.observers = [];

        var camera = this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1000 );
        camera.position.y = 10;

        var scene = this.scene = new THREE.Scene();

        var worldMesh = setupScene(scene);
        collisionSystem.addObject(worldMesh);

        var renderer = this.renderer = new THREE.WebGLRenderer();
        renderer.setSize( window.innerWidth, window.innerHeight );

        document.body.appendChild( renderer.domElement );

        // observers

        var player = new Player(scene, camera);

        this.observers.push(player);

        this.enabled = false;
      },
      update: function(dt) {
        if(this.enabled) {
          this.observers.forEach(function(o) {
            o.update(dt);
          });
          
          this.renderer.render(this.scene, this.camera);
        }
      },
      enable: function() {
        this.enabled = true;
      },
      disable: function() {
        this.enabled = false;
      }
    }
  }
);