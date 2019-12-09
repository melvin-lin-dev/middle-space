class Equipment{
    constructor(){
        this.stats = {
            bullet: {
                1: {
                    speed: 12,
                    power: 10,
                    shootDelay: .5
                },
                2: {
                    speed: 7,
                    power: 30,
                    shootDelay: .8
                },
                3: {
                    speed: 14,
                    power: 8,
                    shootDelay: .3
                },
                inverseStat: ['shootDelay']
            },
            exhaust: {
                1: {
                    speed: 1
                },
                2: {
                    speed: 1.2
                }
            }
        };

        this.maxStats = {
            bullet: {
                speed: 20,
                power: 50,
                shootDelay: 2
            },
            exhaust: {
                speed: 2
            }
        }
    }
}