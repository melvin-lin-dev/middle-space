class Event {
    shoot(s) {
        if (game.pause === -1) {
            game.SHOOT = s;
            if (game.SHOOT && !game.player.shooting) {
                game.player.shoot()
            }
            game.player.shooting = s
        }
    }

    pause() {
        game.pause = -game.pause;
    }

    sound() {
        if (game.volume)
            game.volume = 0;
        else
            game.volume = 1;
    }

    fontPlus() {
        let size = parseInt($('body').css('font-size'));
        size += 1;
        $('body').css('font-size', size + 'px');
    }

    fontMin() {
        let size = parseInt($('body').css('font-size'));
        size -= 1;
        $('body').css('font-size', size + 'px');
    }

    hideExcept(id) {
        $('#instructions').addClass('hide');
        $('#scoreForm').addClass('hide');
        $('#gameBoard').addClass('hide');
        $('#ranking').addClass('hide');

        $(id).removeClass('hide');

    }

    showCanvas(s) {
        if (s)
            $('canvas').removeClass('opacity-5');
        else
            $('canvas').addClass('opacity-5');
    }
}

let event = new Event();

//  KeyDown Event

window.addEventListener('keydown', function (e) {
    let keycode = e.keyCode;

    switch (keycode) {
        case 32:
            event.shoot(1);
            break;
    }
});

//  KeyUp Event

window.addEventListener('keyup', function (e) {
    let keycode = e.keyCode;

    switch (keycode) {
        case 32:
            event.shoot(0);
            break;
        case 80:
            event.pause();
            break;
    }
});

//  Touch Function

$(document).on('touchstart', function (e) {
    if ($(e.target).hasClass('game-shoot')) {
        event.shoot(1)
    }
})
//     .on('mousedown', function (e) {
//     if ($(e.target).hasClass('game-shoot')) {
//         event.shoot(1)
//     }
// })


$(document).on('touchend', function (e) {
    if (game.player) {
        game.player.speedX = 0
        game.player.speedY = 0
        event.shoot(0)
    }
})

function moveJoystick(data) {
    let zoneJoystick = document.getElementById('zone_joystick')

    if (data && data.position) {
        let gameControl = {
            left: $(zoneJoystick).offset().left,
            top: $(zoneJoystick).offset().top,
            width: $(zoneJoystick).width(),
            height: $(zoneJoystick).height(),
        }

        let touch = data.position

        let x = touch.x - gameControl.left
        let y = touch.y - gameControl.top

        let moveX = x - gameControl.width / 2
        let moveY = y - gameControl.height / 2

        game.player.speedX = moveX / 6
        game.player.speedY = moveY / 6
    }
}

//  Button Trigger

$('.pause').on('click', function () {
    event.pause();
});

$('.sound').on('click', function () {
    event.sound();
});

//  Score Form Submit

$('[name="name"]').keyup(function () {
    if ($(this).val())
        $('.continue-btn').prop('disabled', false);
    else
        $('.continue-btn').prop('disabled', true);
});

$('#scoreForm').submit(function (e) {
    e.preventDefault();

    let data = JSON.parse(localStorage.getItem('star-battle')) || []

    data.push({
        name: $('[name="name"]').val(),
        score: game.stats.score,
        time: game.stats.time,
    })

    localStorage.setItem('star-battle', JSON.stringify(data))

    $('[name="name"]').val('');
    $('.continue-btn').prop('disabled', true);

    data.sort(function (a, b) {
        return b.time - a.time;
    });
    data.sort(function (a, b) {
        return b.score - a.score;
    });

    $('.table-rank tbody').html('');

    let samePos = 0;

    for (let key in data) {
        let item = data[key];

        if (parseInt(key) > 0) {
            let prevItem = data[parseInt(key) - 1];
            if (prevItem.score === item.score && prevItem.time === item.time) {
                samePos++;
            } else {
                samePos = 0;
            }
        }

        $('.table-rank tbody').append('\n' +
            '        <tr>\n' +
            '          <td>' + (parseInt(key) + 1 - samePos) + '</td>\n' +
            '          <td>' + item.name + '</td>\n' +
            '          <td>' + item.score + '</td>\n' +
            '          <td>' + item.time + '</td>\n' +
            '        </tr>');

    }

    event.hideExcept('#ranking');
});