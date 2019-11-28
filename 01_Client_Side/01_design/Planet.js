class Planet {
  constructor(type) {
    this.type = type;

    this.img = new Image;

    switch (type) {
      case 1:
        this.img.src = game.getAsset('010-uranus.png');
        this.width = 80;
        this.height = 64;
        break;
      case 2:
        this.img.src = game.getAsset('009-saturn.png');
        this.width = 156;
        this.height = 90;
        break;
      case 3:
        this.img.src = game.getAsset('012-jupiter.png');
        this.width = 140;
        this.height = 140;
        break;
      case 4:
        this.img.src = game.getAsset('001-global.png');
        this.width = 180;
        this.height = 180;
        break;
      case 5:
        this.img.src = game.getAsset('006-mars.png');
        this.width = 240;
        this.height = 240;
        break;
    }

    this.x = type * 90;
    this.y = type * 50;
  }

  render() {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
}