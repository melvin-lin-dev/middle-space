class Enemy {
  constructor(type) {
    this.img = new Image();

    this.type = type;

    switch (type) {
      case 1:
        this.img.src = game.getAsset('ship_3.png');
        this.width = 75;
        this.height = 75;
        break;
      case 2:
        this.img.src = game.getAsset('aestroid_brown.png');
        this.width = 95;
        this.height = 95;
        break;
    }
  }

  render(x, y) {
    this.x = x;
    this.y = y;

    if (this.type === 1) {
      ctx.drawImage(this.img, 0, 0, 80, 80, this.x, this.y, this.width, this.height);
    } else if (this.type === 2) {
      ctx.drawImage(this.img, 0, 0, 512, 512, this.x, this.y, this.width, this.height);
    }
  }

}