window.AudioContext =
  window.AudioContext || window.webkitAudioContext || window.mozAudioContext;

var canvasWidth = window.innerWidth;
var canvasHeight = window.innerHeight;

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
let handleText = frequencyData => {
  let bassMoy = moyenne(
    frequencyData.filter((data, index) => {
      return index < 10;
    })
  );
  let upperText = document.querySelector(".text-hauts");
  let lowerText = document.querySelector(".text-bas");
  let centreText = document.querySelector(".text-centres");
  upperText.style.transform = "scale(" + bassMoy / 100 + ")";
  lowerText.style.transform = "scale(" + bassMoy / 100 + ")";
  centreText.style.transform = "scale(" + bassMoy / 100 + ")";
  console.log(bassMoy / 100);
};

function initSceneCanvas() {
  sceneCanvas = document.querySelector("canvas#scene");
  sceneCtx = sceneCanvas.getContext("2d");

  onResize(sceneCanvas);
}

let drawScene = scene => {
  scene.sol.update(sceneCanvas);
  scene.sol.draw(sceneCtx);
};

function initPeopleCanvas() {
  peopleCanvas = document.querySelector("canvas#people");
  peopleCtx = peopleCanvas.getContext("2d");

  onResize(peopleCanvas);
}
function initLightCanvas() {
  lightCanvas = document.querySelector("canvas#light");
  lightCtx = lightCanvas.getContext("2d");

  onResize(lightCanvas);
}

function loadSound(url) {
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

        scene.people.push(
          new Person(
            "sprite1.png",
            "rekkles",
            vec2.fromValues(canvasWidth / 2, canvasHeight / 1.5),
            DIRECTION.HAUT
          )
        );

        // scene.people.push(
        //   new Person(
        //     "sprite1.png",
        //     "caps",
        //     vec2.fromValues(canvasWidth / 7, canvasHeight / 3),
        //     DIRECTION.HAUT
        //   )
        // );
        scene.lights.push(
          new ParticuleShooter(
            vec2.fromValues(canvasWidth / 2, canvasHeight / 1.5, 200),
            0,
            1,
            1
          )
        );

        scene.people.forEach(person => {
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
  drawScene(scene);
  handleText(frequencyData);
  scene.people.forEach(person => {
    person.move(DIRECTION.HAUT, peopleCanvas);
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
  canvasWidth = window.innerWidth * 2;
  canvasHeight = window.innerHeight * 2;

  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  canvas.style.width = canvasWidth / 2 + "px";
  canvas.style.height = canvasHeight / 2 + "px";
}

initSceneCanvas();
initPeopleCanvas();
initLightCanvas();
loadSound();
