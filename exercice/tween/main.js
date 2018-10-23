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
  stuffs.push(
    new Circle(vec2.fromValues(Math.random() * 2 - 1, Math.random() * 2 - 1))
  );
}

var now = Date.now();
var lastTime = now;
var deltaTime = 16;
var expectedFPS = 1000 / 60; // 60 fps

console.log(stuffs[0]);
let time = 0; // t
// let beginingValue = 0; //b
let duration = 2;
// // c = change  value (delta between `from` and `to`)
// let changeValue = 0; //c
// let duration = 0; //d
function update() {
  requestAnimationFrame(update);
  // in update loop
  now = Date.now();
  deltaTime = (now - lastTime) / 1000;
  lastTime = now;
  // {
  // let position = (changeValue * time) / duration + beginingValue;
  // }
  // console.log(deltaTime);
  time += deltaTime;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  stuffs.forEach(stuff => {
    stuff.update(canvas, time, duration);
    stuff.draw(ctx);
  });

  // time++;
}
update();
