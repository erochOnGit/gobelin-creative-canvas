var canvas = document.querySelector("#myCanvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var ctx = canvas.getContext("2d");

// var o = {
//   a: {
//     b: 2
//   }
// };
// // 2 objets sont créés. L'un est référencé par l'autre en tant que propriété.
// // L'autre est référencé car assigné à la variable 'o'.
// // Aucun des deux ne peut être ramassé par le ramasse-miettes.

// var o2 = o; // la variable 'o2' est le deuxième élément qui
// // référence l'objet o
// o = 1; // désormais, l'objet qui était dans 'o' possède
// // une seule référence de o2 vers lui

// console.log(o2);
// let tab = ["a", "b", "c"];
// tab.splice(0, 0, "d");
// tab.pop();
// console.log(tab);
let stuffs = [];
for (let index = 0; index < 10; index++) {
  console.log("jeanmichel");
  stuffs.push(new Ruban(40));
}
console.log(stuffs[0]);
let time = 0;
update();
function update() {
  requestAnimationFrame(update);

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  stuffs.forEach(stuff => {
    stuff.update(canvas, time);
    stuff.draw(ctx);
  });
  time += 0.01;
}
