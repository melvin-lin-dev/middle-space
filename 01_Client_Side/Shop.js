class Shop {
    constructor() {
        this.menus = [
            {
                name: 'Stats',
                type: 'stats',
                menuType: 'upgrade',
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
                menuType: 'equipment',
                image: imageAssets['bullet.png'],
                data: [
                    {
                        name: 'Original',
                        type: 'original',
                        image: this.loadShopImage('bullet.png'),
                        description: 'Original Bullet',
                        cost: 0,
                        equipmentType: 1,
                        owned: true
                    },
                    {
                        name: 'Rocket',
                        type: 'rocket',
                        image: this.loadShopImage('rocket.png'),
                        description: 'Rocket',
                        cost: 400,
                        equipmentType: 2,
                        owned: false
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

    displayData(side = 'top', parentMenu = '', el = '') {
        let contentMenu = $(`.menu.${side} .content-menu`);
        if (side === 'bottom') {

            $('.shop-container .content-menu .active').removeClass('active');
            el.classList.add('active');
            $('.menu.bottom').addClass('active');
            $('.menu.bottom').prop('id', 'menu-'+parentMenu.menuType);
        }
        else if (side === 'top') this.setUpgradeBar();
        contentMenu.html('');

        let list = side === 'top' ? this.menus : parentMenu.data;

        let _self = this;

        list.forEach(menu => {
            let type = document.createElement('div');
            if (side === 'top') type.onclick = function () {
                _self.displayData('bottom', menu, this)
            };

            let name = document.createElement('span');
            name.innerHTML = menu.name;

            let div = document.createElement('div');

            contentMenu.append(type);
            type.appendChild(name);
            type.appendChild(div);
            div.appendChild(menu.image);

            if (side === 'bottom') {
                let currentUpgrade = game.player.upgrade[menu.type];
                let buyButton = document.createElement('button');;
                buyButton.value = menu.cost;
                if(parentMenu.menuType === 'upgrade'){
                    buyButton.innerHTML = currentUpgrade.upgradeLevel === currentUpgrade.maxUpgrade ? 'MAXED' : menu.cost * (currentUpgrade.upgradeLevel + 1);
                    buyButton.value *= currentUpgrade.upgradeLevel + 1;
                }else if(parentMenu.menuType === 'equipment'){
                    buyButton.innerHTML = menu.owned ? 'EQUIP' : 'BUY';
                    if(game.player.bulletType === menu.equipmentType){
                        buyButton.innerHTML = 'EQUIPPED';
                    }
                }
                buyButton.className = `btn`;
                buyButton.onclick = (e) => {
                    this.checkMenuType(e.target, parentMenu.menuType, menu);
                };
                type.appendChild(buyButton);
            }
        })
    }

    checkMenuType(button, parentMenuType, menu){
        if(game.stats.coins >= button.value){
            let currentUpgrade = game.player.upgrade[menu.type];

            if((parentMenuType === 'equipment' && !menu.owned) || (parentMenuType === 'upgrade' && currentUpgrade.upgradeLevel < currentUpgrade.maxUpgrade)){
                game.stats.coins -= button.value;

                game.renderText();

                let kachingSound = new Audio('./sound/kaching.mp3');
                kachingSound.play();

                let effect = document.createElement('img');
                effect.src = './assets/coin.png';
                $('#shop .bought-effects').append(effect);

                setTimeout(() => {
                    effect.remove();
                }, 1400);
            }

            switch(parentMenuType) {
                case 'upgrade':
                    this.upgradeShip(button, menu, currentUpgrade);
                    break;
                case 'equipment':
                    this.buyEquipment(button, menu, currentUpgrade, parentMenuType);
                    break;
            }
        }else{
            $('#shop .notification').addClass('active');

            setTimeout(() => {
                $('#shop .notification').removeClass('active');
            }, 1000);
        }
    }

    loadShopImage(imageName) {
        let newImage = new Image();
        newImage.src = imageAssets[imageName].src;
        return newImage;
    }

    upgradeShip(button, menu, currentUpgrade) {
        if (currentUpgrade.upgradeLevel < currentUpgrade.maxUpgrade) {
            currentUpgrade.upgradeLevel++;
            game.player.stats[menu.type] += currentUpgrade.value;

            let innerHTML = '';

            if (currentUpgrade.upgradeLevel === currentUpgrade.maxUpgrade) {
                innerHTML = 'MAXED';
            } else {
                innerHTML = menu.cost * (currentUpgrade.upgradeLevel + 1)
            }

            button.value = menu.cost * (currentUpgrade.upgradeLevel + 1);

            button.innerHTML = innerHTML;
            this.setUpgradeBar(menu.type);
        }
    }

    buyEquipment(button, menu, currentUpgrade, parentMenuType){
        if(!menu.owned){
            button.value = 0;
            menu.cost = 0;
            menu.owned = true;
        }

        $(`#menu-${parentMenuType} button[value=0]`).html('EQUIP');

        button.innerHTML = 'EQUIPPED';
        game.player.bulletType = menu.equipmentType;
    }

    setUpgradeBar(type = '') {
        if (!type) {
            let stats = $('.shop-container .stats');
            stats.html('');

            for (let type in game.player.upgrade) {
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
        } else {
            let currentUpgrade = game.player.upgrade[type];
            $(`#shop #stat-${type} span`).html(`${type.toUpperCase()} (${currentUpgrade.upgradeLevel})`);
            $(`#shop #stat-${type} .progress-bar > div`).css('width', currentUpgrade.upgradeLevel / currentUpgrade.maxUpgrade * 100 + '%');
        }
    }
}