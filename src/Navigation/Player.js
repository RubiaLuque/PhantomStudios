import Entity from "../CombatSystem/Entity.js";

let vel = 1.5;
let canRoll = true;
export default class player extends Phaser.GameObjects.Image {
    constructor(scene, x, y){
        super(scene, x, y, 'Main_Team')

        this.scale = 0.5;
        scene.add.existing(this);
        this.wKey = this.scene.input.keyboard.addKey('W')
        this.aKey = this.scene.input.keyboard.addKey('A')
        this.dKey = this.scene.input.keyboard.addKey('D')
        this.sKey = this.scene.input.keyboard.addKey('S')
        this.spaceKey = this.scene.input.keyboard.addKey('SPACE')

        let Javi, Fueyo, Mika, Muxu
        
        Javi = new Entity('Javi', 10, 15, Type.horny, 2, "Javi", scene, 'oioioi')
        Mika = new Entity('Mika', 5, 20, Type.depression, 2, "Mika", scene, 'what_the_sigma')
        Fueyo = new Entity('Fueyo', 7, 17, Type.wrath, 2, "Fueyo", scene, 'shiny')
        Muxu = new Entity('Muxu', 6, 12, Type.anxiety, 4, "Muxu", scene, 'skibidiToilet')

        this.team = [Javi, Mika, Fueyo, Muxu]
        this.scene = scene
    }

    Move(){
        let direction = new Phaser.Math.Vector2(0, 0);
        if (this.dKey.isDown) direction.x++;
        if (this.aKey.isDown) direction.x--;
        if (this.sKey.isDown) direction.y++;
        if (this.wKey.isDown) direction.y--;

        direction.normalize();
        this.x += direction.x * vel;
        this.y += direction.y * vel;
    }

    preUpdate(){
        this.Move()
        if(this.spaceKey.isDown && canRoll){this.Roll()}
    }

    Roll()
    {
        let self = this
        canRoll = false;
        vel = 5;

        this.scene.time.addEvent({ delay : 5,
        callback: function(){
            self.rotation += 0.1
            if(self.rotation >= 3)
            {
                self.rotation = 0
                self.scene.time.removeEvent(this)
                vel = 1.5;
                self.scene.time.delayedCall(500, function(){canRoll = true;} );
            }
        },
        loop: true });
    }
}

const Type = {
    horny : {name:'horny', str: 'depression'},
    anxiety: {name:'anxiety', str: 'horny'},
    wrath: {name:'wrath', str: 'anxiety'},
    depression: {name:'depression', str: 'wrath'},
    physical: {name:'physical', str: 'depression'}
}