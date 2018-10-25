let handleText = frequencyData => {
  let bassMoy = moyenne(
    frequencyData.filter((data, index) => {
      return index < 10;
    })
  );
  // let highMoy = moyenne(
  //   frequencyData.filter((data, index) => {
  //     return index < 10;
  //   })
  // );
  // let mediumMoy = moyenne(
  //   frequencyData.filter((data, index) => {
  //     return index < 10;
  //   })
  // );
  let upperText = document.querySelector(".titre .text-hauts");
  let lowerText = document.querySelector(".titre .text-bas");
  let centreText = document.querySelector(".titre .text-centres");

  let subUpperText = document.querySelector(".sous-titre .text-hauts");
  let subLowerText = document.querySelector(".sous-titre .text-bas");
  let subCentreText = document.querySelector(".sous-titre .text-centres");
  setTimeout(() => {
    upperText.style.transform =
      "rotateY(" +
      (sceneCanvas.width / 4 - mouseX) / 10 +
      "deg) rotateX(" +
      (mouseY - sceneCanvas.height / 4) / 10 +
      "deg) translateZ(" +
      -bassMoy +
      "px) scale(" +
      bassMoy / 200 +
      ")";
    subUpperText.style.transform =
      "rotateY(" +
      (mouseX - sceneCanvas.width / 4) / 10 +
      "deg) rotateX(" +
      (mouseY - sceneCanvas.height / 4) / 10 +
      "deg) translateZ(" +
      -bassMoy +
      "px) scale(" +
      bassMoy / 200 +
      ")";
  }, 320);

  setTimeout(() => {
    centreText.style.transform =
      "rotateY(" +
      (sceneCanvas.width / 4 - mouseX) / 10 +
      "deg) rotateX(" +
      (mouseY - sceneCanvas.height / 4) / 10 +
      "deg) translateZ(" +
      -bassMoy +
      "px) scale(" +
      bassMoy / 200 +
      ")";
    subCentreText.style.transform =
      "rotateY(" +
      (mouseX - sceneCanvas.width / 4) / 10 +
      "deg) rotateX(" +
      (mouseY - sceneCanvas.height / 4) / 10 +
      "deg) translateZ(" +
      -bassMoy +
      "px) scale(" +
      bassMoy / 200 +
      ")";
  }, 120);

  lowerText.style.transform =
    "rotateY(" +
    (sceneCanvas.width / 4 - mouseX) / 10 +
    "deg) rotateX(" +
    (mouseY - sceneCanvas.height / 4) / 10 +
    "deg) translateZ(" +
    -bassMoy +
    "px) scale(" +
    bassMoy / 200 +
    ")";
  subLowerText.style.transform =
    "rotateY(" +
    (mouseX - sceneCanvas.width / 4) / 10 +
    "deg) rotateX(" +
    (mouseY - sceneCanvas.height / 4) / 10 +
    "deg) translateZ(" +
    -bassMoy +
    "px) scale(" +
    bassMoy / 200 +
    ")";
};
