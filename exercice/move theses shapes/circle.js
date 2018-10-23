class Circle {
  constructor(position, velocity, angle, scale, size) {
    this.position = position;
    this.velocity = velocity;
    this.angle = angle;
    this.scale = scale;
    this.size = size;
    let circleColors = ["#033fff", "#4a9ff5", "#5ff4ee", "#5ff4ee"];
    this.color = circleColors[Math.floor(Math.random() * 4) + 0];
  }
  update(canvas) {
    if (this.position[0] > canvas.width || this.position[0] < 0) {
      this.velocity[0] = -1 * this.velocity[0];
    }
    if (this.position[1] > canvas.height || this.position[1] < 0) {
      this.velocity[1] = -1 * this.velocity[1];
    }
    vec2.add(this.position, this.position, this.velocity);
  }
  draw(ctx) {
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.translate(this.position[0], this.position[1]);
    ctx.rotate(this.angle); // in radians
    ctx.scale(this.scale, this.scale);
    ctx.arc(0, 0, 75, 0, Math.PI * 2, true);
    ctx.fill();
    ctx.closePath();
    ctx.restore();
  }
}
