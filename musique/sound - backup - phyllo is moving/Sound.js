/**
 * Created by bculas on 28/10/2016.
 */

/**
 *
 * AUDIO SETUP
 *
 */
var audioCtx = new AudioContext();
var audioBuffer;
var audioSource;
var analyser = audioCtx.createAnalyser();
var frequencyData = new Uint8Array(analyser.frequencyBinCount);

var lastLightning = 0;

var maxRain;

function loadSound(url) {
  var request = new XMLHttpRequest();
  request.open("GET", "./assets/RISE.mp3", true);
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
function frame() {
  analyser.getByteFrequencyData(frequencyData);

  var nbBars = 1024 / 4;

  var cumul = 0;
  var average = 0;

  for (var i = 0; i < nbBars; i++) {
    // get the frequency according to current i
    var percentIdx = i / nbBars;
    var frequencyIdx = Math.floor(1024 * percentIdx);

    // this.g.drawRect( i * barWidth + ( i * margin ), this.height - frequencyData[frequencyIdx] , barWidth, frequencyData[frequencyIdx] );

    cumul += frequencyData[frequencyIdx];
  }
  //Not convincing
  /**if (frequencyData[4]>220 || frequencyData[8]>220){

            if (canSendLightning){
                canSendLightning= false;
                var i;
                if (frequencyIdx/4 == 2)
                    i = Math.floor(random(0,2));
                else
                    i = i = Math.floor(random(3,5));

                layers[i].push(new Lightning(i,ctx));
                console.log(frequencyData[4] + " / " + frequencyData[8] + " / " + "ECLAIR");
            }
        }
     else if (frequencyData[4]<220 && frequencyData[8]<220){
                canSendLightning = true;
        }**/

  var total = 0;
  for (var i = 0; i < frequencyData.length; i++) {
    total += frequencyData[i];
  }
  var avg = total / frequencyData.length;
  maxRain = Math.floor(avg / 4);

  if (frequencyData[4] > 220 || frequencyData[8] > 220) {
    var now = Date.now();

    var delay = 2000;
    if (frequencyData[4] > 240 || frequencyData[8] > 240) delay = 1000;

    if (now - lastLightning > delay) {
      lastLightning = now;
      var i;
      if (frequencyIdx / 4 == 2) i = Math.floor(random(0, 2));
      else i = Math.floor(random(3, 5));

      var l = new Lightning(i, ctx);
      lightnings.push(l);
      layers[i].push(l);
    }
  }

  //console.log(frequencyIdx / 4 + " : " + frequencyData[frequencyIdx-4] + " / " +1 + frequencyIdx / 4 + " : " + frequencyData[frequencyIdx] + " / " + 1 + frequencyIdx / 4 + " : " + frequencyData[frequencyIdx + 4]);

  average = cumul / 255;

  // console.log(average);
}
