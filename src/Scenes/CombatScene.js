import CustomButton from "../UI/CustomButton.js";
import FloatingText from "../CombatSystem/FloatingText.js";
import {analyser} from "../SoundSystem/Index.js"
import Team from "../CombatSystem/Team.js";
import DialogueInterpreter from "../DialogueSystem/DialogueInterpreter.js";
import LifeBar from "../CombatSystem/LifeBar.js";
import { AlteredState } from "../CombatSystem/Data/AlteredState.js";
import World1 from "./World1.js";
import WinScene from "./WinScene.js";

const songs = ['Reach_Out', 'School_Days', 'Going_Down', 'CYN', 'Break_Out'];

const Type = {
    horny : {name:'horny', str: 'depression'},
    anxiety: {name:'anxiety', str: 'horny'},
    wrath: {name:'wrath', str: 'anxiety'},
    depression: {name:'depression', str: 'wrath'},
    physical: {name:'physical', str: 'depression'}
}

let AttackButton, MagicButton, damageText;

let XcamVel = 0.05;
let YcamVel = 0.1;
let selectedAttack;

let team1, team2;
let arrow;
let turnText;
let lastPlayerPosition, currentEnemyId;
let phase;
let currentTeam;
let cardEnemies, cardTeam;

const freqPositions = [50, 60, 70, 80];

/*Escena de Phaser*/
export default class CombatScene extends Phaser.Scene {
    constructor(){
        super({key: 'combat'});
    }

    init(teams){
        //Inicializacion de los equipos, Team 1 es el jugador y Team 2 es el enemigo
        team1 = new Team(teams.team1)
        team2 = new Team(teams.team2)

        //Guardamos la posicion del jugador y el id del enemigo para la siguiente escena
        lastPlayerPosition = teams.lastPlayerPosition;
        currentEnemyId = teams.enemyId;

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

        this.load.audio('Reach_Out', [ 'assets/music/Reach_Out.mp3' ]);
        this.load.audio('oioioi', [ 'assets/music/oioioi.wav' ]);
    }

    create(){
        self = this;

        team1.Create(this, 250, 100, this);
        team2.Create(this, 700, 100, this);
        
        cardTeam.DoAction(team1, team2);
        cardEnemies.DoAction(team2, team1);


        phase = new Phaser.Events.EventEmitter();
        AttackButton = new CustomButton(this, 400, 550, "Button", "Attack", 
        ()=>{
            team1.CurrentCharacter().selectedAttack = team1.CurrentCharacter().Attack;
            team2.entities.forEach(entity => {entity.sprite.setInteractive()})
        }).setButtonScale(0.5, 0.25);

        MagicButton = new CustomButton(this, 400, 450, "Button", "Magic",
        ()=>{
            team1.CurrentCharacter().selectedAttack = team1.CurrentCharacter().MagicAttack;
            team2.entities.forEach(element => {element.sprite.setInteractive()})
        }).setButtonScale(0.5, 0.25);

        arrow = this.add.sprite(0, 0, 'Arrow').setScale(0.2, 0.2)

        let teams = [team1, team2];
        teams.forEach(team => {
            team.entities.forEach(entity => {
                entity.event.on('GetDamage', (damage)=>{self.onDamage(entity.sprite, damage);});

                let bounds = entity.sprite.getBounds();
                new LifeBar(self, entity.sprite.x, entity.sprite.y - bounds.height/2, 'Button', entity);

                entity.sprite.on('pointerdown', ()=>{team1.CurrentCharacter().selectedAttack(entity, ()=>{phase.emit('next')})})

                entity.event.on('takeTurn', ()=>{
                    arrow.x = entity.sprite.x; arrow.y = entity.sprite.y - bounds.height/2;
                    
                    if(entity.alteredState({scene: this.scene, team: team, phase: phase}))
                    {
                        if(team == team2) entity.MagicAttack(team1.GetRandomCharacter(), ()=>{phase.emit('next')});
                    }
                });
            });
        });

        phase.on('next', ()=>{
            let output = currentTeam.GetNextCharacter();
            if(output.isValid) output.entity.event.emit('takeTurn');
            else phase.emit('endTurn');
        });

        phase.on('endTurn', ()=>{
            if(currentTeam == team1)
            {
                currentTeam = team2;
            }
            else 
            {
                currentTeam = team1;
            }
            phase.emit('next')
        });

        team1.onTeam.on('death', ()=>{self.add.text(400, 300, 'You lose', { fontSize: '64px', fill: '#FFF'});});
        team2.onTeam.on('death', ()=>
        {
            self.add.text(400, 300, 'You win', { fontSize: '64px', fill: '#FFF'});
            self.time.addEvent({ delay : 1000, callback: ()=>{self.win()} });
        });

        damageText = new FloatingText(this, 0, 0, '0', { fontSize: '64px', fill: '#F00'});
        currentTeam = team1;
        phase.emit('next')

        turnText = this.add.text(400, 500, 'Your turn', { fontSize: '50px', fill: '#FFF'});

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
            let value = dataArray[freqPositions[i]] * dataArray[freqPositions[i]] / 300000;
            element.sprite.setScale(0.30 - value, 0.15 + value);
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

        turnText.x = this.cameras.main.scrollX + 450
        turnText.y = this.cameras.main.scrollY + 400
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
        let healths = {};
        team1.entities.forEach(entity =>{
            healths[entity.name] = entity.health;
        })

        self.scene.start('WinScene', {pos: lastPlayerPosition, id: currentEnemyId, healths: healths});
        analyser.Stop();
    }
}