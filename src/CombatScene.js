import Entity from "./Entity.js";

const Type = {
    horny : {name:'horny', str: 'depression'},
    anxiety: {name:'anxiety', str: 'horny'},
    wrath: {name:'wrath', str: 'anxiety'},
    depression: {name:'depression', str: 'wrath'},
    physical: {name:'physical', str: 'depression'}
}

let AttackButton, MagicButton, Arrow;
let selectedCharacter;

let currentCharacter = 0;
let charactersQueue;

let team1, team2;

/*Escena de Phaser*/
export default class CombatScene extends Phaser.Scene {
    constructor(){
        super({key: "combat"});
    }

    init(team1, team2){
        this.team1 = team1;
        this.team2 = team2;
    }

    preload(){
        this.team1.Preload(this);
        this.team2.Preload(this);

        this.load.image("Button", "assets/Button.png");
        this.load.image("Arrow", "assets/Arrow.png");
    }

    create(){
        AttackButton = this.add.sprite(400, 500, "Button").setInteractive();

        this.team1.Create(this, 100, 100);
        this.team2.Create(this, 600, 100);

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