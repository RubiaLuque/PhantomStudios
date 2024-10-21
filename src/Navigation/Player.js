import Entity from "../CombatSystem/Entity.js";
export default class player extends Phaser.GameObjects.Image {
    constructor(scene, x, y){
        super(scene, x, y, 'Main_Team')

        this.scale = 0.5;
        scene.add.existing(this);
        this.wKey = this.scene.input.keyboard.addKey('W')
        this.aKey = this.scene.input.keyboard.addKey('A')
        this.dKey = this.scene.input.keyboard.addKey('D')
        this.sKey = this.scene.input.keyboard.addKey('S')

        let Javi, Fueyo, Mika, Muxu
        
        Javi = new Entity('Javi', 10, 15, Type.horny, 2, "Javi", scene.sound, 'oioioi')
        Mika = new Entity('Mika', 5, 20, Type.depression, 2, "Mika", scene.sound, 'what_the_sigma')
        Fueyo = new Entity('Fueyo', 7, 17, Type.wrath, 2, "Fueyo", scene.sound, 'shiny')
        Muxu = new Entity('Muxu', 6, 12, Type.anxiety, 4, "Muxu", scene.sound, 'skibidiToilet')

        this.team = [Javi, Mika, Fueyo, Muxu]
    }

    Move(){
        if (this.dKey.isDown) this.x++;
        if (this.aKey.isDown) this.x--;
        if (this.sKey.isDown) this.y++;
        if (this.wKey.isDown) this.y--;
    }

    preUpdate(){
        this.Move()
    }
}

const Type = {
    horny : {name:'horny', str: 'depression'},
    anxiety: {name:'anxiety', str: 'horny'},
    wrath: {name:'wrath', str: 'anxiety'},
    depression: {name:'depression', str: 'wrath'},
    physical: {name:'physical', str: 'depression'}
}