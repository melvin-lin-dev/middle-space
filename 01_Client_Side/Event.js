class Event {
  constructor() {
  }

  goLeft(s) {
    game.TO_LEFT = s;
  }

  goTop(s) {
    game.TO_TOP = s;
  }

  goRight(s) {
    game.TO_RIGHT = s;
  }

  goBottom(s) {
    game.TO_BOTTOM = s;
  }

  shoot(s) {
    if (game.pause === -1) {
      game.SHOOT = s;
      if (game.SHOOT && !game.player.IS_SHOOTING) {
        game.player.IS_SHOOTING = 1;
        game.player.shoot();
      }
      game.player.IS_SHOOTING = s;
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
    case 37:
      event.goLeft(1);
      break;
    case 38:
      event.goTop(1);
      break;
    case 39:
      event.goRight(1);
      break;
    case 40:
      event.goBottom(1);
      break;
    case 32:
      event.shoot(1);
      break;
  }
});

//  KeyUp Event

window.addEventListener('keyup', function (e) {
  let keycode = e.keyCode;

  switch (keycode) {
    case 37:
      event.goLeft(0);
      break;
    case 38:
      event.goTop(0);
      break;
    case 39:
      event.goRight(0);
      break;
    case 40:
      event.goBottom(0);
      break;
    case 32:
      event.shoot(0);
      break;
    case 80:
      event.pause();
      break;
  }
});

let control = $('.game-control')
let controlTouch = $('#gameControlTouch')

//  Touch Function

$(document).on('touchstart', function (e) {
  // let touch = e.touches[0]
  // console.log('start', touch)
  move(e)
})

$(document).on('touchmove', function (e) {
  e.preventDefault()
  // let touch = e.touches[0]
  // console.log('move', touch)
  move(e)
})


$(document).on('touchend', function (e) {
  game.player.speedX = 0
  game.player.speedY = 0
})


function move(e) {
  if ($(e.target).hasClass('game-control')) {
    let gameControl = {
      left: control.offset().left,
      top: control.offset().top,
      width: control.width(),
      height: control.height(),
    }

    let touch = e.touches[0]

    let x = touch.clientX - gameControl.left
    let y = touch.clientY - gameControl.top

    if (x < 0) {
      x = 0
    }
    if (y < 0) {
      y = 0
    }
    if (x > 100) {
      x = 100
    }
    if (y > 100) {
      y = 100
    }


    let moveX = x - gameControl.width / 2
    let moveY = y - gameControl.height / 2

    game.player.speedX = moveX / 7
    game.player.speedY = moveY / 7
  }
}

//  Button Trigger

$('.pause').on('click', function () {
  event.pause();
});

$('.sound').on('click', function () {
  event.sound();
});

$('.fontplus').on('click', function () {
  event.fontPlus();
});

$('.fontmin').on('click', function () {
  event.fontMin();
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

    if (parseInt(key) < data.length - 1) {
      let nextItem = data[parseInt(key) + 1];
      if (nextItem.score === item.score && nextItem.time === item.time) {
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