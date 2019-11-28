//  Declaring Canvas

let canvas = document.getElementById('canvas');
canvas.width = document.body.clientWidth; //document.width is obsolete
canvas.height = document.body.clientHeight;
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