/* global VersalPlayerAPI */
var AppView = require('./scripts/app_view');

window.addEventListener('WebComponentsReady', function(){
  //init the player interface
  var player = new VersalPlayerAPI();

  //kick start the app
  var appView = new AppView({
    el: document.querySelector('.main-app'),
    player: player
  });
  appView.render();
});
