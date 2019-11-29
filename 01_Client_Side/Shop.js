class Shop {
    constructor() {
        this.data = [
            {
                image: 'shopShip.png',
                name: 'Level 1',
                description: 'aaaaa',
                cost: 100
            }, {
                image: 'shopShip.png',
                name: 'Level 2',
                description: 'bbbbb',
                cost: 200
            }, {
                image: 'shopShip.png',
                name: 'Level 3',
                description: 'ccccc',
                cost: 300
            },
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
            let img = new Image();
            img.src = `./assets/${data.image}`;

            let td2 = document.createElement('td');
            let p = document.createElement('p');
            p.innerHTML = data.description;

            let td3 = document.createElement('td');
            let button = document.createElement('button');
            button.className = 'btn upgrade';
            button.innerHTML = `Upgrade (${data.cost})`;
            button.onclick = this.upgradeShip;

            row.appendChild(td1);
            row.appendChild(td2);
            row.appendChild(td3);

            td1.appendChild(h3);
            td1.appendChild(img);
            td2.appendChild(p);
            td3.appendChild(button);
        })
    }

    upgradeShip() {
        // alert('a');
    }
}