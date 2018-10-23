class Triangle {
  constructor(position, velocity, angle, scale, size) {
    this.position = position;
    this.velocity = velocity;
    this.angle = angle;
    this.scale = scale;
    this.size = size;
    let triangleColors = ["#a26ea1", "#f18a9b", "#ffb480", "#ffff9d"];
    this.color = triangleColors[Math.floor(Math.random() * 4) + 0];
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
    ctx.strokeStyle = this.color;
    ctx.translate(this.position[0], this.position[1]);
    ctx.rotate(this.angle); // in radians
    ctx.scale(this.scale, this.scale);
    ctx.moveTo(-this.size / 2, this.size / 2);
    ctx.lineTo(0, -this.size / 2);
    ctx.lineTo(this.size / 2, this.size / 2);
    ctx.lineTo(-this.size / 2, this.size / 2);
    ctx.stroke();
    ctx.closePath();
    ctx.restore();
  }
}
