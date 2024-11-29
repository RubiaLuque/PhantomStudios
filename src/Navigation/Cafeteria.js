export default class Cafeteria extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y){
        console.log("C")
        super(scene, x, y, 'Cafeteria')

        this.scale = 0.35;

        scene.add.existing(this);
    }
}