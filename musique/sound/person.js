var PLAYER = {
  HYLLISSANG: 0,
  REKKLES: 1,
  BWIPO: 2,
  BROXAH: 3,
  CAPS: 4,
  SOAZ: 5
};
var DUREE_ANIMATION = 12;
var DUREE_DEPLACEMENT = 142;
var TILE_SIZE = 0;

class Person {
  constructor(url, name, position, player, decalage) {
    this.name = name;
    this.position = position || vec2.create();
    this.lights = [];
    this.player = player;
    this.etatAnimation = -1;
    this.phylloPointsDistance = 10;
    this.phylloAngle = 6;
    this.decalage = decalage;

    // Chargement de l'image dans l'attribut image
    this.image = new Image();
    this.image.referenceDuPerso = this;
    this.image.onload = function() {
      if (!this.complete)
        throw 'Erreur de chargement du sprite nommé "' + url + '".';

      // Taille du personnage
      this.referenceDuPerso.largeur = this.width / 12;
      this.referenceDuPerso.hauteur = this.height / 6;
    };
    this.image.src = "sprites/" + url;
  }
  setPosition(canvas, index, décalage) {
    this.position = vec2.fromValues(
      (canvasWidth / 9) * (index + 2),
      canvasHeight / this.decalage
    );
  }
  getNearCoordinate(player) {
    var coord = { x: this.position[0], y: this.position[1] };
    switch (player) {
      case PLAYER.HYLLISSANG:
        coord.y += TILE_SIZE;
        break;
      case PLAYER.HYLLISSANG:
        coord.x -= TILE_SIZE;
        break;
      case PLAYER.HYLLISSANG:
        coord.x += TILE_SIZE;
        break;
      case PLAYER.HYLLISSANG:
        coord.y -= TILE_SIZE;
        break;
    }
    return coord;
  }

  move(player, canvas) {
    // On ne peut pas se déplacer si un mouvement est déjà en cours !
    if (this.etatAnimation >= 0) {
      return false;
    }
    // On change la player du personnage
    this.player = player;

    // On vérifie que la case demandée est bien située dans la carte
    var prochainePosition = this.getNearCoordinate(player);
    if (
      prochainePosition.x < 0 ||
      prochainePosition.y < 0 ||
      prochainePosition.x >= canvas.width ||
      prochainePosition.y >= canvas.height
    ) {
      // On retourne un booléen indiquant que le déplacement ne s'est pas fait,
      // Ça ne coute pas cher et ca peut toujours servir
      return false;
    }
    // On commence l'animation
    this.etatAnimation = 1;
    // On effectue le déplacement
    this.position[0] = prochainePosition.x;
    this.position[1] = prochainePosition.y;

    return true;
  }

  drawPerson(context, frequencyData) {
    var frame = 0; // Numéro de l'image à prendre pour l'animation
    var decalageX = 0,
      decalageY = 0; // Décalage à appliquer à la position du personnage
    if (this.etatAnimation >= DUREE_DEPLACEMENT) {
      // Si le déplacement a atteint ou dépassé le temps nécessaire pour s'effectuer, on le termine
      this.etatAnimation = -1;
    } else if (this.etatAnimation >= 0) {
      // On calcule l'image (frame) de l'animation à afficher
      frame = Math.floor(this.etatAnimation / DUREE_ANIMATION);
      if (frame > DUREE_ANIMATION - 1) {
        frame %= 12;
      }

      // Nombre de pixels restant à parcourir entre les deux cases
      var pixelsAParcourir =
        TILE_SIZE - TILE_SIZE * (this.etatAnimation / DUREE_DEPLACEMENT);

      // À partir de ce nombre, on définit le décalage en x et y.
      // NOTE : Si vous connaissez une manière plus élégante que ces quatre conditions, je suis preneur
      if (this.player == PLAYER.REKKLES) {
        decalageY = pixelsAParcourir;
      } else if (this.player == PLAYER.HYLLISSANG) {
        decalageY = -pixelsAParcourir;
      } else if (this.player == PLAYER.BROXAH) {
        decalageX = pixelsAParcourir;
      } else if (this.player == PLAYER.BWIPO) {
        decalageX = -pixelsAParcourir;
      }

      this.etatAnimation += 1;
    }
    /*
     * Si aucune des deux conditions n'est vraie, c'est qu'on est immobile, 
     * donc il nous suffit de garder les valeurs 0 pour les variables 
     * frame, decalageX et decalageY
     */

    this.lights.forEach((point, index) => {
      point.setPosition(
        vec2.fromValues(
          this.position[0] + decalageX,
          this.position[1] + decalageY
        )
      );
      this.phylloPointsDistance = moyenne(frequencyData) / 2;
      this.phylloAngle =
        Math.floor(
          moyenne(
            frequencyData.filter((data, index) => {
              return index < 10;
            })
          )
        ) / 10000;
      point.draw(
        sceneCtx,
        index * 4,
        this.phylloAngle,
        this.phylloPointsDistance,
        moyenne(frequencyData) / 100
      );
    });

    context.drawImage(
      this.image,
      this.largeur * frame,
      this.player * this.hauteur, // Point d'origine du rectangle source à prendre dans notre image
      this.largeur,
      this.hauteur, // Taille du rectangle source (c'est la taille du personnage)
      this.position[0] - this.largeur / 4 + 15 + decalageX,
      this.position[1] - this.hauteur / 2 + 10 + decalageY,
      this.largeur / 2,
      this.hauteur / 2 // Taille du rectangle destination (c'est la taille du personnage)
    );
  }
}
