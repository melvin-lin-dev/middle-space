//  Declaring Canvas
let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
canvas.width = document.body.clientWidth;
canvas.height = document.body.clientHeight;

//  Starting Game
let game = new Game();
let gameBtnTimeout = null;

// console.log = function() {};

// window.onload = () => { // temp
//     game.start($(this).data('god'));
//     game.volume = 0; // temp
//     game.GOD_MODE = true;
// };

$(function () {
    $('.start-game-btn').on('click', function () {
        if (gameBtnTimeout) clearTimeout(gameBtnTimeout);
        gameBtnTimeout = setTimeout(async () => {
            const body = document.querySelector('body');
            if (body.requestFullscreen) {
                await body.requestFullscreen()
            } else if (body.webkitRequestFullscreen) {
                await body.webkitRequestFullscreen()
            } else if (body.mozRequestFullscreen) {
                await body.mozRequestFullscreen()
            } else if (body.msRequestFullscreen) {
                await body.msRequestFullscreen()
            }

            setTimeout(() => {
                game.start($(this).data('god'));
            }, 1000);
        }, 0);
    });
});

document.onfullscreenchange = function (e) {
    if (document.fullscreen) {
        canvas.width = document.body.clientWidth;
        canvas.height = document.body.clientHeight;
        screen.orientation.lock("landscape");
    } else {
        game.sound.pause();
        cancelAnimationFrame(game.rendering);
        $('#zone_joystick').html('');
        ev.hideExcept('#instructions');
        ev.showCanvas(0);
    }
};

function resetHeight() {
    // reset the body height to that of the inner browser
    canvas.width = document.body.clientWidth;
    canvas.height = document.body.clientHeight;
    $('.full-height').css('height', window.innerHeight + 'px')
}

// reset the height whenever the window's resized
window.addEventListener("resize", resetHeight);
// called to initially set the height.
resetHeight();

$('.instruction-btn').on('click touchend', function () {
    $('.instructions-overlay').removeClass('hide');
    $('.main-menu').addClass('hide');
});

$('.instruction-nav').on('click', function () {
    let currentNav = parseInt($('.instruction-slide.active').data('slide'));

    let to = parseInt($(this).data('to'));

    currentNav += to;

    $('.instruction-slide.active').removeClass('active');

    if (currentNav < 1) {
        $($('.instruction-slide')[$('.instruction-slide').length - 1]).addClass('active')
        return 0;
    }

    let nextInstruction = $($(`.instruction-slide[data-slide="${currentNav}"]`)).length ? $($(`.instruction-slide[data-slide="${currentNav}"]`)) : $($(`.instruction-slide[data-slide="1"]`));

    nextInstruction.addClass('active');
});