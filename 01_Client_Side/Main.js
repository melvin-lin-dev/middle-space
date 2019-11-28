//  Declaring Canvas

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

//  Starting Game
let game = new Game();
let gameBtnTimeout = null;

localStorage.setItem('god-mode', false)
if (localStorage.getItem('god-mode') == true) {
  canvas.width = document.body.clientWidth;
  canvas.height = document.body.clientHeight;
  game.start();
}

$(function () {
  $('.start-game-btn').on('click', function () {
    if (gameBtnTimeout)
      clearTimeout(gameBtnTimeout);
    gameBtnTimeout = setTimeout(function () {
      const body = document.querySelector('body')
      body.requestFullscreen()

      canvas.width = document.body.clientWidth;
      canvas.height = document.body.clientHeight;

      game.start();
    }, 1000);
  });
});