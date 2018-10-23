var canvas = document.querySelector("#myCanvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var ctx = canvas.getContext("2d");

let stuffs = [];
for (let index = 0; index < 25; index++) {
  console.log("jeanmichel");

  // stuffs.push(
  //   new Triangle(
  //     vec2.fromValues(
  //       Math.floor(Math.random() * canvas.width - 10) + 10,
  //       Math.floor(Math.random() * canvas.height - 10) + 10
  //     ),
  //     vec2.fromValues(Math.random() * 2 - 1, Math.random() * 2 - 1),
  //     Math.random() * 5,
  //     Math.random() * 30,
  //     Math.abs(Math.random() * 5)
  //   )
  // );

  // stuffs.push(
  //   new Circle(
  //     vec2.fromValues(
  //       Math.floor(Math.random() * canvas.width - 10) + 10,
  //       Math.floor(Math.random() * canvas.height - 10) + 10
  //     ),
  //     vec2.fromValues(Math.random() * 2 - 1, Math.random() * 2 - 1),
  //     Math.random() * 0.5,
  //     Math.random() * 2,
  //     Math.abs(Math.random() * 5)
  //   )
  // );

  // stuffs.push(
  //   new Rectangle(
  //     vec2.fromValues(
  //       Math.floor(Math.random() * canvas.width - 10) + 10,
  //       Math.floor(Math.random() * canvas.height - 10) + 10
  //     ),
  //     vec2.fromValues(Math.random() * 2 - 1, Math.random() * 2 - 1),
  //     0,
  //     Math.random() * 7,
  //     Math.abs(Math.random() * 5)
  //   )
  // );
  stuffs.push(new Ruban(2));
}
console.log(stuffs[0]);
update();

function update() {
  requestAnimationFrame(update);

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  stuffs.forEach(stuff => {
    stuff.update(canvas);
    stuff.draw(ctx);
  });
}
