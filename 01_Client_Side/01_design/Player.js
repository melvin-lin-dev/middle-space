class Player {
  constructor() {
    //  Declaring Plane Items

    this.img = new Image;
    this.img.src= game.getAsset('plane.png');

    this.width = 93;
    this.height = 72;

    this.x = 100;
    this.y = (canvas.height - this.height) / 2;

    //  Declaring Plane's Exhaust

    this.exhaust = {
      img: new Image,
      width: 70,
      height: 30
    };
    this.exhaust.img.src = game.getAsset('exhaust.png');

    //  Declaring Bullet

    this.bullets = [new Bullet(this.x + this.width + 60, this.y + this.height / 2)];
  }

  render() {
    let exhaust = this.exhaust;

    let exhaustX = this.x - 40;
    let exhaustY = this.y + (this.height - exhaust.height) / 2;

    ctx.drawImage(exhaust.img, exhaustX, exhaustY, exhaust.width, exhaust.height);

    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);

    this.bullets[0].render();
  }

  animate() {

  }
}