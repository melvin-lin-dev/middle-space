class Friend {
  constructor() {
    this.img = new Image();
    this.img.src = game.getAsset('ship_2.png');

    this.width = 75 ;
    this.height = 75;

    this.x = 500;
    this.y = 150;
  }

  render() {
    ctx.drawImage(this.img, 0, 0, 80.25, 81, this.x, this.y, this.width, this.height);
  }
}