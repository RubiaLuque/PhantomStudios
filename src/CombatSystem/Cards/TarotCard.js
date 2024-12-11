//Debe tener:
// - Efecto
// - imagen
// - tipo de carta
// - animacion de entrada


export default class TarotCard extends Phaser.GameObjects.Sprite{

    constructor(scene, x, y, texture, funct) {
        super(scene, x, y, texture);
        this.funct = funct;
        this.scene.add.existing(this);
    }

    DoAction(team) {
        this.funct(team);
    }

    SetCardPosition(x, y) {
        this.x = x;
        this.y = y;
    }

    SetCardScale(w, h) {
        this.setScale(w, h);
    }
}
