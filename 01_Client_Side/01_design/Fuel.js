class Fuel {
  constructor() {
    this.img = new Image();
    this.img.src = game.getAsset('fuel.png');

    this.width = 45;
    this.height = 61;

    this.x = 650;
    this.y = 120;

    this.angle = 35 ;
  }

  render() {
    ctx.save();
    ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
    let radians = this.angle * Math.PI / 180;
    ctx.rotate(radians);
    ctx.drawImage(this.img, -this.width / 2, -this.height / 2, this.width, this.height);
    ctx.restore();
  }
}