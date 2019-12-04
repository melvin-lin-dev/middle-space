class Boss {
    constructor() {
        this.img = new Image();

        this.img = imageAssets['enemy4.svg'];
        this.width = canvas.offsetHeight - 100;
        this.height = canvas.offsetHeight - 100;

        this.boss = true;

        this.sound = new Audio();
        this.sound.src = './sound/destroyed.mp3';

        this.x = canvas.offsetWidth - this.width * 2 / 3;
        this.y = 50;

        this.minY = this.y - 10;
        this.maxY = this.y + 10;

        this.speed = 1;
        this.move_up = false;

        this.bullets = [];

        this.frame = 0;

        this.maxLife = 1000;
        this.life = this.maxLife;

        this.collision = {
            x: this.x + this.width / 2,
            y: this.y + 25,
            width: this.width - 50,
            height: this.height - 50,
        };

        $('#bossHealth').removeClass('hide');

        this.lasers = [];
        this.is_laser_out = false;
        this.laser_go_out = false;

    }

    render() {
        if (game.stats.countTime % (60 * 10) === 0 && !this.lasers.length) {
            this.is_laser_out = false;
            this.laser_go_out = false;
            this.lasers.push({
                x: canvas.offsetWidth,
                y: game.player.y - 15,
                height: game.player.height + 30,
                width: canvas.offsetWidth + 100,
                opacity: .5,
                is_background: true,
            });
        }

        this.collision = {
            x: this.x + this.width / 2,
            y: this.y + 25,
            width: this.width - 50,
            height: this.height - 50,
        };

        let laser = this.drawLaser();

        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);

        this.movement();

        $('#bossHp').css({
            width: ((this.life / this.maxLife) * 100) + '%'
        })
    }

    drawLaser() {
        let all_out = true;

        if (this.lasers.length) {
            for (let i = 0; i < this.lasers.length; i++) {
                let laser = this.lasers[i];

                if (this.laser_go_out) {
                    laser.x -= 100;

                    if (laser.x + laser.width < 0) {
                        all_out = true;
                    } else {
                        all_out = false;
                    }
                }

                ctx.save();
                ctx.beginPath();
                ctx.fillStyle = "#75f0f0";
                ctx.globalAlpha = laser.opacity;
                ctx.fillRect(laser.x, laser.y, laser.width, laser.height);
                ctx.closePath();
                ctx.restore();

                if (!laser.is_background && game.checkCollision(game.player, laser)) {
                    game.planeCollided();
                }

                if (laser.x > 0) {
                    laser.x -= 50;
                } else if (this.is_laser_out === false) {
                    this.is_laser_out = true;
                    setTimeout(() => {
                        this.lasers.push({
                            x: canvas.offsetWidth,
                            y: laser.y,
                            height: laser.height,
                            width: canvas.offsetWidth,
                            opacity: 1,
                        });
                    }, 500);
                } else if (this.lasers.length === 2 && this.lasers[1].x <= 0) {
                    setTimeout(() => {
                        this.laser_go_out = true;
                    }, 2000);
                }
            }
        }

        if (this.laser_go_out && all_out) {
            this.lasers = [];
        }
    }

    movement() {
        if (this.move_up) {
            this.y -= this.speed;
        } else {
            this.y += this.speed;
        }

        if (this.y < this.minY) this.move_up = false;
        if (this.y > this.maxY) this.move_up = true;
    }
}