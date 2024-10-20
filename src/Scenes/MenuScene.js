import Entity from "../CombatSystem/Entity.js";

const Type = {
    horny : {name:'horny', str: 'depression'},
    anxiety: {name:'anxiety', str: 'horny'},
    wrath: {name:'wrath', str: 'anxiety'},
    depression: {name:'depression', str: 'wrath'},
    physical: {name:'physical', str: 'depression'}
}

let Javi, Fueyo, Mika, Muxu, Fork;

/*Escena de Phaser*/
export default class MenuScene extends Phaser.Scene {
    constructor(){
        super({key: "menu"});
    }

    init(){
    }

    preload(){
        this.load.image("Javi", "assets/images/Javi.png");
        this.load.image("Fueyo", "assets/images/Fueyo.png");
        this.load.image("Mika", "assets/images/Mika.png");
        this.load.image("Muxu", "assets/images/Muxu.png");
        this.load.image("Fork", "assets/images/Fork.png");
    }

    create(){
        Javi = new Phaser.GameObjects.Sprite(this, 100, 100, "Javi");
        Fueyo = new Phaser.GameObjects.Sprite(this, 100, 220, "Fueyo");
        Mika = new Phaser.GameObjects.Sprite(this, 100, 340, "Mika");
        Muxu = new Phaser.GameObjects.Sprite(this, 100, 460, "Muxu");

        Fork = new Phaser.GameObjects.Sprite(this, 700, 300, "Fork");
        
        this.add.existing(Javi);
        this.add.existing(Fueyo);
        this.add.existing(Mika);
        this.add.existing(Muxu);

        this.add.existing(Fork);

        Javi.scale = 0.2;
        Fueyo.scale = 0.2;
        Mika.scale = 0.2;
        Muxu.scale = 0.2;

        Fork.scale = 0.4;

        Javi.entity = new Entity('Javi', 10, 15, Type.horny);
        Fueyo.entity = new Entity('Fueyo', 10, 15, Type.wrath);
        Mika.entity = new Entity('Mika', 10, 15, Type.depression);
        Muxu.entity = new Entity('Muxu', 10, 15, Type.anxiety);

        AttackButton.on('pointerdown', function(){
            selectedCharacter.entity.Attack(Fork.entity);
            currentCharacter++;
            if(currentCharacter > 3) currentCharacter = 0;
            selectedCharacter = charactersQueue[currentCharacter];
        });
    }

    update()
    {
        Arrow.y = selectedCharacter.y - 70;
        Arrow.x = selectedCharacter.x;
    }
}