class Ruban {
  constructor(size) {
    this.coords = [];
    for (let index = 0; index < size; index++) {
      this.coords.push({
        x: Math.floor(Math.random() * 400),
        y: Math.floor(Math.random() * 400)
      });
    }

    // console.log(this.coords, this.coords[0].x);
  }

  edges(canvas) {
    if (this.coords[0].x > canvas.width) {
      this.coords[0].x = 0;
    }
    if (this.coords[0].x < 0) {
      this.coords[0].x = canvas.width;
    }
    if (this.coords[0].y > canvas.height) {
      this.coords[0].y = 0;
    }
    if (this.coords[0].y < 0) {
      this.coords[0].y = canvas.height;
    }
  }

  update(canvas, time) {
    // let particules = new particules();
    this.edges(canvas);
    this.coords.splice(0, 0, {
      x: this.coords[0].x + Math.sin(time) * Math.random() * 5,
      y: this.coords[0].y + Math.cos(time) * Math.random() * 5
    });
    this.coords.pop();
    // console.log(
    //   this.coords[0].x,
    //   this.coords[1].x,
    //   this.coords[2].x,
    //   this.coords[3].x,
    //   this.coords[4].x
    // );
  }

  draw(ctx) {
    for (let i = 0; i < this.coords.length - 1; i++) {
      ctx.save();
      ctx.beginPath();
      ctx.strokeStyle = this.color;
      //   ctx.translate(
      //     this.particules[i].position[0],
      //     this.particules[i].position[1]
      //   );
      ctx.moveTo(this.coords[i].x, this.coords[i].y);
      ctx.lineTo(this.coords[i + 1].x, this.coords[i + 1].y);
      ctx.stroke();
      ctx.closePath();
      ctx.restore();
    }
  }
}
