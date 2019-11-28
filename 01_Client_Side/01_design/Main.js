//  Declaring Canvas

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

//  Starting Game
let game = new Game();
game.start();