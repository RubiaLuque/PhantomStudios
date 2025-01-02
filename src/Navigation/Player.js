import Entity from "../CombatSystem/Entity.js";
import { EntityData } from "../CombatSystem/Data/EntityData.js";
import Team from "../CombatSystem/Team.js";

let vel = 200;
let canRoll = false; //da error
let ableToJump = false;

export default class player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        console.log("A")
        super(scene, x, y, 'Javi')

        this.scale = 0.05;
        this.setOrigin(0.5, 1);
        
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.wKey = this.scene.input.keyboard.addKey('W')
        this.aKey = this.scene.input.keyboard.addKey('A')
        this.dKey = this.scene.input.keyboard.addKey('D')
        this.sKey = this.scene.input.keyboard.addKey('S')
        this.eKey = this.scene.input.keyboard.addKey('E')
        this.spaceKey = this.scene.input.keyboard.addKey('SPACE')
        this.canMove = true;

       this.team = []; 
       EntityData.entities.forEach(entity =>
            this.team.push(Entity.TranslateEntity(entity, scene))
       )
       this.teamClass = new Team(this.team, "Party")

        this.scene = scene
        
    }

    Move(){
        if(this.canMove == false) return;

        if (this.body.deltaY() > 0 && this.body.onFloor()) ableToJump = true

        let direction = new Phaser.Math.Vector2(0, 0);
        if (this.dKey.isDown) direction.x++;
        if (this.aKey.isDown) direction.x--;
        if (this.wKey.isDown && ableToJump) {
            this.body.setVelocityY(vel * -3)
            ableToJump = false;
        }

        direction.normalize();
        this.body.setVelocityX(direction.x * vel);
    }

    preUpdate(){
        this.Move()
        if(this.spaceKey.isDown && canRoll){this.Roll()}
    }

    update(){

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