class Bullet {
    constructor(x, y, IS_LEFT = 0, bullet_level = 0) {
        //  Declaring Bullet

        this.IS_LEFT = IS_LEFT;

        this.width = 30;
        this.height = 6;

        if (canvas.offsetHeight > 600) {
            this.width *= 5 / 3;
            this.height *= 5 / 3;
        }

        this.x = x;
        this.y = y - this.height / 2;

        this.img = imageAssets['bullet.png'];

        this.speed = 16;

        if (canvas.offsetWidth > 1000) {
            this.speed *= 5 / 3;
        }

        this.sound = new Audio();
        this.sound.src = audioAssets['shoot.mp3'].src;
        this.sound.volume = game.volume;
        this.sound.autoplay = true;
        this.sound.play();

        this.power = 10;

        switch (bullet_level) {
            case 2:
                this.power = 30;
                break;
            default:
                this.power = 10;
                break;
        }
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