class Game {
  constructor() {
    this.assetUrl = './01_source/';
  }

  //  Starting Game

  start() {
    //  Declaring Objects

    this.backgroundPosition = 0;

    //  Planets

    this.planets = [];

    for (let i = 0; i < 5; i++) {
      this.planets.push(new Planet(i + 1));
    }

    //  Friends

    this.friend = new Friend();

    //  Enemies

    this.enemies = [];
    this.enemies[0] = new Enemy(1);
    this.enemies[1] = new Enemy(2);

    //  Player

    this.player = new Player();

    //  Fuel

    this.fuel = new Fuel();

    this.pause = -1;

    //  Clear Previous Game

    if (this.rendering)
      cancelAnimationFrame(this.rendering);

    this.rendering = null;

    this.render = this.render.bind(this);
    this.render();
  }

  // Rendering Game

  render() {
    if (this.pause === -1) {
      let self = this;

      // this.animateBackground();

      //  Clearing Canvas

      ctx.clearRect(0, 0, canvas.width, canvas.height);


      //  Rendering Planets

      this.planets.forEach(function (planet) {
        planet.render();
      });

      //  Rendering Friend

      this.friend.render();

      //  Rendering Enemy

      this.enemies[0].render(750, 250);
      this.enemies[0].render(250, 450);
      this.enemies[1].render(650, 380);

      //  Rendering Fuel

      this.fuel.render();

      //  Rendering Player

      this.player.render();
    }

    //  Looping Animation
    this.rendering = requestAnimationFrame(this.render);
  }

  animateBackground() {
    $('canvas').css('background-position', this.backgroundPosition + 'px');

    this.backgroundPosition--;
  }

  // Get Assets
  getAsset(url) {
    return this.assetUrl + url;
  }
}