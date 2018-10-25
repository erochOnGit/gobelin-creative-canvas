class Rectangle {
  constructor(position, velocity, angle, scale, size) {
    this.position = position;
    this.velocity = velocity;
    this.angle = angle;
    this.scale = scale;
    this.size = size;
    let rectColors = ["#d22780", "#5e227f", "#41a7b3", "#1fe5bd"];
    this.color = rectColors[Math.floor(Math.random() * 4) + 0];
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
    ctx.rect(0, 0, this.size, this.size);
    ctx.fill();
    ctx.closePath();
    ctx.restore();
  }
}
