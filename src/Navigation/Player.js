export default class player extends Phaser.GameObjects.Image {
    constructor(scene, x, y){
        super(scene, x, y, 'player')
        scene.add.existing(this);
        this.wKey = this.scene.input.keyboard.addKey('W')
        this.aKey = this.scene.input.keyboard.addKey('A')
        this.dKey = this.scene.input.keyboard.addKey('D')
        this.sKey = this.scene.input.keyboard.addKey('S')
    }

    Move(){
        if (this.dKey.isDown) this.x++;
        if (this.aKey.isDown) this.x--;
        if (this.sKey.isDown) this.y++;
        if (this.wKey.isDown) this.y--;
    }

    preUpdate(){
        this.Move()
        console.log(this.x, this.y)
    }
}