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

let time = 0;
let scene;
let phylloPointsDistance = 10;
let phylloAngle = 6;
let dallesSize = 10;
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

  onResize();
}

function initPeopleCanvas() {
  peopleCanvas = document.querySelector("canvas#people");
  peopleCtx = peopleCanvas.getContext("2d");

  onResize();
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
          dalles: []
        };
        for (let phylloIndex = 0; phylloIndex < 25; phylloIndex++) {
          scene.dalles.push(
            new PhylloPoint(
              vec2.fromValues(canvasWidth / 4, canvasHeight / 3),
              vec2.create(),
              0,
              1,
              dallesSize
            )
          );
        }
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

  scene.sol.update(sceneCanvas);
  // stuff.updateSize(frequencyData[0])
  //   console.log(moyenne(frequencyData) / 100);
  scene.sol.draw(sceneCtx);
  phylloPointsDistance = moyenne(frequencyData) / 2;
  phylloAngle =
    Math.floor(
      moyenne(
        frequencyData.filter((data, index) => {
          return index < 10;
        })
      )
    ) / 10000;

  scene.dalles.forEach((dalle, index) => {
    dalle.draw(
      sceneCtx,
      index * 4,
      phylloAngle,
      phylloPointsDistance,
      moyenne(frequencyData) / 100
    );
  });

  // average = cumul / 255;

  // console.log(average);
}

let initScene = () => {};

/**
 * onResize
 * - Triggered when window is resized
 * @param  {obj} evt
 */
function onResize(evt) {
  canvasWidth = window.innerWidth * 2;
  canvasHeight = window.innerHeight * 2;

  sceneCanvas.width = canvasWidth;
  sceneCanvas.height = canvasHeight;
  sceneCanvas.style.width = canvasWidth / 2 + "px";
  sceneCanvas.style.height = canvasHeight / 2 + "px";

  people.width = canvasWidth;
  people.height = canvasHeight;
  people.style.width = canvasWidth / 2 + "px";
  people.style.height = canvasHeight / 2 + "px";
}

initSceneCanvas();
initPeopleCanvas();
loadSound();
