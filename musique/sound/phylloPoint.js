class PhylloPoint {
  constructor(position, velocity, angle, scale, size) {
    this.position = position;
    this.velocity = velocity;
    this.angle = angle;
    this.scale = scale;
    this.size = size;
    let circleColors = ["#d59e98", "#D07A52", "#D6A76B"];
    this.color =
      circleColors[Math.floor(Math.random() * circleColors.length) + 0];
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

  updateSize(size, canvas) {
    this.size = size;
  }

  setPosition(position) {
    this.position = position;
  }

  draw(ctx, n, angle, c, alpha) {
    let a = n * Math.PI * (3 - Math.sqrt(angle));
    let r = c * Math.sqrt(n);
    let x = r * Math.cos(a);
    let y = (r / 2) * Math.sin(a);

    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.translate(this.position[0], this.position[1]);
    ctx.rotate(this.angle); // in radians
    ctx.scale(this.scale, this.scale);
    ctx.globalAlpha = alpha;
    ctx.ellipse(
      x,
      y,
      this.size,
      this.size + 1 * this.size,
      (90 * Math.PI) / 180,
      0,
      2 * Math.PI
    );
    // ctx.arc(x, y, this.size, 0, Math.PI * 2, true);
    ctx.fill();
    ctx.closePath();
    ctx.restore();
  }
}

// this.showPhyllo = function(posx, posy, color, opacity, n, angle, c) {
//     let a = n * Math.PI * (3 - Math.sqrt(angle));
//     let r = c * Math.sqrt(n);

//     let x = r * Math.cos(a) + posx;
//     let y = r * Math.sin(a) + posy;

//     let rdmR = noise(this.position.x) * color;
//     let rdmG = noise(this.position.x) * 200;
//     let rdmB = noise(this.position.x) * 200;
//     let rdmA = noise(this.position.x) * opacity;
//     let rdmS = noise(this.position.y) * 50;

//     colorMode(HSB, 150);
//     stroke(rdmR, rdmG, rdmB, rdmA);
//     strokeWeight(rdmS);
//     point(x, y);
//     // this.updatePrev();
//   };
