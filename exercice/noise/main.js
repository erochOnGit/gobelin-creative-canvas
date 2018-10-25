var canvas = document.querySelector("#myCanvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var ctx = canvas.getContext("2d");

let mouse = { x: 0, y: 0 };
canvas.addEventListener("mousemove", e => {
  // e.clientX
  // e.clientY
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

let stuffs = [];
for (let index = 0; index < 1; index++) {
  stuffs.push(null);
}

var now = Date.now();
var lastTime = now;
var deltaTime = 16;
var expectedFPS = 1000 / 60; // 60 fps

console.log(stuffs[0]);
let time = 0; // t
let duration = 2;
let y = 0;
let offset = 200;
var simplex = new SimplexNoise();

function update() {
  requestAnimationFrame(update);
  // in update loop
  now = Date.now();
  deltaTime = (now - lastTime) / 1000;
  lastTime = now;

  time += deltaTime;

  value2d = simplex.noise2D(time, time);

  // console.log(value2d);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  ctx.beginPath();
  ctx.fillStyle = "#11aa11";
  ctx.translate(canvas.width - 100, value2d * 100 + offset);
  ctx.arc(0, 0, 15, 0, Math.PI * 2, true);
  ctx.fill();
  ctx.closePath();
  ctx.restore();
  // stuffs.forEach(stuff => {
  //   stuff.update();
  //   stuff.draw(ctx);
  // });

  // time++;
}
update();
