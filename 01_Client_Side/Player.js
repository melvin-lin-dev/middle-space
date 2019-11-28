class Player {
  constructor() {
    //  Declaring Plane Items

    this.img = new Image;
    this.img.src = game.getAsset('plane.png');

    this.width = 93;
    this.height = 72;

    this.collision = {
      x: 10,
      width: 75,
      height: 65
    }

    this.x = 100;
    this.y = (canvas.height - this.height) / 2;

    this.speedX = 0;
    this.speedY = 0;

    this.sound = new Audio();
    this.sound.src = './sound/destroyed.mp3';

    //  Declaring Plane's Exhaust

    this.exhaust = {
      img: new Image,
      width: 70,
      height: 30,
      scale: 1,
      minScale: .8,
      maxScale: 1.1,
      rangeScale: .0075,
      isScaling: 0,
      angle: 0,
      maxAngle: 15,
      minAngle: -15,
      rangeAngle: 3
    };
    this.exhaust.img.src = game.getAsset('exhaust.png');

    //  Declaring Bullet

    this.bullets = [];
  }

  render() {
    //  Animate
    this.animate();
    //  Movement
    this.movement();

    //  Rendering Exhaust

    let exhaust = this.exhaust;

    let exhaustWidth = exhaust.width * exhaust.scale;
    let exhaustHeight = exhaust.height * exhaust.scale;
    let exhaustX = this.x - 50 + exhaust.width - exhaustWidth;
    let exhaustY = this.y + (this.height - exhaustHeight) / 2;

    ctx.save();
    ctx.translate(exhaustX + exhaustWidth, exhaustY + exhaustHeight / 2);
    ctx.rotate(exhaust.angle * Math.PI / 180);
    ctx.drawImage(exhaust.img, -exhaustWidth, -exhaustHeight / 2, exhaustWidth, exhaustHeight);
    ctx.restore();

    //  Rendering Plane

    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);

    //  Collision for later
    // this.collision.x = this.x + 5
    // this.collision.y = this.y + (this.height - this.collision.height) / 2
    //
    // ctx.beginPath()
    // ctx.rect(this.collision.x, this.collision.y, this.collision.width, this.collision.height)
    // ctx.fillStyle = "#f00"
    // ctx.fill()
    // ctx.closePath()
  }

  animate() {
    //  Plane Animation

    let exhaust = this.exhaust;

    if (!game.TO_LEFT && !game.TO_RIGHT) {
      if (exhaust.isScaling) {
        exhaust.scale += exhaust.rangeScale;
      } else {
        exhaust.scale -= exhaust.rangeScale;
      }
    } else {
      if (game.TO_RIGHT && exhaust.scale <= exhaust.maxScale) {
        exhaust.scale += exhaust.rangeScale;
      } else if (game.TO_LEFT && exhaust.scale >= exhaust.minScale) {
        exhaust.scale -= exhaust.rangeScale;
      }
    }

    if (exhaust.scale <= exhaust.minScale) {
      exhaust.isScaling = 1;
    }

    if (exhaust.scale >= exhaust.maxScale) {
      exhaust.isScaling = 0;
    }
  }

  movement() {
    //  Plane Movement

    let exhaust = this.exhaust;

    this.x += this.speedX;
    this.y += this.speedY;

    if (game.TO_TOP) {
      if (exhaust.angle > exhaust.minAngle) {
        exhaust.angle -= exhaust.rangeAngle;
      }
      this.y -= this.speed;
    }
    if (game.TO_BOTTOM) {
      if (exhaust.angle < exhaust.maxAngle) {
        exhaust.angle += exhaust.rangeAngle;
      }
      this.y += this.speed;
    }

    if (!game.TO_TOP && !game.TO_BOTTOM) {
      if (exhaust.angle > 0)
        exhaust.angle -= exhaust.rangeAngle;
      if (exhaust.angle < 0)
        exhaust.angle += exhaust.rangeAngle;
    }

    if (this.x < 0)
      this.x = 0;
    if (this.x + this.width > canvas.width)
      this.x = canvas.width - this.width;
    if (this.y < 0)
      this.y = 0;
    if (this.y + this.height > canvas.height)
      this.y = canvas.height - this.height
  }

  shoot() {
    this.bullets.push(new Bullet(this.x + this.width / 2, this.y + this.height / 2));
  }
}