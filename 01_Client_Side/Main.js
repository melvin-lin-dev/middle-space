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
        gameBtnTimeout = setTimeout(async function () {
            const body = document.querySelector('body')
            if (body.requestFullscreen) {
                await body.requestFullscreen()
            } else if (body.webkitRequestFullscreen) {
                await body.webkitRequestFullscreen()
            } else if (body.mozRequestFullscreen) {
                await body.mozRequestFullscreen()
            } else if (body.msRequestFullscreen) {
                await body.msRequestFullscreen()
            }

            setTimeout(function () {
                game.start();
            }, 1000)
        }, 1000);
    });
});

document.onfullscreenchange = function (e) {
    if (document.fullscreen) {
        canvas.width = document.body.clientWidth;
        canvas.height = document.body.clientHeight;

        try {
          screen.orientation.lock("landscape")
        } catch (e) {

        }
    } else {
        game.sound.pause()
        cancelAnimationFrame(game.rendering);
        event.hideExcept('#instructions');
        event.showCanvas(0);
    }
}

function resetHeight() {
    let gameBoard = document.getElementById('gameBoard')
    // reset the body height to that of the inner browser
    canvas.width = document.body.clientWidth;
    canvas.height = document.body.clientHeight;
    // document.body.style.height = window.innerHeight + "px";
    $('.full-height').css('height', window.innerHeight + 'px')
}

// reset the height whenever the window's resized
window.addEventListener("resize", resetHeight);
// called to initially set the height.
resetHeight();