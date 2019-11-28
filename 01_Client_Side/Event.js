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

//  Arrow Hover Function

$('.arrow-left').hover(function () {
  event.goLeft(1);
}, function () {
  event.goLeft(0);
});

$('.arrow-right').hover(function () {
  event.goRight(1);
}, function () {
  event.goRight(0);
});

$('.arrow-top').hover(function () {
  event.goTop(1);
}, function () {
  event.goTop(0);
});

$('.arrow-bottom').hover(function () {
  event.goBottom(1);
}, function () {
  event.goBottom(0);
});

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

  console.log(123)

});