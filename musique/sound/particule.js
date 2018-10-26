class Particule {
  constructor(position) {
    this.position = position;
    this.previousPosition = vec2.create();
    this.positionOnFire = vec2.create();
    this.target = vec2.create();
    this.alpha = 1;
    let circleColors = ["#d59e98", "#D07A52", "#D6A76B"];
    this.color =
      circleColors[Math.floor(Math.random() * circleColors.length) + 0];
    this.size = 1;
    this.time = 0;
    this.duration = 2000;
    this.toDelete = false;
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
      this.toDelete = true;
    }
  }

  draw(ctx) {
    if (
      this.position[0] != 0 &&
      this.previousPosition[0] != 0 &&
      this.previousPosition[1] - this.position[1] < 200 &&
      this.previousPosition[1] - this.position[1] > 0
    ) {
      ctx.save();
      ctx.beginPath();
      ctx.fillStyle = this.color;
      ctx.strokeStyle = this.color;
      ctx.translate(this.position[0], this.position[1]);
      ctx.globalAlpha = this.alpha;
      // ctx.arc(0, 0, 3, 0, Math.PI * 2, true);
      ctx.moveTo(0, 0);
      ctx.lineTo(
        this.previousPosition[0] - this.position[0],
        this.previousPosition[1] - this.position[1]
      );
      ctx.fill();
      ctx.stroke();
      ctx.closePath();
      ctx.restore();
    }
    this.previousPosition[0] = this.position[0];
    this.previousPosition[1] = this.position[1];
  }
}
