import CustomButton from "../UI/CustomButton.js";
import FloatingText from "../CombatSystem/FloatingText.js";
import {analyser} from "../SoundSystem/Index.js"
import Team from "../CombatSystem/Team.js";
import DialogueInterpreter from "../DialogueSystem/DialogueInterpreter.js";
import LifeBar from "../CombatSystem/LifeBar.js";
import { AlteredState } from "../CombatSystem/Data/AlteredState.js";
import World1 from "./World1.js";
import WinScene from "./WinScene.js";
import Entity from "../CombatSystem/Entity.js";

const songs = ['Reach_Out', 'School_Days', 'Going_Down', 'CYN', 'Break_Out'];

const Type = {
    horny : {name:'horny', str: 'depression'},
    anxiety: {name:'anxiety', str: 'horny'},
    wrath: {name:'wrath', str: 'anxiety'},
    depression: {name:'depression', str: 'wrath'},
    physical: {name:'physical', str: 'depression'}
}

let buttons, damageText;

let XcamVel = 0.05;
let YcamVel = 0.1;
let outImage;

let team1, team2;
let arrow;
let turnText;
let lastPlayerPosition, currentEnemyId;
let phase;
let currentTeam;
let cardEnemies, cardTeam;
let NPCFound, NPCTalked;

const freqPositions = [50, 60, 70, 80];

/*Escena de Phaser*/
export default class CombatScene extends Phaser.Scene {
    constructor(){
        super({key: 'combat'});
    }

    init(teams){
        //Inicializacion de los equipos, Team 1 es el jugador y Team 2 es el enemigo
        team1 = new Team(teams.team1, "Party")
        team2 = new Team(teams.team2, "Enemies")

        //Guardamos la posicion del jugador, el id del enemigo y los NPCs encontrados para la siguiente escena
        lastPlayerPosition = teams.lastPlayerPosition;
        currentEnemyId = teams.enemyId;
        NPCFound = teams.NPCFound;
        NPCTalked = teams.NPCTalked;
        console.log(teams)
        this.ambush = teams.ambush

        this.WIDTH = this.game.config.width;
        this.HEIGHT = this.game.config.height;

        cardTeam = teams.cardTeam;
        cardEnemies = teams.cardEnemies;
    }

    preload(){
        team1.Preload(this);
        team2.Preload(this);

        this.load.image("Button", "assets/images/Button.png");
        this.load.image("Arrow", "assets/images/Arrow.png");

        team1.entities.forEach(entity => {
            this.load.image(entity.name + "_Out", "assets/images/" + entity.name + "_Out.png");
        });

        this.load.audio('Reach_Out', [ 'assets/music/Reach_Out.mp3' ]);
        this.load.audio('oioioi', [ 'assets/music/oioioi.wav' ]);

        this.load.spritesheet('background', 'assets/images/background_sheet_48-Frames.png', {frameWidth: 256, frameHeight: 224});
    }

    create(){
        this.anims.create({
            key: 'bckg',
            frames: this.anims.generateFrameNumbers('background', {start: 0, end: 47}),
            yoyo: true,
            frameRate: 10,
            repeat: -1
        });

        this.sr = this.add.sprite(0, 0, 'background');
        this.sr.play('bckg');
        this.sr.setOrigin(0, 0);
        this.sr.setScale(3.2, 3.2);

        self = this;

        team1.Create(this, this.ambush);
        team2.Create(this, !this.ambush);
        
        cardTeam.DoAction(team1, team2);
        cardEnemies.DoAction(team2, team1);

        buttons = [];

        phase = new Phaser.Events.EventEmitter();
        buttons.push(new CustomButton(this, 400, 450, "Button", "Attack", 
        ()=>{
            team1.CurrentCharacter().selectedAttack = team1.CurrentCharacter().Attack;
            team2.entities.forEach(entity => {entity.sprite.setInteractive()})
        }));
        buttons[0].setButtonScale(0.5, 0.25);

        buttons.push(new CustomButton(this, 400, 500, "Button", "Magic",
        ()=>{
            team1.CurrentCharacter().selectedAttack = team1.CurrentCharacter().MagicAttack;
            team2.entities.forEach(element => {element.sprite.setInteractive()})
        }));
        buttons[1].setButtonScale(0.5, 0.25);

        buttons.push(new CustomButton(this, 400, 550, "Button", "Heal",
        ()=>{
            if(team1.CurrentCharacter().healing.able){
            team1.CurrentCharacter().selectedAttack = team1.CurrentCharacter().HealAttack;
            team1.entities.forEach(element => {element.sprite.setInteractive()})
            }
        }));
        buttons[2].setButtonScale(0.5, 0.25);

        arrow = new Phaser.GameObjects.Sprite(this, 0, 0, 'Arrow');
        arrow.setOrigin(0.5, 1);
        arrow.setRotation(-1.5708);

        let teams = [team1, team2];
        teams.forEach(team => {
            team.entities.forEach(entity => {
                entity.event.on('GetDamage', (damage)=>{self.onDamage(entity.sprite, damage);});

                let bounds = entity.sprite.getBounds();
                new LifeBar(self, entity.sprite.x, entity.sprite.y + 5, 'Button', entity);

                entity.sprite.on('pointerover', ()=>{
                    entity.event.emit('target');
                });

                entity.sprite.on('pointerdown', ()=>{
                    entity.sprite.emit('pointerout');
                    entity.sprite.emit('pointerup');

                    buttons.forEach(button => {button.setActive(false)});

                    team2.entities.forEach(element => {
                        element.sprite.disableInteractive()
                    });

                    let character = team1.CurrentCharacter();

                    let attackAction = ()=>{character.selectedAttack(entity, ()=>{
                        buttons.forEach(button => {button.setActive(true)});
                        phase.emit('next');
                    }, character);}

                    if(character.doneCritic == false && character.selectedAttack == character.MagicAttack && entity.isWeak(character.type))
                    {
                        character.doneCritic = false;
                        this.OutAttack(character, attackAction);
                    }
                    else
                    {
                        attackAction();
                    }
                });

                entity.event.on('takeTurn', ()=>{
                    entity.event.emit('target');
                    
                    if(entity.alteredState({scene: this.scene, team: team, phase: phase, user: entity}))
                    {
                        if(team == team2)
                        {
                            let target = team1.GetRandomCharacter();
                            this.time.delayedCall(1000, ()=>{
                                target.event.emit('target');
                                entity.MagicAttack(target, ()=>{phase.emit('next')}, entity)
                            });
                        }
                    }
                });

                entity.event.on('target', ()=>{
                    arrow.x = bounds.x;
                    arrow.y = entity.sprite.y;
                });
            });
        });

        phase.on('next', ()=>{
            let output = currentTeam.GetNextCharacter();
            if(output.isValid) output.entity.event.emit('takeTurn');
            else phase.emit('endTurn');
        });

        phase.on('endTurn', ()=>{
            currentTeam = currentTeam == team1 ? team2 : team1;
            buttons.forEach(button => {button.setActive(currentTeam == team1)});
            phase.emit('next')
        });

        team1.onTeam.on('death', ()=>{self.add.text(400, 300, 'You lose', { fontSize: '64px', fill: '#FFF'});});
        team2.onTeam.on('death', ()=>
        {
            self.add.text(400, 300, 'You win', { fontSize: '64px', fill: '#FFF'});
            self.time.addEvent({ delay : 1000, callback: ()=>{self.win()} });
        });

        this.add.existing(arrow);
        arrow.setScale(0.2, 0.2)

        outImage = this.add.image(-400, 600, 'Javi_Out');
        outImage.setScale(0.45, 0.45);
        outImage.setOrigin(0.5, 1);

        damageText = new FloatingText(this, 0, 0, '0', { fontSize: '64px', fill: '#F00'});
        currentTeam = this.ambush ? team1 : team2;
        phase.emit('next')

        analyser.SetRandomSong(['Reach_Out', 'Going_Down', 'CYN', 'School_Days', 'Break_Out'])
        analyser.Restart();
    }

    update()
    {
        this.teamDance();

        this.camUpdate();

        damageText.update();
    }

    teamDance()
    {
        let dataArray = analyser.GetDataArray();

        let i = 0;
        currentTeam.entities.forEach(element => {
            let value = dataArray[freqPositions[i]] / 255.0 * 0.05
            value *= 1;
            element.sprite.setScale(0.1 - value, 0.1 + value);
            i++;
        });
    }

    camUpdate()
    {
        let range = 5
        
        if(this.cameras.main.x > range-0.025 || this.cameras.main.x < -range+0.025) XcamVel *= -1
        this.cameras.main.x += XcamVel

        if(this.cameras.main.y > range-0.025 || this.cameras.main.y < -range+0.025) YcamVel *= -1
        this.cameras.main.y += YcamVel
    }

    //Recibe la posición en la que el texto de daño se va a mostrar y el daño que se va a mostrar
    onDamage(position, damage)
    {
        damageText.x = position.x
        damageText.y = position.y
        damageText.setText(Math.floor(damage))
        damageText.alpha = 1
    }

    //Funcion para hacer un lerp
    lerp(a, b, t)
    {
        return a + (b - a) * t
    }

    //Funcion que se ejecuta al salir de la escena
    win()
    {
        team1.entities.forEach(e =>{
            e.maxHealth -= e.health.bonus
            if(e.maxHealth < e.health.quantity) e.health.quantity = e.maxHealth
            e.health.bonus = 0
            e.defense.bonus = 0
            e.damage.bonus = 0
            e.luck.bonus = 0
            e.healing.bonus = 0
            e.healing.able = true
        })

        self.scene.start('WinScene', {pos: lastPlayerPosition, id: currentEnemyId, team: team1, NPCFound: NPCFound, NPCTalked: NPCTalked});
        analyser.Stop();
    }

    OutAttack(entity, callback)
    {
        outImage.x = -400;
        console.log(entity.name);
        outImage.setTexture(entity.name + "_Out");

        this.tweens.add({
            targets: outImage,
            props: {
                x: { value: 400, duration: 500 },
            },
            ease: 'quart.in'
        });

        this.time.delayedCall(1000, ()=>{
            this.tweens.add({
                targets: outImage,
                props: {
                    x: { value: 1200, duration: 500 },
                },
                ease: 'quart.in'
            });
        });

        this.time.delayedCall(2200, ()=>{
            callback();
        });
    }
}