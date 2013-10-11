define(['js/component/camera', 'js/system/cameraLookingSystem', 'js/system/cameraMovementSystem', 'js/wrapper/document'],
	function(cameraComp, cameraLookingSystem, cameraMovementSystem, document) {
		return {
      setup: function() {
        var lookingSystem = new cameraLookingSystem()
          , movementSystem = new cameraMovementSystem();

        var camera = this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1000 );
        camera.position.y = 10;

        var scene = this.scene = new THREE.Scene();
        scene.fog = new THREE.Fog( 0xffffff, 0, 750 );

        var light = new THREE.DirectionalLight( 0xffffff, 1.5 );
        light.position.set( 1, 1, 1 );
        scene.add( light );

        var light = new THREE.DirectionalLight( 0xffffff, 0.75 );
        light.position.set( -1, - 0.5, -1 );
        scene.add( light );

        var ray = new THREE.Raycaster();
        ray.ray.direction.set( 0, -1, 0 );

        // floor

        var geometry = new THREE.PlaneGeometry( 2000, 2000, 100, 100 );
        geometry.applyMatrix( new THREE.Matrix4().makeRotationX( - Math.PI / 2 ) );

        var groundTexture = new THREE.ImageUtils.loadTexture("/image/cracked_flats_ground.jpg");

        var groundMaterial = new THREE.MeshBasicMaterial({map: groundTexture});

        var mesh = new THREE.Mesh( geometry, groundMaterial );
        scene.add( mesh );

        var renderer = this.renderer = new THREE.WebGLRenderer();
        renderer.setSize( window.innerWidth, window.innerHeight );

        document.body.appendChild( renderer.domElement );

        var player = new CES.Entity();
        player.addComponent(new cameraComp(scene, camera));

        var world = this.ces = new CES.World();

        world.addEntity(player);

        world.addSystem(lookingSystem);
        world.addSystem(movementSystem);

        this.enabled = true;
      },
      update: function(dt) {
        if(this.enabled) {
          this.ces.update(dt);
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