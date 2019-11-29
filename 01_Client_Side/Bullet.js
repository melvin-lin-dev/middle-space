class Bullet {
    constructor(x, y, IS_LEFT = 0) {
        //  Declaring Bullet

        this.IS_LEFT = IS_LEFT;

        this.width = 40;
        this.height = 8;

        this.x = x;
        this.y = y - this.height / 2;

        this.img = imageAssets['bullet.png'];

        this.speed = 16;

        this.sound = audioAssets['shoot.mp3'];
        this.sound.volume = game.volume;
        this.sound.autoplay = true;

        this.power = 10
    }

    render() {
        //  Rendering Bullet

        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);

        if (this.IS_LEFT) {
            this.x -= this.speed;
        } else {
            this.x += this.speed;
        }
    }
}