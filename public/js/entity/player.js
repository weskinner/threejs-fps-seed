define(
  ['js/component/view', 'js/component/localVelocity', 'js/component/intent']
  ,function(view, localVelocity, intent) {
    return function(scene, camera) {
      var player = new CES.Entity();
      player.addComponent(new view(scene, camera));
      player.addComponent(new localVelocity());
      player.addComponent(new intent());
      return player;
    }
  }
);