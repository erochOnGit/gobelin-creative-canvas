var canvas = document.querySelector("#myCanvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var ctx = canvas.getContext("2d");
let triangleColors = ["#a26ea1", "#f18a9b", "#ffb480", "#ffff9d"];
let circleColors = ["#f2f4b2", "#cce490", "#0c907d", "#0d627a"];
let rectColors = ["#d22780", "#5e227f", "#41a7b3", "#1fe5bd"];

function drawCercle(x, y, angle, scale, size) {
  // ctx stuff here...
  ctx.save();
  ctx.beginPath();
  ctx.fillStyle = circleColors[Math.floor(Math.random() * 4) + 0];
  ctx.translate(x, y);
  ctx.rotate(angle); // in radians
  ctx.scale(scale, scale);
  // x, y, radius, startAngle, endAngle, clockwise
  ctx.arc(0, 0, 75, 0, Math.PI * 2, true);
  ctx.fill();
  ctx.closePath();
  ctx.restore();
  // end ctx stuff here...
}
function drawRect(x, y, angle, scale, size) {
  // ctx stuff here...
  ctx.save();
  ctx.beginPath();
  ctx.fillStyle = rectColors[Math.floor(Math.random() * 4) + 0];
  ctx.translate(x, y);
  ctx.rotate(angle); // in radians
  ctx.scale(scale, scale);
  // x, y, radius, startAngle, endAngle, clockwise
  ctx.rect(0, 0, 10, 10);
  ctx.fill();
  ctx.closePath();
  ctx.restore();
  // end ctx stuff here...
}

function drawTriangle(x, y, angle, scale, size) {
  // ctx stuff here...
  ctx.save();
  ctx.beginPath();
  ctx.strokeStyle = triangleColors[Math.floor(Math.random() * 4) + 0];
  ctx.translate(x, y);
  ctx.rotate(angle); // in radians
  ctx.scale(scale, scale);
  ctx.moveTo(-size / 2, size / 2);
  ctx.lineTo(0, -size / 2);
  ctx.lineTo(size / 2, size / 2);
  ctx.lineTo(-size / 2, size / 2);
  ctx.stroke();
  ctx.closePath();
  ctx.restore();
  // end ctx stuff here...
}

for (let index = 0; index < 10; index++) {
  console.log("jeanmichel");
  drawTriangle(
    Math.floor(Math.random() * canvas.width - 10) + 10,
    Math.floor(Math.random() * canvas.height - 10) + 10,
    Math.random() * 5,
    Math.random() * 30,
    Math.abs(Math.random() * 5)
  );
  drawCercle(
    Math.floor(Math.random() * canvas.width - 10) + 10,
    Math.floor(Math.random() * canvas.height - 10) + 10,
    0,
    Math.random() * 2,
    Math.abs(Math.random() * 5)
  );
  drawRect(
    Math.floor(Math.random() * canvas.width - 10) + 10,
    Math.floor(Math.random() * canvas.height - 10) + 10,
    0,
    Math.random() * 7,
    Math.abs(Math.random() * 5)
  );
}
