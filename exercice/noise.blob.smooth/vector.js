class Vector {
  constructor(x, y, alpha = 0) {
    this.position = vec3.fromValues(x, y, alpha);
  }

  draw(canvas) {
    ctx.beginPath();
    ctx.translate(
      this.position[0] * canvas.width,
      this.position[1] * canvas.height
    );
    ctx.rotate(this.position[2]);
    ctx.moveTo(0, 0);
    ctx.lineTo(0, 40);
    ctx.stroke();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.closePath();
  }

  rotate(alpha) {
    this.position[2] = alpha;
  }
}
