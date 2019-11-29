class Particle {
  constructor(x, y, type = -1) {
    let total = type === -1 ? 8 : type;

    this.type = type;

    this.particles = [];

    this.r = 5;

    this.opacity = 1;

    for (let i = 0; i < total; i++) {
      this.particles.push({
        x: x - this.r / 2,
        y: y - this.r / 2,
        speed: Math.floor(Math.random() * 8) + 2,
        angle: Math.floor(Math.random() * 360)
      });
    }
  }

  render() {
    let self = this;

    this.particles.forEach(function (particle) {
        let radians = particle.angle * Math.PI / 180;

        let mx = Math.sin(radians) * particle.speed;
        let my = Math.cos(radians) * particle.speed;

        if(self.type === -1) {
            ctx.save();
            ctx.beginPath();
            ctx.globalAlpha = self.opacity;
            ctx.arc(particle.x, particle.y, self.r, 0, 2 * Math.PI);
            ctx.fillStyle = '#fff';
            ctx.fill();
            ctx.closePath();
            ctx.restore();
        }else {
            let img = new Image();
            img.src = './assets/coin-particle.png';
            ctx.drawImage(img, particle.x, particle.y, self.r ** 2, self.r ** 2);
        }

      particle.x += mx;
      particle.y += my;
    });

    this.opacity -= .02;

  }
}