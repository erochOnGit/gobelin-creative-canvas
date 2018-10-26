let initPlayer = scene => {
  scene.people.push(
    new Person(
      "fnaticCrew.png",
      "REKKLES",
      vec2.fromValues((canvasWidth / 9) * 2, canvasHeight / 2.5),
      PLAYER.REKKLES,
      2.5
    )
  );
  console.log(2, 2.5);
  console.log((canvasWidth / 9) * 2, canvasHeight / 2.5);
  scene.people.push(
    new Person(
      "fnaticCrew.png",
      "CAPS",
      vec2.fromValues((canvasWidth / 9) * 3, canvasHeight / 2),
      PLAYER.CAPS,
      2
    )
  );
  scene.people.push(
    new Person(
      "fnaticCrew.png",
      "BROXAH",
      vec2.fromValues((canvasWidth / 9) * 4, canvasHeight / 1.7),
      PLAYER.BROXAH,
      1.7
    )
  );
  scene.people.push(
    new Person(
      "fnaticCrew.png",
      "HYLLISSANG",
      vec2.fromValues((canvasWidth / 9) * 5, canvasHeight / 1.7),
      PLAYER.HYLLISSANG,
      1.7
    )
  );
  scene.people.push(
    new Person(
      "fnaticCrew.png",
      "BWIPO",
      vec2.fromValues((canvasWidth / 9) * 6, canvasHeight / 2),
      PLAYER.BWIPO,
      2
    )
  );
  scene.people.push(
    new Person(
      "fnaticCrew.png",
      "SOAZ",
      vec2.fromValues((canvasWidth / 9) * 7, canvasHeight / 2.5),
      PLAYER.SOAZ,
      2.5
    )
  );
};
