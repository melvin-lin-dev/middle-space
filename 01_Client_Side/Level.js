class Level {
    constructor(level) {
        switch (level) {
            case 1:
                this.maxEnemy = 4;
                this.maxAsteroid = 3;
                break;
            case 2:
                this.maxEnemy = 5;
                this.maxAsteroid = 4;
                break;
            case 3:
                this.maxEnemy = 8;
                this.maxAsteroid = 6;
                break;
            default:
                this.maxEnemy = 10;
                this.maxAsteroid = 8;
                break;
        }
    }
}