//  Declaring Canvas

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

//  Starting Game
let game = new Game();
let gameBtnTimeout = null;

$(function () {
  $('.start-game-btn').on('click', function () {
    if (gameBtnTimeout)
      clearTimeout(gameBtnTimeout);
    gameBtnTimeout = setTimeout(function () {
      game.start();
    }, 1000);
  });
});