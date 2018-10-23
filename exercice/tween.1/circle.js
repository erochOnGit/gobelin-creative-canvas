class Circle {
  constructor(position, velocity, angle, scale, size) {
    this.position = position;
    this.velocity = velocity || vec2.fromValues(0, 0);
    this.angle = angle || 0;
    this.scale = scale || 1;
    this.size = size || 5;
    let circleColors = ["#033fff", "#4a9ff5", "#5ff4ee", "#5ff4ee"];
    this.color = circleColors[Math.floor(Math.random() * 4) + 0];
    this.startUpdateTime = 0;
    // this.startUpdate = false;
  }

  easeLinear(t, b, c, d) {
    return (c * t) / d + b;
  }
  update(canvas, time, duration) {
    if (this.startUpdateTime === 0) {
      this.startUpdateTime = time;
    }
    if (this.position[0] > canvas.width || this.position[0] < 0) {
      this.velocity[0] = -1 * this.velocity[0];
    }
    if (this.position[1] > canvas.height || this.position[1] < 0) {
      this.velocity[1] = -1 * this.velocity[1];
    }

    // console.log(this.easeLinear(time, 0, canvas.width, 2));
    if (time < this.startUpdateTime + duration) {
      this.position = vec2.fromValues(
        this.easeLinear(time, 0, canvas.width / 2, duration),
        this.easeLinear(time, 0, canvas.height / 2, duration)
      );
    } else {
      this.startUpdateTime = 0;
    }
    // console.log(this.position);
  }

  draw(ctx) {
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.translate(this.position[0], this.position[1]);
    ctx.rotate(this.angle); // in radians
    ctx.scale(this.scale, this.scale);
    ctx.arc(0, 0, this.size, 0, Math.PI * 2, true);
    ctx.fill();
    ctx.closePath();
    ctx.restore();
  }
}
