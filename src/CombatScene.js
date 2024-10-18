import Entity from "./Entity.js";

const Type = {
    horny : {name:'horny', str: 'depression'},
    anxiety: {name:'anxiety', str: 'horny'},
    wrath: {name:'wrath', str: 'anxiety'},
    depression: {name:'depression', str: 'wrath'},
    physical: {name:'physical', str: 'depression'}
}

let AttackButton, MagicButton, resultText;
let selectedCharacter;

let currentCharacter = 0;

let team1, team2;
let arrow;
let onEndTurn;
let phase = 'select';

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
        self = this;

        AttackButton = this.add.sprite(400, 500, "Button").setInteractive();
        AttackButton.setScale(1, 0.5);
        AttackButton.text = this.add.text(350, 485, 'Attack', { fontSize: '32px', fill: '#000'});

        MagicButton = this.add.sprite(400, 550, "Button").setInteractive();
        MagicButton.setScale(1, 0.5);
        MagicButton.text = this.add.text(350, 535, 'Magic', { fontSize: '32px', fill: '#000'});

        team1.Create(this, 100, 100);
        team2.Create(this, 600, 100);

        team2.entities.forEach(element => {
            element.sprite.setInteractive()
            element.sprite.on('pointerdown', function(){
                if(element.alive && phase == 'combat')
                {
                    selectedCharacter.selectedAttack(element);
                    currentCharacter++;

                    if(currentCharacter >= team1.GetCharacterCount())
                    {
                        onEndTurn.emit('endTurn');
                        currentCharacter = 0;
                    }

                    selectedCharacter = team1.GetCharacter(currentCharacter);
                    phase = 'select';
                }
            });
        });

        arrow = this.add.sprite(0, 0, 'Arrow')
        arrow.scale = 0.2
        this.add.existing(arrow)

        onEndTurn = new Phaser.Events.EventEmitter();

        AttackButton.on('pointerdown', function(){
            selectedCharacter.selectedAttack = selectedCharacter.Attack;
            phase = 'combat';
        });

        MagicButton.on('pointerdown', function(){
            selectedCharacter.selectedAttack = selectedCharacter.MagicAttack;
            phase = 'combat';
        });

        onEndTurn.on('endTurn', function(){
            team2.entities.forEach(element => {
                let enemy = team1.GetRandomCharacter();
                element.Attack(enemy);
            });
        });

        team1.onTeam.on('death', function(){
            console.log('You lose');
            resultText = self.add.text(400, 300, 'You lose', { fontSize: '64px', fill: '#FFF'});
        });

        team2.onTeam.on('death', function(){
            console.log('You win');
            resultText = self.add.text(400, 300, 'You win', { fontSize: '64px', fill: '#FFF'});
        });

        selectedCharacter = team1.GetCharacter(0)
    }

    update()
    {
        if(selectedCharacter != null)
        {
            arrow.x = selectedCharacter.sprite.x
            arrow.y = selectedCharacter.sprite.y - 70
        }
    }
}