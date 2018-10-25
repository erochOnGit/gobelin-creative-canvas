class Particule {
  constructor(position) {
    this.position = position;
    this.positionOnFire = vec2.create();
    this.target = vec2.create();
    this.alpha = 1;
    let circleColors = ["#d59e98", "#D07A52", "#D6A76B"];
    this.color =
      circleColors[Math.floor(Math.random() * circleColors.length) + 0];
    this.size = 1;
    this.time = 0.1;
    this.duration = 2000;
  }

  easeOutExpo(t, b, c, d) {
    return t == d ? b + c : c * (-Math.pow(2, (-10 * t) / d) + 1) + b;
  }

  update(dt) {
    this.time += dt;

    if (this.time < this.duration) {
      this.position = vec2.fromValues(
        this.easeOutExpo(
          this.time,
          this.positionOnFire[0],
          this.target[0],
          this.duration
        ),
        this.easeOutExpo(
          this.time,
          this.positionOnFire[1],
          this.target[1],
          this.duration
        )
      );
      this.alpha -= 0.01;
    } else {
      this.times = 0;
    }
  }

  draw(ctx) {
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.translate(this.position[0], this.position[1]);
    ctx.globalAlpha = this.alpha;
    ctx.arc(0, 0, this.size, 0, Math.PI * 2, true);
    ctx.fill();
    ctx.closePath();
    ctx.restore();
  }
}
