class Level {
    constructor(level) {
        switch (level) {
            case 1:
                this.maxEnemy = 2;
                this.maxAsteroid = 3;
                break;
            case 2:
                this.maxEnemy = 3;
                this.maxAsteroid = 4;
                break;
            case 3:
                this.maxEnemy = 4;
                this.maxAsteroid = 4;
                break;
            case 4:
                this.maxEnemy = 5;
                this.maxAsteroid = 4;
                break;
            default:
                this.maxEnemy = 6;
                this.maxAsteroid = 4;
                break;
        }
    }
}