class ScoreAnimation {
  constructor(x, y, score = 0) {
    this.stars = [];

    this.r = 5;

    this.opacity = 1;

    this.score = {
      x: x,
      y: y,
      score: (score > 0 ? '+' : '') + score,
    }

    $('.score-text')

    // let atany = y-

    // for (let i = 0; i < score; i++) {
    //   this.stars.push({
    //     x: x - this.r / 2,
    //     y: y - this.r / 2,
    //     speed: Math.floor(Math.random() * 8) + 2,
    //     angle: Math.atan2()
    //   });
    // }
  }

  render() {
    let self = this;

    if (this.opacity > 0) {

      this.particles.forEach(function (particle) {
        let radians = particle.angle * Math.PI / 180;

        let mx = Math.sin(radians) * particle.speed;
        let my = Math.cos(radians) * particle.speed;

        ctx.save();
        ctx.beginPath();
        ctx.globalAlpha = self.opacity;
        ctx.arc(particle.x, particle.y, self.r, 0, 2 * Math.PI);
        ctx.fillStyle = '#fff';
        ctx.fill();
        ctx.closePath();
        ctx.restore();

        particle.x += mx;
        particle.y += my;
      });

      ctx.save()
      ctx.beginPath()
      ctx.globalAlpha = self.opacity;
      ctx.fillStyle = this.score.score > 0 ? "#0f0" : "#f00"
      ctx.font = "bold 20px Rockwell"
      ctx.fillText(this.score.score, this.score.x, this.score.y)
      ctx.closePath()
      ctx.restore()
    }

    this.opacity -= .02;
    this.score.y -= 2

  }
}