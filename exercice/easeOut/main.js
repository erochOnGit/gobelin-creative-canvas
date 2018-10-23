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
for (let index = 0; index < 50; index++) {
  stuffs.push(
    new Flyer(vec2.fromValues(Math.random() * 2 - 1, Math.random() * 2 - 1))
  );
}
console.log(stuffs[0]);
update();

function update() {
  requestAnimationFrame(update);

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  stuffs.forEach(stuff => {
    stuff.update(canvas, mouse);
    stuff.draw(ctx);
  });
}
