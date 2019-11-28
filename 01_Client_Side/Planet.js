class Planet {
  constructor(type) {
    this.type = type;

    this.img = new Image;

    //  Declaring Planet by Type

    switch (type) {
      case 1:
        this.img.src = game.getAsset('010-uranus.png');
        this.width = 80;
        this.height = 64;
        this.speed = 1.1;
        break;
      case 2:
        this.img.src = game.getAsset('009-saturn.png');
        this.width = 156;
        this.height = 90;
        this.speed = 1.7;
        break;
      case 3:
        this.img.src = game.getAsset('012-jupiter.png');
        this.width = 140;
        this.height = 140;
        this.speed = 2.4;
        break;
      case 4:
        this.img.src = game.getAsset('001-global.png');
        this.width = 180;
        this.height = 180;
        this.speed = 2.9;
        break;
      case 5:
        this.img.src = game.getAsset('006-mars.png');
        this.width = 240;
        this.height = 240;
        this.speed = 3.8;
        break;
    }

    this.generateLocation();
  }

  render() {
    //  Rendering Planet

    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);

    if (this.x < -500)
      this.generateLocation();

    this.x -= this.speed;
  }

  generateLocation() {
    // Generate Planet Location
    this.x = Math.floor(Math.random() * canvas.width) + canvas.width;
    this.y = Math.floor(Math.random() * (canvas.height - this.height / 2)) + this.height;
  }
}