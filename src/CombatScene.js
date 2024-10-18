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
let selectedEnemy;

let currentCharacter = 0;

let team1, team2;
let arrow;

/*Escena de Phaser*/
export default class CombatScene extends Phaser.Scene {
    constructor(){
        super({key: 'combat'});
    }

    init(teams){
        team1 = teams.team1;
        team2 = teams.team2;
    }

    preload(){
        team1.Preload(this);
        team2.Preload(this);

        this.load.image("Button", "assets/images/Button.png");
        this.load.image("Arrow", "assets/images/Arrow.png");
    }

    create(){
        AttackButton = this.add.sprite(400, 500, "Button").setInteractive();

        team1.Create(this, 100, 100);
        team2.Create(this, 600, 100);

        team2.entities.forEach(element => {
            element.sprite.setInteractive()
            element.sprite.on('pointerdown', function(){
                selectedEnemy = element
            });
        });

        arrow = this.add.sprite(0, 0, 'Arrow')
        arrow.scale = 0.2
        this.add.existing(arrow)

        AttackButton.on('pointerdown', function(){
            selectedCharacter.Attack(selectedEnemy);
            currentCharacter++;
            if(currentCharacter > 3) currentCharacter = 0;
            selectedCharacter = team1.GetCharacter(currentCharacter)
        });

        selectedCharacter = team1.GetCharacter(0)
        selectedEnemy = team2.GetCharacter(0)
    }

    update()
    {
        arrow.x = selectedCharacter.sprite.x
        arrow.y = selectedCharacter.sprite.y - 70
    }
}