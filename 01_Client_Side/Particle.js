class Particle {
    constructor(x, y, type = -1, score) {
        let total = type === -1 ? 8 : type;

        this.particles = [];

        this.r = 4;

        this.opacity = 1;

        this.score = {
            x: x,
            y: y,
            score: (score > 0 ? '+' : '') + score,
        };

        for (let i = 0; i < total; i++) {
            this.particles.push({
                x: x - this.r / 2,
                y: y - this.r / 2,
                speed: Math.floor(Math.random() * 6) + 1,
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

            if(this.type === -1) {
                ctx.save();
                ctx.beginPath();
                ctx.globalAlpha = this.opacity;
                ctx.arc(particle.x, particle.y, this.r, 0, 2 * Math.PI);
                ctx.fillStyle = '#fff';
                ctx.fill();
                ctx.closePath();
                ctx.restore();
            }else {
                let img = new Image();
                img.src = './assets/coin-particle.png';
                ctx.drawImage(img, particle.x, particle.y, this.r ** 2, this.r ** 2);
            }

            particle.x += mx;
            particle.y += my;
        }

        ctx.save();
        ctx.beginPath();
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.score.score > 0 ? "#0f0" : "#f00";
        ctx.font = "bold 20px Rockwell";
        ctx.fillText(this.score.score, this.score.x, this.score.y);
        ctx.closePath();
        ctx.restore();

        this.score.y -= 2

        this.opacity -= .02;
    }
}