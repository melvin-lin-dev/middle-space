class Level {
    constructor(level) {
        switch (level) {
            case 1:
                this.maxEnemy = {
                    row: 1,
                    total: 3
                };
                this.maxAsteroid = 3;
                break;
            case 2:
                this.maxEnemy = {
                    row: 1,
                    total: 5
                };
                this.maxAsteroid = 4;
                break;
            case 3:
                this.maxEnemy = {
                    row: 2,
                    total: 4
                };
                this.maxAsteroid = 4;
                break;
            case 4:
                this.maxEnemy = {
                    row: 2,
                    total: 5
                };
                this.maxAsteroid = 4;
                break;
            default:
                this.maxEnemy = {
                    row: 1,
                    total: 4
                };
                this.maxAsteroid = 4;
                break;
        }
    }
}