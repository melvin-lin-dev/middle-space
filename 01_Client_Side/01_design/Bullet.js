class Bullet {
  constructor(x, y) {
    //  Declaring Bullet

    this.width = 40;
    this.height = 8;

    this.x = x;
    this.y = y - this.height / 2;

    this.img = new Image;
    this.img.src = game.getAsset('bullet.png');
  }

  render() {
    //  Rendering Bullet

    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
}