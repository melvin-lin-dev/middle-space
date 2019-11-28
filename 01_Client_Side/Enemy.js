class Enemy {
  constructor(type) {
    this.img = new Image();

    this.type = type;

    switch (type) {
      case 1:
        this.img.src = game.getAsset('ship_3.png');
        this.width = 75;
        this.height = 75;
        this.speed = 3.2;
        this.score = 5;
        break;
      case 2:
        this.img.src = game.getAsset('asteroid.png');
        this.width = 95;
        this.height = 95;
        this.speed = 3.6;
        this.score = 10;
        break;
    }

    this.sound = new Audio();
    this.sound.src = './sound/destroyed.mp3';

    this.generateLocation();

    this.bullets = [];
  }

  render(x, y) {
    if (this.type === 1) {
      if (game.stats.countTime % 5 === 0) {
        this.frame++;

        if (this.frame >= 3)
          this.frame = 0;
      }

      if (this.x + this.width < canvas.width - 100 && this.IS_SHOOT) {
        this.bullets.push(new Bullet(this.x + 20, this.y + this.height / 2, 1));
        this.IS_SHOOT = 0;
      }

      ctx.drawImage(this.img, 80 * this.frame, 0, 80, 80, this.x, this.y, this.width, this.height);
    } else if (this.type === 2) {
      ctx.save();
      ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
      ctx.rotate(this.angle * Math.PI / 180);
      if (this.life === 2)
        this.frame = 0;
      else
        this.frame = 1;

      ctx.drawImage(this.img, this.frame * 512, 0, 512, 512, -this.width / 2, -this.height / 2, this.width, this.height);
      ctx.restore();

      this.angle += 2;
    }

    if (this.x < -500)
      this.generateLocation();

    this.x -= this.speed;
  }

  generateLocation() {
    // Generate Friend Location
    this.x = Math.floor(Math.random() * canvas.width) + canvas.width;
    this.y = Math.floor(Math.random() * (canvas.height - this.height / 2)) + this.height;
    this.frame = 0;

    if (this.type === 1) {
      this.life = 1;
      this.IS_SHOOT = 1;
    } else if (this.type === 2) {
      this.angle = 0;
      this.life = 2;
    }
  }

}