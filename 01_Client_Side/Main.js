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
//     game.stats.coins =9999999;
//     game.stats.shopTime = 0;
//     game.shopShip.shopTimeDefault = 0;
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

            game.start();
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

let is_animating = false;

$('.instruction-nav').on('click', function () {
    if (!is_animating) {
        is_animating = true;
        let activeInstruction = $('.instruction-slide.active');
        let currentNav = parseInt(activeInstruction.data('slide'));

        let to = parseInt($(this).data('to'));

        currentNav += to;

        let nextInstruction;

        if (currentNav < 1) {
            nextInstruction = $($('.instruction-slide')[$('.instruction-slide').length - 1]).addClass('active')
        } else {
            nextInstruction = $($(`.instruction-slide[data-slide="${currentNav}"]`)).length ? $($(`.instruction-slide[data-slide="${currentNav}"]`)) : $($(`.instruction-slide[data-slide="1"]`));
        }

        nextInstruction.addClass('active');

        if (to == 1) {
            activeInstruction.addClass('fade-out-right');
            nextInstruction.addClass('fade-in-right');
        } else {
            activeInstruction.addClass('fade-out-left');
            nextInstruction.addClass('fade-in-left');
        }

        setTimeout(() => {
            activeInstruction.removeClass('active').removeClass(function (index, className) {
                return (className.match(/fade-(.*)/))[0]
            });

            nextInstruction.removeClass(function (index, className) {
                return (className.match(/fade-(.*)/))[0]
            });
            is_animating = false;
        }, 1000);
    }
});