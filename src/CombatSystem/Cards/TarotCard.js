//Debe tener:
// - Efecto
// - imagen
// - tipo de carta
// - animacion de entrada


export default class TarotCard extends Phaser.GameObjects.Sprite{

    constructor(scene, x, y, type) {
        super(scene, x, y);
        this.type = type;
    }



    //Metodo de las animaciones
    CardAnimation() {
        
    }

    SetCardPosition(x, y) {
        this.x = x;
        this.y = y;
    }

    SetCardScale(w, h) {
        this.setSize(w, h);
    }
}
