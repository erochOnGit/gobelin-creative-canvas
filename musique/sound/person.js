var DIRECTION = {
  BAS: 0,
  GAUCHE: 1,
  DROITE: 2,
  HAUT: 3
};
var DUREE_ANIMATION = 4;
var DUREE_DEPLACEMENT = 15;
var TILE_SIZE = 0;

class Person {
  constructor(url, name, position, direction) {
    this.name = name;
    this.position = position || vec2.create();
    this.lights = [];
    this.direction = direction;
    this.etatAnimation = -1;
    this.phylloPointsDistance = 10;
    this.phylloAngle = 6;

    // Chargement de l'image dans l'attribut image
    this.image = new Image();
    this.image.referenceDuPerso = this;
    this.image.onload = function() {
      if (!this.complete)
        throw 'Erreur de chargement du sprite nommé "' + url + '".';

      // Taille du personnage
      this.referenceDuPerso.largeur = this.width / 4;
      this.referenceDuPerso.hauteur = this.height / 4;
    };
    this.image.src = "sprites/" + url;
  }

  getNearCoordinate(direction) {
    var coord = { x: this.position[0], y: this.position[1] };
    switch (direction) {
      case DIRECTION.BAS:
        coord.y += TILE_SIZE;
        break;
      case DIRECTION.GAUCHE:
        coord.x -= TILE_SIZE;
        break;
      case DIRECTION.DROITE:
        coord.x += TILE_SIZE;
        break;
      case DIRECTION.HAUT:
        coord.y -= TILE_SIZE;
        break;
    }
    return coord;
  }

  move(direction, canvas) {
    // On ne peut pas se déplacer si un mouvement est déjà en cours !
    if (this.etatAnimation >= 0) {
      return false;
    }
    // On change la direction du personnage
    this.direction = direction;

    // On vérifie que la case demandée est bien située dans la carte
    var prochainePosition = this.getNearCoordinate(direction);
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
      if (frame > 3) {
        frame %= 4;
      }

      // Nombre de pixels restant à parcourir entre les deux cases
      var pixelsAParcourir =
        TILE_SIZE - TILE_SIZE * (this.etatAnimation / DUREE_DEPLACEMENT);

      // À partir de ce nombre, on définit le décalage en x et y.
      // NOTE : Si vous connaissez une manière plus élégante que ces quatre conditions, je suis preneur
      if (this.direction == DIRECTION.HAUT) {
        decalageY = pixelsAParcourir;
      } else if (this.direction == DIRECTION.BAS) {
        decalageY = -pixelsAParcourir;
      } else if (this.direction == DIRECTION.GAUCHE) {
        decalageX = pixelsAParcourir;
      } else if (this.direction == DIRECTION.DROITE) {
        decalageX = -pixelsAParcourir;
      }

      this.etatAnimation += 0.1;
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
      this.direction * this.hauteur, // Point d'origine du rectangle source à prendre dans notre image
      this.largeur,
      this.hauteur, // Taille du rectangle source (c'est la taille du personnage)
      this.position[0] - this.largeur / 2 + decalageX,
      this.position[1] - this.hauteur + decalageY,
      this.largeur,
      this.hauteur // Taille du rectangle destination (c'est la taille du personnage)
    );
  }
}
