class Planet {
  constructor(type) {
    this.type = type;

    this.img = new Image;

    //  Declaring Planet by Type

    switch (type) {
      case 1:
        this.img = imageAssets['010-uranus.png'];
        this.width = 80;
        this.height = 64;
        this.speed = 1.1;
        break;
      case 2:
        this.img = imageAssets['009-saturn.png'];
        this.width = 156;
        this.height = 90;
        this.speed = 1.7;
        break;
      case 3:
        this.img = imageAssets['012-jupiter.png'];
        this.width = 140;
        this.height = 140;
        this.speed = 2.4;
        break;
      case 4:
        this.img = imageAssets['001-global.png'];
        this.width = 180;
        this.height = 180;
        this.speed = 2.9;
        break;
      case 5:
        this.img = imageAssets['006-mars.png'];
        this.width = 240;
        this.height = 240;
        this.speed = 3.8;
        break;
    }

    if (canvas.offsetHeight > 600) {
      this.width *= 5 / 3;
      this.height *= 5 / 3;
    }
    if (canvas.offsetWidth > 1000) {
      this.speed *= 5 / 3;
    }


    this.generateLocation();
  }

  render() {
    //  Rendering Planet

    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);

    if (this.x < -500)
      this.generateLocation();

    this.x -= this.speed;

    ctx.save()
    ctx.beginPath()
    ctx.rect(0,0,canvas.offsetWidth, canvas.offsetHeight)
    ctx.fillStyle = "#2a1d50"
    ctx.globalAlpha = .25
    ctx.fill()
    ctx.closePath()
    ctx.restore()
  }

  generateLocation() {
    // Generate Planet Location
    this.x = Math.floor(Math.random() * canvas.width) + canvas.width;
    this.y = Math.floor(Math.random() * (canvas.height - this.height));
  }
}