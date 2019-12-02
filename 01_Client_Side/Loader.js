let imageAssets = {};
let audioAssets = {};

function loadAssets(items, onComplete) {
    let loaded = 0;

    function onLoad() {
        loaded++;

        $('.loader-item').css('width', (loaded / items.length) * 100 + '%');

        if (loaded == items.length) {
            onComplete();
        }
    }

    for (let i = 0; i < items.length; i++) {
        let item = items[i]
        if (item.type == 'image') {
            let img = new Image();
            img.onload = onLoad;
            img.src = './assets/' + item.value;
            imageAssets[item.value] = img
        } else if (item.type == 'audio') {
            let audio = new Audio();
            audio.oncanplaythrough = onLoad;
            audio.src = './sound/' + item.value;
            audioAssets[item.value] = audio
        }
    }
}

loadAssets([
    {
        value: 'plane.png',
        type: 'image',
    },
    {
        value: 'fuel.png',
        type: 'image',
    },
    {
        value: 'bullet.png',
        type: 'image',
    },
    {
        value: 'exhaust.png',
        type: 'image',
    },
    {
        value: 'ship_2.png',
        type: 'image',
    },
    {
        value: 'ship_3.png',
        type: 'image',
    },
    {
        value: 'asteroid.png',
        type: 'image',
    },
    {
        value: '006-mars.png',
        type: 'image',
    },
    {
        value: '001-global.png',
        type: 'image',
    },
    {
        value: '012-jupiter.png',
        type: 'image',
    },
    {
        value: '009-saturn.png',
        type: 'image',
    },
    {
        value: '010-uranus.png',
        type: 'image',
    },
    {
        value: 'background.mp3',
        type: 'audio',
    },
    {
        value: 'shoot.mp3',
        type: 'audio',
    },
    {
        value: 'destroyed.mp3',
        type: 'audio',
    },
    {
        value: 'shopShip.png',
        type: 'image'
    }
], complete);

function complete() {
    $('.loader').addClass('hide')
}