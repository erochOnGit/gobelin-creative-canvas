let smoothDisplayNone = elt => {
  elt.style.opacity = "0";
  elt.addEventListener("click", e => {
    e.preventDefault();
  });
  setTimeout(() => {
    elt.style.display = "none";
  }, 500);
};

window.AudioContext =
  window.AudioContext || window.webkitAudioContext || window.mozAudioContext;

var canvasWidth = window.innerWidth;
var canvasHeight = window.innerHeight;

/**
 *
 * mouse stuffs
 *
 */
let mouseX = 0;
let mouseY = 0;
document.body.onmousemove = function(e) {
  // suivi de la position de la souris dans la console
  mouseX = e.clientX;
  mouseY = e.clientY;
};

/**
 *
 * Sound stuff
 *
 */
var audioCtx = new AudioContext();
var audioBuffer;
var audioSource;
var analyser = audioCtx.createAnalyser();
var frequencyData = new Uint8Array(analyser.frequencyBinCount);

/**
      Time stuff
    */
var DELTA_TIME = 0;
var LAST_TIME = Date.now();

/**
      Canvas stuff
    */
var sceneCanvas;
var sceneCtx;

var peopleCanvas;
let peopleCtx;

var lightCanvas;
let lightCtx;

let time = 0;
let scene;

let lightsSize = 10;
let moyenne = tab => {
  let tabTotal = 0;
  for (let i = 0; i < tab.length; i++) {
    tabTotal += tab[i];
  }

  return tabTotal / tab.length;
};
var opts = {
  barWidth: 10
};

function initSceneCanvas() {
  sceneCanvas = document.querySelector("canvas#scene");
  sceneCtx = sceneCanvas.getContext("2d");

  resize(sceneCanvas);
}

let drawScene = scene => {
  scene.sol.update(sceneCanvas);
  scene.sol.draw(sceneCtx);
};

function initPeopleCanvas() {
  peopleCanvas = document.querySelector("canvas#people");
  peopleCtx = peopleCanvas.getContext("2d");

  resize(peopleCanvas);
}

function initLightCanvas() {
  lightCanvas = document.querySelector("canvas#light");
  lightCtx = lightCanvas.getContext("2d");

  resize(lightCanvas);
}

function loadSound(url) {
  smoothDisplayNone(document.querySelector(".start"));

  var request = new XMLHttpRequest();
  request.open("GET", "./sounds/RISE.mp3", true);
  request.responseType = "arraybuffer";

  // Decode asynchronously
  request.onload = function() {
    audioCtx.decodeAudioData(
      request.response,
      function(buffer) {
        // success callback
        audioBuffer = buffer;

        // Create sound from buffer
        audioSource = audioCtx.createBufferSource();
        audioSource.buffer = audioBuffer;

        // connect the audio source to context's output
        audioSource.connect(analyser);
        analyser.connect(audioCtx.destination);

        // play sound
        audioSource.start();

        //initialisation
        scene = {
          sol: new Rectangle(
            vec2.fromValues(0, canvasHeight / 2),
            vec2.create(),
            0,
            1,
            canvasWidth
          ),
          people: [],
          lights: []
        };
        initPlayer(scene);

        scene.people.forEach(person => {
          console.log();
          scene.lights.push(new ParticuleShooter(person.position, 0, 1, 1));

          for (let phylloIndex = 0; phylloIndex < 25; phylloIndex++) {
            person.lights.push(
              new PhylloPoint(person.position, vec2.create(), 0, 1, lightsSize)
            );
          }
        });
        addListeners();
        frame();
      },
      function() {
        // error callback
        //
      }
    );
  };
  request.send();
}

/**
 * addListeners
 */
function addListeners() {
  window.addEventListener("resize", onResize.bind(this));
  rafId = requestAnimationFrame(frame);
}

/**
 * update
 * - Triggered on every TweenMax tick
 */
function frame() {
  // console.log(frequencyData)

  rafId = requestAnimationFrame(frame);

  DELTA_TIME = Date.now() - LAST_TIME;
  LAST_TIME = Date.now();

  time += DELTA_TIME / 1000;
  analyser.getByteFrequencyData(frequencyData);

  sceneCtx.clearRect(0, 0, canvasWidth, canvasHeight);
  peopleCtx.clearRect(0, 0, canvasWidth, canvasHeight);
  lightCtx.clearRect(0, 0, canvasWidth, canvasHeight);
  // drawScene(scene);
  handleText(frequencyData);

  scene.people.forEach(person => {
    person.move(person.player, peopleCanvas);
    person.drawPerson(peopleCtx, frequencyData);
  });

  // console.log(Math.floor(frequencyMoy) > 80);
  if (
    // true
    Math.floor(moyenne(frequencyData) > 80)
  ) {
    scene.lights.forEach(light => {
      light.fire();
    });
  }

  scene.lights.forEach(light => {
    light.update(DELTA_TIME);
    light.draw(lightCtx);
  });

  // average = cumul / 255;

  // console.log(average);
}

// let initScene = () => {};

/**
 * onResize
 * - Triggered when window is resized
 * @param  {obj} evt
 */
function onResize(canvas) {
  resize(sceneCanvas);
  resize(lightCanvas);
  resize(peopleCanvas);

  scene.people.forEach((person, index) => {
    person.setPosition(peopleCanvas, index);
  });
}

let resize = canvas => {
  canvasWidth = window.innerWidth * 2;
  canvasHeight = window.innerHeight * 2;

  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  canvas.style.width = canvasWidth / 2 + "px";
  canvas.style.height = canvasHeight / 2 + "px";
};
// function resize() {
//   // onResize(sceneCanvas);
//   // onResize(peopleCanvas);
//   // onResize(lightCanvas);
// }
// window.onresize = resize;

initSceneCanvas();
initPeopleCanvas();
initLightCanvas();
