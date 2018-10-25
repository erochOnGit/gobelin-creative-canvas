let SHOOTING_DURATION = 15;
var SHOOTING_ANIMATION_DURATION = 4;

class ParticuleShooter {
  constructor(position, angle, scale, size) {
    this.position = position;

    this.etatAnimation = -1;
    this.time = 0;
    this.duration = 20000;
    this.particules = [];
    for (let i = 0; i < 2; i++) {
      this.particules.push(new Particule(this.position));
    }
  }

  fire() {
    if (this.etatAnimation >= 0) {
      return false;
    }
    let target = vec2.fromValues(this.position[0], this.position[1] + 300);

    this.time = 0;
    this.particules.forEach((part, index) => {
      part.positionOnFire[0] = this.position[0];
      part.positionOnFire[1] = this.position[1];
      part.target[0] = target[0] - this.position[0];
      part.target[1] = target[1] - this.position[1];
      part.time = 0;
    });
    // On commence l'animation
    this.etatAnimation = 1;
  }
  initParticule(particule) {
    let target = vec2.fromValues(this.position[0], this.position[1] + 300);

    particule.positionOnFire[0] = this.position[0];
    particule.positionOnFire[1] = this.position[1];
    particule.target[0] = target[0] - this.position[0];
    particule.target[1] = target[1] - this.position[1];
    particule.time = 0;
    return particule;
  }
  update(dt) {
    if (this.etatAnimation > 0) {
      this.time += dt;

      if (this.time < this.duration) {
        this.particules.push(this.initParticule(new Particule(this.position)));
        this.particules.forEach((particule, index) => {
          if (particule.time >= particule.duration) {
            this.particules.splice(index, 1);
          }
          particule.update(dt);
        });
        console.log(this.particules.length);
      } else {
        this.etatAnimation = -1;
      }
    }
  }
  draw(ctx) {
    // let frame = 0;

    // if (this.etatAnimation >= SHOOTING_DURATION) {
    //   // Si le déplacement a atteint ou dépassé le temps nécessaire pour s'effectuer, on le termine
    //   this.etatAnimation = -1;
    // } else if (this.etatAnimation >= 0) {
    //   // On calcule l'image (frame) de l'animation à afficher
    //   frame = Math.floor(this.etatAnimation / SHOOTING_ANIMATION_DURATION);
    //   if (frame > 3) {
    //     frame %= 4;
    //   }
    //   this.etatAnimation += 0.1;
    // }

    this.particules.forEach(particule => {
      particule.draw(ctx);
    });
  }
}
