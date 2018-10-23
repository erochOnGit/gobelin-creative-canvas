var canvas = document.querySelector("#myCanvas");
var ctx = canvas.getContext("2d");

// x, y, width, height
ctx.fillRect(0, 0, canvas.width / 2, canvas.height / 2);
//same
ctx.beginPath();
ctx.fillStyle = "#ffffff"; // 'white' or 'rgb(255,255,255)'
ctx.rect(75, 75, canvasWidth / 2, canvasHeight / 2);
ctx.fill();
ctx.closePath();

//cercle
ctx.beginPath();
ctx.fillStyle = "#ffffff";
// x, y, radius, startAngle, endAngle, clockwise
ctx.arc(150, 150, 75, 0, Math.PI * 2, true);
ctx.fill();
ctx.closePath();

//euuu des shape cool
ctx.beginPath();
ctx.strokeStyle = "#00aa00";
ctx.moveTo(canvasWidth / 2 - 50, canvasHeight / 2 + 50);
ctx.lineTo(canvasWidth / 2, canvasHeight / 2 - 50);
ctx.lineTo(canvasWidth / 2 + 50, canvasHeight / 2 + 50);
ctx.lineTo(canvasWidth / 2 - 50, canvasHeight / 2 + 50);
ctx.stroke();
ctx.closePath();

//image

// /!\ make sure the image is loaded before drawing it
// image, x, y
ctx.drawImage(img, 0, 0);

// image, x, y, width, height
ctx.drawImage(img, 0, 0, img.width / 2, img.height / 2);
// img, sx, sy, swidth, sheight, dx, dy, dwidth, dheight
ctx.drawImage(img, 0, 0, 100, 100, 190, 190, 100, 100);

// opacités qui est sur tout le context déssiné donc bien la remettre à 0
ctx.drawImage(img, 0, 0, img.width / 2, img.height / 2);
// apply to entire context, not only the image
// using here the canvas in its previous state as the img
ctx.globalAlpha = 0.2;
ctx.drawImage(canvas, 0, 0, 100, 100, 190, 190, 100, 100);

//brush and mask

ctx.clearRect(0, 0, canvasWidth, canvasHeight);

ctx.beginPath();
ctx.arc(mouse.x, mouse.y, 50, 0, Math.PI * 2, false);
ctx.closePath();
ctx.clip();

ctx.drawImage(img, 0, 0);

//image as a mask (mode de fusion checker mozilla)
// default blending
ctx.globalCompositeOperation = "source-over";

// mask : draw the image and set the blending mode
ctx.drawImage(mask, mouse.x - mask.width / 2, mouse.y - mask.height / 2);
ctx.globalCompositeOperation = "source-in";

// image
ctx.drawImage(img, 0, 0);

//transformation important
//transformation affine
// translate rotate scale
// loop to call drawTriangle here...
// loop to call drawTriangle here...
// loop to call drawTriangle here...
function drawTriangle(x, y, angle) {
  // ctx stuff here...
  ctx.translate(x, y);
  ctx.rotate(angle); // in radians
  ctx.scale(scale, scale);
  ctx.moveTo(-size / 2, size / 2);
  ctx.lineTo(0, -size / 2);
  ctx.lineTo(size / 2, size / 2);
  ctx.lineTo(-size / 2, size / 2);
  // end ctx stuff here...
}

//l'ordre de transition est TRS transition => rotation => scale

//motion basics

// call it once
update();

function update() {
  // call it again each frame
  requestAnimationFrame(update);

  angle += 1;
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  drawRectangle();
}

//add comlexity
var velocityX = 1;
var velocityY = 0.8;

update();

function update() {
  requestAnimationFrame(update);

  x += velocityX;
  y += velocityY;
  if (x > canvasWidth) x = 0;
  if (y > canvasHeight) y = 0;

  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  drawRectangle();
}
