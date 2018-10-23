//position et velocity sont des vec2
function Particule(position, velocity) {
  this.position = position;
  this.velocity = velocity;
  this.acceleration = vec2.fromValues(0, 0);
  this.maxSpeed = 2;

  this.update = function(canvas) {
    this.edges(canvas);

    vec2.add(this.velocity, this.velocity, this.acceleration);
    // this.velocity.limit(this.maxSpeed);
    vec2.add(this.position, this.position, this.velocity);
    // this.acceleration.mult(0);
  };

  //await an vec2 as force
  this.applyForce = function(force) {
    vec2.add(this.acceleration, this.acceleration, force);
  };
  //await an vec2 as Pos
  this.setPosition = function(pos) {
    this.position = pos;
  };

  this.draw = function(ctx) {
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = "#00aa00";
    ctx.translate(this.position[0], this.position[1]);
    // ctx.rotate(this.angle); // in radians
    // ctx.scale(this.scale, this.scale);
    ctx.arc(0, 0, 15, 0, Math.PI * 2, true);
    ctx.fill();
    ctx.closePath();
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
}
