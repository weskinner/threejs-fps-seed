define(function() {
  return function(scene) {
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
  };
});