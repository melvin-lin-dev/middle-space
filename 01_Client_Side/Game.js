class Game {
  constructor() {
    this.assetUrl = './assets/';
    this.volume = 1;

    this.sound = new Audio();
    this.sound.src = './sound/background.mp3';
    this.sound.loop = true;
  }

  //  Starting Game

  start() {
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

    //  Friends

    this.friends = [];

    for (let i = 0; i < 2; i++) {
      this.friends.push(new Friend);
    }

    //  Enemies

    this.enemies = [];

    for (let i = 0; i < 3; i++) {
      this.enemies.push(new Enemy(1));
    }

    for (let i = 0; i < 2; i++) {
      this.enemies.push(new Enemy(2));
    }

    //  Player

    this.player = new Player();

    //  Fuel

    this.fuel = new Fuel();

    this.pause = -1;

    //  Declaring Stats

    this.stats = {
      time: 0,
      countTime: 0,
      score: 0,
      fuel: 15,
    };

    //  Clear Previous Game

    if (this.rendering)
      cancelAnimationFrame(this.rendering);

    this.rendering = null;

    event.hideExcept('#gameBoard');
    event.showCanvas(1);

    this.render = this.render.bind(this);
    this.render();

    let statOverlay = $('.stat-overlay')

    this.scorePosition = {
      left: statOverlay.offset().left + statOverlay.width() / 2 + 10,
      top: 20
    }
    // while (item) {
    //   console.log($(item).offset())
    //   top += item.offsetTop || 0;
    //   left += item.offsetLeft || 0;
    //   item = item.offsetParent;
    //   // item = item.parentElement
    // }

  }

  // Rendering Game

  render() {
    if (this.pause === -1) {
      this.sound.volume = this.volume;
      this.sound.onload = function () {
        this.sound.play()
      }

      let self = this;

      this.animateBackground();

      //  Clearing Canvas

      ctx.clearRect(0, 0, canvas.width, canvas.height);


      //  Rendering Planets

      this.planets.forEach(function (planet) {
        planet.render();
      });

      //  Rendering Friend

      this.friends.forEach(function (friend) {
        friend.render();

        if (self.checkCollision(friend, self.player)) {
          self.planeCollided(friend);
        }
      });

      //  Rendering Enemy

      this.enemies.forEach(function (enemy) {
        enemy.bullets.forEach(function (bullet, key) {
          bullet.render();

          if (self.checkCollision(bullet, self.player)) {
            enemy.bullets.splice(key, 1);
            self.planeCollided();
          }
        });

        enemy.render();

        if (self.checkCollision(enemy, self.player)) {
          self.planeCollided(enemy);
        }
      });

      //  Rendering Fuel

      if (this.fuel.status) {
        this.fuel.render();

        if (this.checkCollision(this.fuel, this.player)) {
          this.stats.fuel += 15;
          this.fuel.generateLocation();
        }
      }

      //  Rendering Player's Bullets

      this.player.bullets.forEach(function (bullet, key) {
        bullet.render();

        if (bullet.x > canvas.width) {
          self.player.bullets.splice(key, 1);
        } else if (bullet.x < canvas.width) {
          self.enemies.forEach(function (enemy) {
            if (self.checkCollision(bullet, enemy)) {
              self.player.bullets.splice(key, 1);
              self.collided(enemy);
            }
          });
          self.friends.forEach(function (friend) {
            if (self.checkCollision(bullet, friend)) {
              self.player.bullets.splice(key, 1);
              self.collided(friend);
            }
          });
        }
      });

      //  Rendering Player

      this.player.render();

      //  Rendering Particles

      this.particles.forEach(function (particle, key) {
        particle.render();

        if (particle.opacity <= 0)
          self.particles.splice(key, 1);
      });

      //  Count Time

      this.countTime();
      this.renderText();

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

      this.particles.push(new Particle(obj.x + obj.width / 2, obj.y + obj.height / 2));

      obj.sound.volume = this.volume;
      obj.sound.play();
      obj.generateLocation();
      this.stats.score += obj.score;
    }

    this.player.sound.volume = this.volume;
    this.player.sound.play();
    $('#canvas').addClass('animate-canvas');

    if (this.animateCanvas)
      clearTimeout(this.animateCanvas);

    this.animateCanvas = setTimeout(function () {
      $('#canvas').removeClass('animate-canvas');
    }, 1000);

    this.stats.fuel -= 15;
  }

  collided(obj) {
    // Handle Collided Object
    obj.life--;
    if (obj.life <= 0) {
      this.particles.push(new Particle(obj.x + obj.width / 2, obj.y + obj.height / 2, obj.score));
      console.log(this.particles)
      obj.sound.volume = this.volume;
      obj.sound.play();
      this.stats.score += obj.score;
      obj.generateLocation();
    }
  }

  checkCollision(a, b) {
    // Checking Collision
    if (a.x <= b.x + b.width &&
      a.x + a.width >= b.x &&
      a.y <= b.y + b.height &&
      a.y + a.height >= b.y) {
      return 1;
    }

    return 0;
  }

  renderText() {
    //  Rendering Stats

    if (this.stats.fuel > 30)
      this.stats.fuel = 30;
    if (this.stats.fuel < 0)
      this.stats.fuel = 0;

    $('.score-text').html(this.stats.score);
    $('.time-text').html(this.stats.time);
    $('#fuel').html(this.stats.fuel).css('width', (this.stats.fuel / 30 * 100) + '%');
  }

  countTime() {
    //  Counting Time

    let stats = this.stats;

    stats.countTime++;

    if (stats.countTime % 60 === 0) {
      stats.time++;
      stats.fuel--;
    }
  }

  animateBackground() {
    //  Animating Background

    $('canvas').css('background-position', this.backgroundPosition + 'px');

    this.backgroundPosition--;
  }

  // Get Assets
  getAsset(url) {
    return this.assetUrl + url;
  }

  //  Game Over

  over() {
    if (!localStorage.getItem('god-mode')) {
      this.sound.pause();
      this.pause = 1;
      cancelAnimationFrame(this.rendering);

      event.hideExcept('#scoreForm');
      event.showCanvas(0);
    }
  }
}