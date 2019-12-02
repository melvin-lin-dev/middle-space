class Player {
    constructor() {
        //  Declaring Plane Items
        this.img = imageAssets['plane.png'];

        this.width = 65;
        this.height = 50;

        this.collision = {
            x: 10,
            width: 75,
            height: 65
        };

        this.x = 100;
        this.y = (canvas.height - this.height) / 2;

        this.speedX = 0;
        this.speedY = 0;
        // Declare Entering Zone
        this.defaultScale = 1;
        this.scale = this.defaultScale;
        this.rangeScale = .01;
        this.entering = false;
        this.shopMode = '';


        this.sound = new Audio();
        this.sound.src = './sound/destroyed.mp3';

        //  Declaring Plane's Exhaust

        this.exhaust = {
            img: imageAssets['exhaust.png'],
            width: 47,
            height: 20,
            scale: 1,
            minScale: .8,
            maxScale: 1.1,
            rangeScale: .0075,
            isScaling: 0,
            angle: 0,
            maxAngle: 15,
            minAngle: -15,
            rangeAngle: 3
        };

        if (canvas.offsetHeight > 600) {
            this.width *= 5 / 3;
            this.height *= 5 / 3;
            this.exhaust.width *= 5 / 3;
            this.exhaust.height *= 5 / 3;
        }

        //  Declaring Bullet

        this.bullets = [];

        this.shoot_delay = 500;
        this.bullet_level = 1;

        // Entering Position
        setTimeout(() => {
            let enterZoneRect = document.querySelector('.enter-zone').getBoundingClientRect();
            this.enterX = enterZoneRect.left - enterZoneRect.width / 2 - this.width / 2;
            this.enterY = enterZoneRect.top - enterZoneRect.height / 2 - this.height / 2;
        });

        this.shooting = false;
        this.do_shoot = null;
        this.shoot_timer = null;
        this.last_shoot = null;

        // Upgrade

        this.stats = {
            fuel: 30
        };

        this.upgrade = {
            fuel: {
                maxUpgrade: 10,
                upgradeLevel: 0,
                value: 20
            }
        };
    }

    render() {
        //  Animate
        this.animate();
        //  Movement
        this.movement();

        //  Rendering Exhaust

        let exhaust = this.exhaust;

        let exhaustWidth = exhaust.width * exhaust.scale * this.scale;
        let exhaustHeight = exhaust.height * exhaust.scale * this.scale;
        let exhaustX = this.x - exhaustWidth / 2 * this.scale + exhaust.width - exhaustWidth;
        let exhaustY = this.y + (this.height - exhaustHeight) / 2;

        ctx.save();
        ctx.translate(exhaustX + exhaustWidth, exhaustY + exhaustHeight / 2);
        ctx.rotate(exhaust.angle * Math.PI / 180);
        ctx.drawImage(exhaust.img, -exhaustWidth, -exhaustHeight / 2, exhaustWidth, exhaustHeight);
        ctx.restore();

        //  Rendering Plane

        let playerWidth = this.width * this.scale;
        let playerHeight = this.height * this.scale;
        let playerX = this.x - 22 * (this.defaultScale - this.scale) + this.width - playerWidth;
        let playerY = this.y + (this.height - playerHeight) / 2;

        ctx.drawImage(this.img, playerX, playerY, playerWidth, playerHeight);

        if ((this.shopMode === 'entering' && this.scale > 0) || (this.shopMode === 'leaving' && this.scale < this.defaultScale)) {
            this[this.shopMode + 'Shop']();
        }
        //  Collision for later
        // this.collision.x = this.x + 5
        // this.collision.y = this.y + (this.height - this.collision.height) / 2
        //
        // ctx.beginPath()
        // ctx.rect(this.collision.x, this.collision.y, this.collision.width, this.collision.height)
        // ctx.fillStyle = "#f00"
        // ctx.fill()
        // ctx.closePath()

        if (!this.shooting && this.do_shoot) {
            clearInterval(this.do_shoot)
            clearTimeout(this.shoot_timer)
        }
    }

    animate() {
        //  Plane Animation

        let exhaust = this.exhaust;

        if (this.speedX == 0) {
            if (exhaust.isScaling) {
                exhaust.scale += exhaust.rangeScale;
            } else {
                exhaust.scale -= exhaust.rangeScale;
            }
        } else {
            if (this.speedX > 0 && exhaust.scale <= exhaust.maxScale) {
                exhaust.scale += exhaust.rangeScale;
            } else if (this.speedX < 0 && exhaust.scale >= exhaust.minScale) {
                exhaust.scale -= exhaust.rangeScale;
            }
        }

        if (exhaust.scale <= exhaust.minScale) {
            exhaust.isScaling = 1;
        }

        if (exhaust.scale >= exhaust.maxScale) {
            exhaust.isScaling = 0;
        }
    }

    movement() {
        //  Plane Movement
        let exhaust = this.exhaust;

        if (this.shopMode) {
            this.x += this.scale * (this.shopMode === 'leaving' ? -1 : 1);
            return false;
        }

        this.x += this.speedX;
        this.y += this.speedY;

        if (this.speedY < -2) {
            if (exhaust.angle > exhaust.minAngle) {
                exhaust.angle -= exhaust.rangeAngle;
            }
        } else if (this.speedY > 2) {
            if (exhaust.angle < exhaust.maxAngle) {
                exhaust.angle += exhaust.rangeAngle;
            }
        } else {
            if (exhaust.angle > 0)
                exhaust.angle -= exhaust.rangeAngle;
            if (exhaust.angle < 0)
                exhaust.angle += exhaust.rangeAngle;
        }

        if (this.x < 0)
            this.x = 0;
        if (this.x + this.width > canvas.width)
            this.x = canvas.width - this.width;
        if (this.y < 0)
            this.y = 0;
        if (this.y + this.height > canvas.height)
            this.y = canvas.height - this.height
    }

    shoot() {
        this.triggerBullet()

        this.do_shoot = setInterval(() => {
            this.triggerBullet()
        }, this.shoot_delay)
    }

    triggerBullet() {
        let ms = 0

        if (this.last_shoot) {
            let next_shoot = new Date()

            ms = this.shoot_delay - ((next_shoot.getTime() - this.last_shoot.getTime()))

            ms = ms > this.shoot_delay ? this.shoot_delay : ms
        }

        this.shoot_timer = setTimeout(() => {
            this.bullets.push(new Bullet(this.x + this.width / 2, this.y + this.height / 2, 0, this.bullet_level));
            this.last_shoot = new Date();
        }, ms)
    }

    setEnteringShop() {
        this.x = this.enterX;
        this.y = this.enterY;

        this.entering = true;
        this.shopMode = 'entering';
    }

    enteringShop() {
        this.scale -= this.rangeScale;

        if (this.scale <= 0) {
            game.shopShip.shopping();
        }
    }

    leavingShop() {
        this.scale += this.rangeScale;

        if (this.scale >= this.defaultScale) {
            this.entering = false;
            this.shopMode = '';
            game.shopShip.leave();
        }
    }

    upgradeBulletDelay(delay) {
        this.shoot_delay = delay;
    }

    upgradeBulletLevel(level) {
        this.bullet_level = level
    }
}