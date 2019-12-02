class Shop {
    constructor() {
        this.data = [
            {
                name: 'Fuel',
                type: 'fuel',
                image: imageAssets['fuel.png'],
                description: 'bbbbb',
                cost: 200
            }
        ]
    }

    displayData() {
        this.data.forEach(data => {
            let tbody = document.querySelector('#shop table tbody');

            let row = document.createElement('tr');

            tbody.appendChild(row);

            let td1 = document.createElement('td');
            let h3 = document.createElement('h3');
            h3.innerHTML = data.name;

            let td2 = document.createElement('td');
            let progressBar = document.createElement('div');
            let progressBarDiv = document.createElement('div');
            let p = document.createElement('p');
            progressBar.className = 'progress-bar';
            this.setUpgradeBar(data.type, progressBarDiv);
            p.innerHTML = data.description;

            let td3 = document.createElement('td');
            let button = document.createElement('button');
            button.className = 'btn upgrade';
            button.value = data.cost * (game.player.upgrade[data.type].upgradeLevel + 1);
            button.innerHTML = `Upgrade (${button.value})`;
            button.onclick = (e) => { this.upgradeShip(e.target, data, progressBarDiv) };

            row.appendChild(td1);
            row.appendChild(td2);
            row.appendChild(td3);

            td1.appendChild(h3);
            td1.appendChild(data.image);

            td2.appendChild(progressBar);
            progressBar.appendChild(progressBarDiv);
            td2.appendChild(p);

            td3.appendChild(button);
        })
    }

    upgradeShip(button, data, progressBarDiv) {
        let currentUpgrade = game.player.upgrade[data.type];

        if(currentUpgrade.upgradeLevel < currentUpgrade.maxUpgrade && game.stats.coins >= button.value){
            game.stats.coins -= button.value;
            currentUpgrade.upgradeLevel++;
            game.player.stats[data.type] += currentUpgrade.value;
            let innerHTML = '';
            if(currentUpgrade.upgradeLevel === currentUpgrade.maxUpgrade){
                innerHTML = 'MAXED';
            }else{
                innerHTML = `Upgrade (${data.cost  * (currentUpgrade.upgradeLevel + 1)})`
            }
            button.innerHTML = innerHTML;
            this.setUpgradeBar(data.type, progressBarDiv);
        }else if(game.stats.coins < button.value){
            $('#shop .notification').addClass('active');

            setTimeout(() => {
                $('#shop .notification').removeClass('active');
            }, 1000);
        }
    }

    setUpgradeBar(type, progressBarDiv){
        let currentUpgrade = game.player.upgrade[type];
        progressBarDiv.style.width = currentUpgrade.upgradeLevel / currentUpgrade.maxUpgrade * 100 + '%';
        progressBarDiv.innerHTML = `${currentUpgrade.upgradeLevel} (${game.player.stats[type]})`;

    }
}