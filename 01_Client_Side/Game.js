class Game {
    constructor() {
        this.volume = localStorage.getItem('star-battle-checked') || 1;
    }

    //  Starting Game

    start(GOD_MODE = false) {
        this.GOD_MODE = GOD_MODE;

        this.sound = new Audio();
        this.sound.src = './sound/background.mp3'
        this.sound.loop = true;
        this.sound.volume = this.volume;

        //  Declaring Objects
        this.backgroundPosition = 0;

        this.animateCanvas = null;

        //  Particles

        this.particles = [];

        //  Planets

        this.planets = [];

        for (let i = 0; i < 5; i++) {
            this.planets.push(new Planet(i + 1));
        }

        //  Enemies

        this.enemies = [];

        //  Player

        this.player = new Player();

        // Shop ship

        this.shopShip = new ShopShip();

        // Shop

        this.shop = new Shop();
        this.shop.displayData();

        //  Fuel

        this.fuel = new Fuel();

        this.pause = -1;

        //  Declaring Stats

        this.stats = {
            time: 0,
            countTime: 0,
            score: 0,
            fuel: this.player.stats.fuel,
            distance: 0,
            level: 0,
            shopTime: this.shopShip.shopTimeDefault,
            coins: 9999999,
            combo: 0,
        };

        this.enemyGenerator();

        this.IS_CHANGING_LEVEL = false;

        //  Clear Previous Game

        if (this.rendering) cancelAnimationFrame(this.rendering);

        this.rendering = null;

        ev.hideExcept('#gameBoard');
        $('#zone_joystick').removeClass('hide');
        ev.showCanvas(1);

        let zoneJoystick = document.getElementById('zone_joystick');

        let joystick = nipplejs.create({
            zone: zoneJoystick,
            mode: 'static',
            position: {left: '50%', top: '50%'},
            color: 'white',
            size: 100,
        });

        joystick.on('start end', function (evt, data) {
            moveJoystick(data)
        }).on('move', function (evt, data) {
            moveJoystick(data)
        }).on('dir:up plain:up dir:left plain:left dir:down ' +
            'plain:down dir:right plain:right',
            function (evt, data) {
                moveJoystick(data)
            }
        ).on('pressure', function (evt, data) {
            moveJoystick(data)
        });

        $('#shop').css('opacity', '0');

        setTimeout(() => {
            $('#shop').css('opacity', '1');
        }, 600);

        this.render = this.render.bind(this);
        this.render();
    }

    // Rendering Game

    render() {
        if (this.pause === -1) {
            this.sound.volume = this.volume;
            this.sound.onload = () => {
                this.sound.play();
            };

            this.animateBackground();

            //  Clearing Canvas

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            //  Rendering Planets

            for (let i = 0; i < this.planets.length; i++) {
                this.planets[i].render()
            }

            //  Rendering Friend

            this.field_is_empty = true;

            //  Rendering Enemy

            for (let i = 0; i < this.enemies.length; i++) {
                let enemy = this.enemies[i];
                for (let j = 0; j < enemy.bullets.length; j++) {
                    let bullet = enemy.bullets[j];
                    bullet.render();

                    if (this.player.touchable && this.checkCollision(bullet, this.player)) {
                        enemy.bullets.splice(j, 1);
                        this.planeCollided();
                    }
                }

                enemy.render();

                if (this.player.touchable && this.checkCollision(enemy, this.player)) {
                    this.planeCollided(enemy);
                }

                if (enemy.x + enemy.width > 0) this.field_is_empty = false;
            }

            //  Rendering Fuel

            if (this.fuel.status) {
                this.fuel.render();

                if (this.checkCollision(this.fuel, this.player)) {
                    this.stats.fuel += 15;
                    this.fuel.generateLocation();
                }
            }

            //  Rendering Player's Bullets

            for (let i = 0; i < this.player.bullets.length; i++) {
                let bullet = this.player.bullets[i];
                bullet.render();

                if (bullet.x > canvas.width) {
                    this.player.bullets.splice(i, 1);
                } else if (bullet.x < canvas.width) {
                    for (let j = 0; j < this.enemies.length; j++) {
                        let enemy = this.enemies[j];
                        if (this.checkCollision(bullet, enemy)) {
                            this.player.bullets.splice(i, 1);
                            this.collided(enemy, bullet);
                        }
                    }
                }
            }

            //  Rendering Player Fire Effects

            this.player.renderFireEffects();

            //  Rendering Player

            this.player.render();

            //  Rendering Particles

            for (let i = 0; i < this.particles.length; i++) {
                let particle = this.particles[i];
                particle.render();

                if (particle.opacity <= 0) this.particles.splice(i, 1);
            }

            // Rendering Shop Ship

            this.shopShip.render();

            //  Count Time

            this.countTime();
            this.renderText();

            this.enemyGenerator();

            if (this.stats.fuel <= 0) {
                this.over();
            }
        } else {
            this.sound.pause();
        }

        //  Looping Animation
        this.rendering = requestAnimationFrame(this.render);
    }

    planeCollided(obj = null) {
        // Handle Plane Collided
        if (obj) {
            obj.life = 0;
            this.collided(obj);
        }

        game.stats.combo = 0;

        this.player.sound.volume = this.volume;
        this.player.sound.play();
        $('.collide-animation').addClass('animate-canvas');

        if (this.animateCanvas) clearTimeout(this.animateCanvas);

        this.animateCanvas = setTimeout(function () {
            $('.collide-animation').removeClass('animate-canvas');
        }, 1000);

        this.stats.fuel -= 15;
    }

    collided(obj, bullet = null) {
        // Handle Collided Object
        if (bullet) {
            obj.life -= bullet.power * game.player.stats.bullet;
            if (obj.score > 0 && obj.life <= 0) {
                game.stats.combo += bullet.power * game.player.stats.bullet;
                $('.game-combo').removeClass('animate-combo').addClass('animate-combo');
                if (this.animate_combo) clearTimeout(this.animate_combo);
                this.animate_combo = setTimeout(() => {
                    $('.game-combo').removeClass('animate-combo');
                }, 500);
                $('.total-combo').html(game.stats.combo);
            }
        } else game.stats.combo = 0;

        if (obj.life <= 0) {
            this.particles.push(new Particle(obj.x + obj.width / 2, obj.y + obj.height / 2, obj.coins, obj.score));
            obj.sound.volume = this.volume;
            obj.sound.play();
            this.stats.score += obj.score;
            this.stats.coins += obj.coins;
            obj.generateLocation();
        }
    }

    checkCollision(a, b) {
        // Checking Collision
        if (a.x <= b.x + b.width && a.x + a.width >= b.x && a.y <= b.y + b.height && a.y + a.height >= b.y) return 1;
        return 0;
    }

    renderText() {
        //  Rendering Stats
        if (this.stats.fuel > this.player.stats.fuel) this.stats.fuel = this.player.stats.fuel;
        else if (this.stats.fuel < 0) this.stats.fuel = 0;

        $('.score-text').html(this.stats.score);
        $('.coins-text').html(this.stats.coins);
        $('.time-text').html(this.stats.time);
        $('.shopTime-text').html(this.stats.shopTime);
        $('#shop .coins span').html(this.stats.coins);

        $('#fuel').html(this.stats.fuel).css('width', (this.stats.fuel / this.player.stats.fuel * 100) + '%');
    }

    countTime() {
        //  Counting Time

        let stats = this.stats;

        stats.countTime++;

        if (stats.countTime % 60 === 0) {
            stats.time++;
            stats.fuel--;
            if (stats.shopTime) stats.shopTime--;
        }
    }

    animateBackground() {
        //  Animating Background

        $('.container').css('background-position', this.backgroundPosition + 'px');

        this.backgroundPosition--;
    }

    // Get Assets
    getAsset(url) {
        return this.assetUrl + url;
    }

    //  Game Over

    over() {
        if (!this.GOD_MODE) {
            this.sound.pause();
            this.pause = 1;
            $('#zone_joystick').html('')
            cancelAnimationFrame(this.rendering);

            ev.hideExcept('#scoreForm');
            ev.showCanvas(0);
        }
    }

    // random number generators
    enemyGenerator() {
        if (this.stats.distance % 2000 === 0) {
            this.IS_CHANGING_LEVEL = true;

            if (this.IS_CHANGING_LEVEL && this.field_is_empty) {
                if (!this.level_timeout) {
                    this.level_timeout = setTimeout(() => {
                        this.stats.level += 1;

                        let level = new Level(this.stats.level);

                        this.enemies = [];

                        for (let i = 0; i < 2; i++) {
                            this.enemies.push(new Enemy(3, 0));
                        }

                        for (let i = 0; i < level.maxEnemy; i++) {
                            this.enemies.push(new Enemy(1, this.stats.level));
                        }

                        for (let i = 0; i < level.maxAsteroid; i++) {
                            this.enemies.push(new Enemy(2, this.stats.level));
                        }

                        $('.level-info').html(`<h2>Get Ready! Stage ${this.stats.level} is about to start</h2>`).addClass('popup-animation');

                        // console.log(this.enemies);

                        setTimeout(() => {
                            $('.level-info').removeClass('popup-animation');
                        }, 2000)

                        this.stats.distance += 1;
                        this.IS_CHANGING_LEVEL = false;
                        this.level_timeout = null
                    }, 1000);
                }

                this.enemies = [];
            }
        }

        if (!this.IS_CHANGING_LEVEL) {
            this.stats.distance++;
        }
    }
}