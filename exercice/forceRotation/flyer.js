//position et velocity sont des vec2
function Flyer(position) {
  this.position = position;
  this.direction = vec2.create();
  this.velocity = vec2.fromValues(Math.random() * 2 - 1, Math.random() * 2 - 1);
  this.acceleration = vec2.fromValues(0, 0);
  this.maxSpeed = 2;
  this.size = 10;
  this.angle = 0;
  this.previousAngle = 0;
  this.easing = Math.random() * 0.01;

  this.update = function(canvas, mouse) {
    this.edges(canvas);

    vec2.sub(this.velocity, vec2.fromValues(mouse.x, mouse.y), this.position);
    vec2.scale(this.velocity, this.velocity, this.easing);
    // position.add(dir); // dir = velocity

    // vec2.add(this.velocity, this.velocity, this.acceleration);
    vec2.add(this.position, this.position, this.velocity);
    // var vx = (targetX - object.x) * this.easing;
    // object.x += vx;

    let dx = mouse.x - this.position[0];
    let dy = mouse.y - this.position[1];
    // console.log(Math.atan2(dy, dx));
    this.angle = Math.atan2(dy, dx) + Math.PI * 2.5;

    //trying toi rotate :/
    // let rotX =
    //   Math.cos(this.previousAngle - this.angle) * this.position[0] -
    //   Math.sin(this.previousAngle - this.angle) * this.position[1];
    // let rotY =
    //   Math.sin(this.previousAngle - this.angle) * this.position[0] +
    //   Math.cos(this.previousAngle - this.angle) * this.position[1];

    // // vec2.fromValues(this.direction,this.position,this.angle)
    // this.position = vec2.fromValues(rotX, rotY);
    // this.previousAngle = this.angle;
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
    ctx.strokeStyle = "#00aa00";
    ctx.translate(this.position[0], this.position[1]);
    ctx.rotate(this.angle); // in radians
    // ctx.scale(this.scale, this.scale);
    ctx.moveTo(-this.size / 2, this.size / 2);
    ctx.lineTo(0, -this.size / 2);
    ctx.lineTo(this.size / 2, this.size / 2);
    ctx.lineTo(-this.size / 2, this.size / 2);
    ctx.stroke();
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
