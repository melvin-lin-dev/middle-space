class Friend {
  constructor() {
    //  Declaring Friend

    this.img = new Image();
    this.img.src = game.getAsset('ship_2.png');

    this.width = 75;
    this.height = 75;

    this.generateLocation();

    this.speed = 4;

    this.score = -10;

    this.sound = new Audio();
    this.sound.src = './sound/destroyed.mp3';
  }

  render() {
    //  Rendering Friend

    if (game.stats.countTime % 5 === 0) {
      this.frame++;

      if (this.frame >= 3)
        this.frame = 0;
    }

    ctx.drawImage(this.img, 80.25 * this.frame, 0, 80.25, 81, this.x, this.y, this.width, this.height);

    if (this.x < -500)
      this.generateLocation();

    this.x -= this.speed;
  }

  generateLocation() {
    // Generate Friend Location
    this.x = Math.floor(Math.random() * canvas.width) + canvas.width;
    this.y = Math.floor(Math.random() * (canvas.height - this.height / 2)) + this.height;
    this.frame = 0;
    this.life = 1;
  }
}