class Shop {
    constructor() {
        this.menus = [
            {
                name: 'Stats',
                type: 'stats',
                image: imageAssets['stats.png'],
                data: [
                    {
                        name: 'Fuel',
                        type: 'fuel',
                        image: this.loadShopImage('fuel.png'),
                        description: 'Ship HP',
                        cost: 200
                    },
                    {
                        name: 'Bullet',
                        type: 'bullet',
                        image: this.loadShopImage('bullet.png'),
                        description: 'Ship HP',
                        cost: 200
                    }
                ]
            },
            {
                name: 'Bullet',
                type: 'bullet',
                image: imageAssets['bullet.png'],
                data: [
                    {
                        name: 'Fuel',
                        type: 'fuel',
                        image: imageAssets['fuel.png'],
                        description: 'Ship HP',
                        cost: 200
                    }
                ]
            }
        ];

        // this.data = [
        //     {
        //         name: 'Fuel',
        //         type: 'fuel',
        //         image: imageAssets['fuel.png'],
        //         description: 'Ship HP',
        //         cost: 200
        //     },
        //     {
        //         name: 'Bullet',
        //         type: 'bullet',
        //         image: imageAssets['bullet.png'],
        //         description: 'Weapon',
        //         cost: 300
        //     },
        // ];
    }

    displayData(side = 'top', menu = '', el = '') {
        let contentMenu = $(`.menu.${side} .content-menu`);
        if(side === 'bottom') {
            $('.shop-container .content-menu .active').removeClass('active');
            el.classList.add('active');
            $('.menu.bottom').addClass('active');
        }
        else if(side === 'top') this.setUpgradeBar();
        contentMenu.html('');

        let list = side === 'top' ? this.menus : menu.data;

        let _self = this;

        list.forEach(menu => {
            let type = document.createElement('div');
            if(side === 'top') type.onclick = function() {_self.displayData('bottom', menu, this)};

            let name = document.createElement('span');
            name.innerHTML = menu.name;

            let div = document.createElement('div');

            contentMenu.append(type);
            type.appendChild(name);
            type.appendChild(div);
            div.appendChild(menu.image);

            if(side === 'bottom'){
                let buyButton = document.createElement('button');
                buyButton.innerHTML = menu.cost;
                buyButton.value = menu.cost;
                buyButton.className = 'btn';
                buyButton.onclick = (e) => { this.upgradeShip(e.target, menu) };
                type.appendChild(buyButton);
            }
        })
    }

    loadShopImage(imageName) {
        let newImage = new Image();
        newImage.src = imageAssets[imageName].src;
        return newImage;
    }

    upgradeShip(button, data) {
        let currentUpgrade = game.player.upgrade[data.type];

        if(currentUpgrade.upgradeLevel < currentUpgrade.maxUpgrade && game.stats.coins >= button.value){
            game.stats.coins -= button.value;
            currentUpgrade.upgradeLevel++;
            game.player.stats[data.type] += currentUpgrade.value;

            let innerHTML = '';

            if(currentUpgrade.upgradeLevel === currentUpgrade.maxUpgrade){
                innerHTML = 'MAXED';
            }else{
                innerHTML = data.cost  * (currentUpgrade.upgradeLevel + 1)
            }

            button.innerHTML = innerHTML;
            this.setUpgradeBar(data.type);

            game.renderText();

            let kachingSound = new Audio('./sound/kaching.mp3');
            kachingSound.play();

            let effect = document.createElement('img');
            effect.src = './assets/coin.png';
            $('#shop .bought-effects').append(effect);

            setTimeout(() => {
                effect.remove();
            }, 1400);
        }else if(game.stats.coins < button.value){
            $('#shop .notification').addClass('active');

            setTimeout(() => {
                $('#shop .notification').removeClass('active');
            }, 1000);
        }
    }

    setUpgradeBar(type = ''){
        if(!type){
            let stats = $('.shop-container .stats');
            stats.html('');

            for(let type in game.player.upgrade){
                let currentUpgrade = game.player.upgrade[type];

                let stat = document.createElement('div');
                stat.id = `stat-${type}`;

                let name = document.createElement('span');
                name.innerHTML = type.toUpperCase() + ` (${currentUpgrade.upgradeLevel})`;

                let progressBar = document.createElement('div');
                progressBar.className = 'progress-bar';

                let progressBarDiv = document.createElement('div');

                stats.append(stat);
                stat.appendChild(name);
                stat.appendChild(progressBar);
                progressBar.appendChild(progressBarDiv);

                progressBarDiv.style.width = currentUpgrade.upgradeLevel / currentUpgrade.maxUpgrade * 100 + '%';
            }
        }else{
            let currentUpgrade = game.player.upgrade[type];
            $(`#shop #stat-${type} span`).html(`${type.toUpperCase()} (${currentUpgrade.upgradeLevel})`);
            $(`#shop #stat-${type} .progress-bar > div`).css('width', currentUpgrade.upgradeLevel / currentUpgrade.maxUpgrade * 100 + '%');
        }
    }
}