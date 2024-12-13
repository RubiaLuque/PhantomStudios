export default class Cafeteria extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture){
        console.log("C")
        super(scene, x, y, texture)

        this.scale = 0.35;

        scene.add.existing(this);
    }
}