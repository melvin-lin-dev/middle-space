class Particle {
    constructor(x, y, score = 0) {
        let total = 8;

        this.particles = [];

        this.r = 5;

        this.opacity = 1;

        this.score = {
            x: x,
            y: y,
            score: (score > 0 ? '+' : '') + score,
        }

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
        for (let i = 0; i < this.particles.length; i++) {
            let particle = this.particles[i]
            let radians = particle.angle * Math.PI / 180;

            let mx = Math.sin(radians) * particle.speed;
            let my = Math.cos(radians) * particle.speed;

            ctx.save();
            ctx.beginPath();
            ctx.globalAlpha = this.opacity;
            ctx.arc(particle.x, particle.y, this.r, 0, 2 * Math.PI);
            ctx.fillStyle = '#fff';
            ctx.fill();
            ctx.closePath();
            ctx.restore();

            particle.x += mx;
            particle.y += my;
        }
        this.opacity -= .06;
    }
}