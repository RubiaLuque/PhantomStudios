import CustomButton from "./CustomButton.js";
import DamageText from "./DamageText.js";

const Type = {
    horny : {name:'horny', str: 'depression'},
    anxiety: {name:'anxiety', str: 'horny'},
    wrath: {name:'wrath', str: 'anxiety'},
    depression: {name:'depression', str: 'wrath'},
    physical: {name:'physical', str: 'depression'}
}

let AttackButton, MagicButton, resultText, damageText;
let selectedCharacter;

let XcamVel = 0.05;
let YcamVel = 0.1;

let currentCharacter = 0;

let team1, team2;
let arrow;
let onEndTurn;
let phase = 'select';

const freqPositions = [50, 60, 70, 80];

let audioElement, audioContext, analyser, dataArray, source, bufferLength;

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

        this.load.audio('Reach_Out', [ 'assets/music/Reach_Out.mp3' ]);
        this.load.audio('oioioi', [ 'assets/music/oioioi.wav' ]);
    }

    create(){
        self = this;

        AttackButton = new CustomButton(this, 400, 400, "Button", "Attack", 
            function(){
                selectedCharacter.selectedAttack = selectedCharacter.Attack;
                phase = 'combat';
                team2.entities.forEach(element => { element.sprite.setInteractive(); });
            }
        );

        MagicButton = new CustomButton(this, 400, 500, "Button", "Magic",
            function(){
                selectedCharacter.selectedAttack = selectedCharacter.MagicAttack;
                phase = 'combat';
                team2.entities.forEach(element => { element.sprite.setInteractive(); });
            }
        );

        team1.Create(this, 100, 100, this);
        team2.Create(this, 600, 100, this);

        team2.entities.forEach(element => {
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
            element.sprite.on('pointerout', function(){
                if(phase == 'select')team2.entities.forEach(element => { element.sprite.disableInteractive(); });
            });

            element.on.on('GetDamage', function(damage){
                self.onDamage(element.sprite, damage);
            });
        });

        team1.entities.forEach(element => {
            element.on.on('GetDamage', function(damage){
                self.onDamage(element.sprite, damage);
            });
        });

        arrow = this.add.sprite(0, 0, 'Arrow')
        arrow.scale = 0.2
        this.add.existing(arrow)

        onEndTurn = new Phaser.Events.EventEmitter();

        onEndTurn.on('endTurn', function(){
            team2.entities.forEach(element => { element.Attack(team1.GetRandomCharacter()); });
        });

        team1.onTeam.on('death', function(){
            console.log('You lose');
            resultText = self.add.text(400, 300, 'You lose', { fontSize: '64px', fill: '#FFF'});
        });

        team2.onTeam.on('death', function(){
            console.log('You win');
            resultText = self.add.text(400, 300, 'You win', { fontSize: '64px', fill: '#FFF'});
        });

        selectedCharacter = team1.GetCharacter(0);

        damageText = new DamageText(this, 0, 0, '0', { fontSize: '64px', fill: '#F00'});

        // this.sound.play('Reach_Out', { loop: true });

        audioElement = document.getElementById("Going_Down");
        audioContext = new AudioContext();
        analyser = audioContext.createAnalyser();
        source = audioContext.createMediaElementSource(audioElement);

        analyser.fftSize = 256;
        bufferLength = analyser.frequencyBinCount;

        dataArray = new Uint8Array(bufferLength);
        source.connect(analyser);
        source.connect(audioContext.destination);

        analyser.getByteTimeDomainData(dataArray);
        audioContext.resume();
        audioElement.play();
        audioElement.volume = 0.4;
    }

    update()
    {
        analyser.getByteFrequencyData(dataArray);

        let i = 0;
        team1.entities.forEach(element => {

            element.sprite.scale = 0.15 + (dataArray[freqPositions[i]] * dataArray[freqPositions[i]] / 300000)
            i++;
        });

        if(selectedCharacter != null)
        {
            arrow.x = selectedCharacter.sprite.x
            arrow.y = selectedCharacter.sprite.y - 70
        }

        let range = 5
        
        if(this.cameras.main.x > range-0.025 || this.cameras.main.x < -range+0.025) XcamVel *= -1
        this.cameras.main.x += XcamVel

        if(this.cameras.main.y > range-0.025 || this.cameras.main.y < -range+0.025) YcamVel *= -1
        this.cameras.main.y += YcamVel

        damageText.update()
    }

    onDamage(position, damage)
    {
        damageText.x = position.x
        damageText.y = position.y
        damageText.setText(Math.floor(damage))
        damageText.alpha = 1
    }

    lerp(a, b, t)
    {
        return a + (b - a) * t
    }
}