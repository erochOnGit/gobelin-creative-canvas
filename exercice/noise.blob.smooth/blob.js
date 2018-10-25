//position et velocity sont des vec2
function Blob(position, velocity) {
  this.position = position;
  this.velocity = velocity || vec2.fromValues(1, 1);
  this.acceleration = vec2.fromValues(0, 0);
  this.maxSpeed = 2;
  this.points = [];
  this.rayonCos = 200;
  this.rayonSin = 200;
  // this.previousVertexsPos = vec2.create();
  this.simplex = new SimplexNoise();
  this.amplitude = 10;
  this.angle = 0;

  for (var i = 0; i < 360; i++) {
    this.points.push({
      offset: i,
      r: Math.random(255),
      g: Math.random(255),
      b: Math.random(255)
    });
  }

  this.update = function(canvas, noise) {
    // console.log(this.position, this.velocity, this.acceleration);
    // vec2.add(this.velocity, this.velocity, this.acceleration);
    // this.velocity.limit(this.maxSpeed);
    vec2.add(this.position, this.position, this.velocity);
    // this.acceleration.mult(0);
    console.log("2", this.position, this.velocity);
  };

  //await an vec2 as force
  this.applyForce = function(force) {
    console.log("init", force, this.acceleration);
    vec2.add(this.acceleration, this.acceleration, force);
    console.log("accel", this.acceleration);
  };

  this.applyRotation = (force, angle) => {
    vec2.rotate(this.velocity, this.velocity, this.position, angle);
  };

  //await an vec2 as Pos
  this.setPosition = function(pos) {
    this.position = pos;
  };

  this.draw = function(ctx) {
    ctx.save();
    ctx.translate(this.position[0], this.position[1]);
    ctx.beginPath();
    let last;
    this.points.forEach((element, index) => {
      value2d =
        this.simplex.noise2D(index / 100 + time, index / 100 + time) *
        this.amplitude;
      ctx.fillStyle = "#00aa00";
      let angle = (Math.PI * 2 * element.offset) / this.points.length;
      ctx.strokeStyle =
        "rgb(" + element.r + "," + element.g + "," + element.b + ")";
      // ctx.arc(
      //   Math.cos(angle) * this.rayonCos + 0,
      //   Math.sin(angle) * this.rayonSin + 0,
      //   15,
      //   0,
      //   Math.PI * 2,
      //   true
      // );
      // if (this.previousVertexsPos[0] != 0) {
      // ctx.moveTo(
      //   Math.cos(angle) * this.rayonCos + 0,
      //   Math.sin(angle) * this.rayonSin + 0
      // );
      ctx.lineTo(
        Math.cos(angle) * this.rayonCos + value2d * 5,
        Math.sin(angle) * this.rayonSin + value2d * 5
      );
      // }
      // this.previousVertexsPos = vec2.fromValues(
      //   Math.cos(angle) * this.rayonCos + 0,
      //   Math.sin(angle) * this.rayonSin + 0
      // );
      // ellipse(
      //   Math.cos(angle) * rayonCos + centre,
      //   Math.sin(angle) * rayonSin + centre,
      //   50
      // );
      ctx.stroke();
    });
    //close the circle
    // let angle = (Math.PI * 2 * this.points[0].offset) / this.points.length;
    // ctx.lineTo(
    //   Math.cos(angle) * this.rayonCos + 0,
    //   Math.sin(angle) * this.rayonSin + 0
    // );
    // ctx.stroke();
    ctx.closePath();

    // ctx.rotate(this.angle); // in radians
    // ctx.scale(this.scale, this.scale);
    // ctx.arc(0, 0, 15, 0, Math.PI * 2, true);
    // ctx.fill();

    ctx.restore();
  };

  this.edges = function(canvas) {
    if (this.position[0] > canvas.width) {
      this.position[0] = 0;
    }
    if (this.position[0] < 0) {
      this.position[0] = canvas.width;
    }
    if (this.position[1] > canvas.height) {
      this.position[1] = 0;
    }
    if (this.position[1] < 0) {
      this.position[1] = canvas.height;
    }
  };

  let comlumns = 20; //here i checked the number of the column in the flow field in main.js

  this.follow = function(vectors, canvas) {
    let x = Math.floor((this.position[0] / canvas.height) * 20);
    let y = Math.floor((this.position[1] / canvas.width) * 20);

    let index = x + y * comlumns;
    // console.log("y", y, "x", x, index);
    // console.log(
    //   "vector",
    //   index,
    //   vectors[index].position[0],
    //   vectors[index].position[1]
    // );
    let force = vec2.fromValues(
      vectors[index].position[0],
      vectors[index].position[1]
    );
    this.angle = vectors[index].position[0];
    this.applyRotation(force, this.angle);
  };
}
