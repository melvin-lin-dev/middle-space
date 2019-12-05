class Bullet {
    constructor(x, y, IS_LEFT = 0, bullet_level = 0, bulletType = 1) {
        //  Declaring Bullet

        this.IS_LEFT = IS_LEFT;

        let audioType = '';

        this.bulletType = bulletType;

        switch(bulletType){
            case 1:
                this.width = 30;
                this.height = 6;

                if (canvas.offsetHeight > 600) {
                    this.width *= 5 / 3;
                    this.height *= 5 / 3;
                }

                this.img = imageAssets['bullet.png'];

                this.speed = 16;

                if (canvas.offsetWidth > 1000) {
                    this.speed *= 5 / 3;
                }

                audioType = 'shoot.mp3';

                this.power = 10;

                switch (bullet_level) {
                    case 2:
                        this.power = 30;
                        break;
                    default:
                        this.power = 10;
                        break;
                }
                break;
            case 2:
                this.width = 50;
                this.height = 20;

                if (canvas.offsetHeight > 600) {
                    this.width *= 5 / 3;
                    this.height *= 5 / 3;
                }

                this.img = imageAssets['rocket.png'];

                this.speed = 7;

                if (canvas.offsetWidth > 1000) {
                    this.speed *= 5 / 3;
                }

                audioType = 'rocket.mp3';

                this.power = 30;

                switch (bullet_level) {
                    case 2:
                        this.power = 50;
                        break;
                    default:
                        this.power = 20;
                        break;
                }

                this.exhaust = {
                    width: this.width / 3,
                    height: this.height / 2,
                    scale: 1,
                    maxScale: 1.35,
                    minScale: .75,
                    isScaling: 1,
                    rangeScale: .04,
                    image: imageAssets['rocket-exhaust.png']
                };
                break;
        }

        this.x = x;
        this.y = y - this.height / 2;


        this.sound = new Audio();
        this.sound.src = audioAssets[audioType].src;
        // this.sound.volume = game.volume;
        this.sound.autoplay = true;
        this.sound.play();
    }

    render() {
        if(this.exhaust) {
            // Rendering Exhaust

            if(this.exhaust.isScaling){
                this.exhaust.scale += this.exhaust.rangeScale;

                if(this.exhaust.scale >= this.exhaust.maxScale){
                    this.exhaust.isScaling = 0;
                    this.exhaust.scale = this.exhaust.maxScale;
                }
            }else{
                this.exhaust.scale -= this.exhaust.rangeScale;

                if(this.exhaust.scale <= this.exhaust.minScale){
                    this.exhaust.isScaling = 1;
                    this.exhaust.scale = this.exhaust.minScale;
                }
            }

            let exhaustX = this.x - this.exhaust.width * this.exhaust.scale + 8;
            let exhaustY = this.y + this.height / 2 - this.exhaust.height * this.exhaust.scale / 2;
            let exhaustWidth = this.exhaust.width * this.exhaust.scale;
            let exhaustHeight = this.exhaust.height * this.exhaust.scale;
            ctx.drawImage(this.exhaust.image, exhaustX, exhaustY, exhaustWidth, exhaustHeight);
        }

        //  Rendering Bullet
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);

        if (this.IS_LEFT) {
            this.x -= this.speed;
        } else {
            this.x += this.speed;
        }

    }
}