import CustomButton from "../UI/CustomButton.js";
import FloatingText from "../CombatSystem/FloatingText.js";
import {analyser} from "../SoundSystem/Index.js"
import LifeBar from "../CombatSystem/LifeBar.js";

const songs = ['Reach_Out', 'School_Days', 'Going_Down', 'CYN', 'Break_Out'];

let buttons, damageText;

let XcamVel = 0.05;
let YcamVel = 0.1;
let outImage;

let team1, team2;
let arrow;
let lastPlayerPosition, currentEnemyId;
let currentTeam;
let cardEnemies, cardTeam;
let NPCFound, NPCTalked;

const freqPositions = [50, 60, 70, 80];

/*Escena de Phaser*/
export default class CombatScene extends Phaser.Scene {
    constructor(){
        super({ key: 'combat' });
    }
    
    init(teams){
        //Inicializacion de los equipos, Team 1 es el jugador y Team 2 es el enemigo
        team1 = teams.team1
        team2 = teams.team2
        console.log(team2)
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
        
        this.cafeteriaEnter = teams.cafeteriaEnter
    }
    
    preload(){
        team1.Preload(this);
        team2.Preload(this);

        this.load.image('whiteCircle', "assets/images/whiteCircle.png");
        
        team1.entities.forEach(entity => {
            this.load.image(entity.name + "_Out", "assets/images/" + entity.image + "_Out.png"); //Esto es dependiente de team 1 asi que hay que cargarlo aqui
        });
    }
    
    create(){
        this.CreateAnimationsAndBackground();

        self = this;

        this.SetupTeamAndCards();

        this.selectedButton = new Phaser.GameObjects.Rectangle(this, 0, 0, 180, 50, 0xffffff);
        this.selectedButton.visible = false
        this.add.existing(this.selectedButton)

        this.buttonText = this.add.text(180, 0, "Selecciona una opción", { fontSize: '30px', color: '#fff'});
        if(!this.ambush) this.buttonText.visible = false

        this.SetupButtons();

        this.initializeArrow();

        this.configureCombatEntities();

        this.initializeTeamDeathEvents();

        this.add.existing(arrow);
        arrow.setScale(0.2, 0.2)

        this.SetupEffects();

        analyser.SetRandomSong(songs);
        analyser.Restart();
    }

    initializeTeamDeathEvents() {
        team1.onTeam.on('death', () => {
            analyser.Stop();
            this.scene.start('game_over');
        });
        team2.onTeam.on('death', () => {
            self.add.text(400, 300, 'You win', { fontSize: '64px', fill: '#FFF' });
            self.time.addEvent({ delay: 1000, callback: () => { self.win(); } });
        });
    }

    initializeArrow() {
        arrow = new Phaser.GameObjects.Sprite(this, 0, 0, 'Arrow');
        arrow.setOrigin(0.5, 1);
        arrow.setRotation(-1.5708);
    }

    configureCombatEntities() {
        let teams = [team1, team2];
        teams.forEach(team => {
            team.entities.forEach(entity => {
                let eventData = {
                    onGetDamage: (damage) => { self.onDamage(entity.sprite, damage); },
                    onPointerOver: () => { entity.event.emit('target'); },
                    onTarget: () => { 
                        arrow.x = bounds.x;
                        arrow.y = entity.sprite.y; 
                    },
                    onPointerDown: () => {
                        entity.sprite.emit('pointerout');
                        entity.sprite.emit('pointerup');

                        buttons.forEach(button => { button.setActive(false); });
                        this.buttonText.visible = false;
                        this.selectedButton.visible = false;

                        team2.entities.forEach(element => {
                            element.sprite.disableInteractive();
                        });
                        team1.entities.forEach(element => {
                            element.sprite.disableInteractive();
                        });

                        let character = team1.CurrentCharacter();

                        let attackAction = () => {
                            character.selectedAttack(entity, () => {
                                buttons.forEach(button => { button.setActive(true); });
                                this.buttonText.visible = true;
                                this.buttonText.text = "Selecciona una opción";
                                this.nextAction();
                            }, character);
                        };

                        if (character.doneCritic == false && character.selectedAttack == character.MagicAttack && entity.isWeak(character.type)) {
                            character.doneCritic = false;
                            this.OutAttack(character, attackAction);
                        }
                        else { attackAction(); }
                    },
                    onTakeTurn: () => {
                        entity.event.emit('target');
                        if (entity.CheckAlteredState({ scene: this, team: team, user: entity })) {
                            console.log("if1");
                            if (team == team2) {
                                console.log("if2");
                                if (!team1.isTeamDead()) {
                                    console.log("if3");
                                    let target = team1.GetRandomCharacter();
                                    console.log(target);
                                    this.time.delayedCall(1000, () => {
                                        target.event.emit('target');
                                        entity.MagicAttack(target, () => { this.nextAction(); }, entity);
                                    });
                                }
                            }
                        }
                    },
                };
                entity.SetupEvents(eventData);
                let bounds = entity.sprite.getBounds();
                new LifeBar(self, entity.sprite.x, entity.sprite.y + 5, 'Button', entity);

                entity.event.on('target', () => {
                    arrow.x = bounds.x;
                    arrow.y = entity.sprite.y;
                });
            });
        });
    }

    SetupEffects() {
        this.FXbackground = this.add.rectangle(0, 0, 800, 600, 0x000000);
        this.FXbackground.setOrigin(0, 0);
        this.FXbackground.alpha = 0.5;
        this.FXbackground.visible = false;

        this.speedFX = this.add.sprite(0, 0, 'speedFX');
        this.speedFX.setOrigin(0, 0);
        this.speedFX.setScale(2, 2.75);
        this.speedFX.visible = false;

        outImage = this.add.image(-400, 600, 'Javi_Out');
        outImage.setScale(0.45, 0.45);
        outImage.setOrigin(0.5, 1);

        damageText = new FloatingText(this, 0, 0, '0', { fontSize: '64px', fill: '#F00' });
        currentTeam = this.ambush ? team1 : team2;
        this.nextAction();
    }

    SetupButtons() {
        buttons = [];

        buttons.push(new CustomButton(this, 400, 450, "Button", "Attack",
            () => {
                team1.CurrentCharacter().selectedAttack = team1.CurrentCharacter().Attack;
                team1.entities.forEach(element => { element.sprite.disableInteractive(); });
                team2.entities.forEach(entity => { entity.sprite.setInteractive(); });
                this.selectedButton.visible = true;
                this.selectedButton.setPosition(400, 450);
                this.buttonText.text = "Elige un enemigo al que\n          atacar";
            }));
        buttons[0].setButtonScale(0.5, 0.25);

        buttons.push(new CustomButton(this, 400, 500, "Button", "Magic",
            () => {
                team1.CurrentCharacter().selectedAttack = team1.CurrentCharacter().MagicAttack;
                team1.entities.forEach(element => { element.sprite.disableInteractive(); });
                team2.entities.forEach(element => { element.sprite.setInteractive(); });
                this.selectedButton.visible = true;
                this.selectedButton.setPosition(400, 500);
                this.buttonText.text = "Elige un enemigo al que\nhacerle daño de " + team1.CurrentCharacter().type.name;
            }));
        buttons[1].setButtonScale(0.5, 0.25);

        buttons.push(new CustomButton(this, 400, 550, "Button", "Heal",
            () => {
                if (team1.CurrentCharacter().healing.able) {
                    team1.CurrentCharacter().selectedAttack = team1.CurrentCharacter().HealAttack;
                    team2.entities.forEach(element => { element.sprite.disableInteractive(); });
                    team1.entities.forEach(element => { element.sprite.setInteractive(); });
                    this.selectedButton.visible = true;
                    this.selectedButton.setPosition(400, 550);
                    this.buttonText.text = "Elige un aliado al que\n     curar";
                }
                else {
                    this.buttonText.text = "A " + team1.CurrentCharacter().image + " no le quedan\n          curaciones";
                    this.selectedButton.visible = false;
                }
            }));
        buttons[2].setButtonScale(0.5, 0.25);
    }

    SetupTeamAndCards() {
        team1.Create(this, this.ambush);
        team2.Create(this, !this.ambush);

        console.log(team1, team2);
        cardTeam.DoAction(team1, team2);
        cardEnemies.DoAction(team2, team1);
    }

    CreateAnimationsAndBackground() {
        this.anims.create({
            key: 'bckg',
            frames: this.anims.generateFrameNumbers('background', { start: 0, end: 47 }),
            yoyo: true,
            frameRate: 10,
            repeat: -1
        });

        this.kKey = this.input.keyboard.addKey('K'); //DEBUG: tecla k mata a todo el grupo de personajes, se pierde
        this.lKey = this.input.keyboard.addKey('L'); //DEBUG: tecla l mata a todo el grupo de enemigos, se gana

        this.anims.create({
            key: 'speedFX',
            frames: this.anims.generateFrameNumbers('speedFX', { start: 0, end: 24 }),
            yoyo: true,
            frameRate: 24,
            repeat: -1
        });

        this.background = this.add.sprite(0, 0, 'background');
        this.background.play('bckg');
        this.background.setOrigin(0, 0);
        this.background.setScale(3.2, 3.2);
    }

    endTurn() {
        currentTeam = currentTeam == team1 ? team2 : team1;
        buttons.forEach(button => { button.setActive(currentTeam == team1); });
        this.buttonText.text = "Selecciona una opción";
        this.buttonText.visible = (currentTeam == team1);
        this.nextAction();
    }

    nextAction() {
        let output = currentTeam.GetNextCharacter();
        if (output.isValid) output.entity.event.emit('takeTurn');
        else this.endTurn();
    }

    update()
    {
        //DEBUG para matar a todos los personajes
        if (this.kKey.isDown) {
            team1.entities.forEach(e => {
                e.Die();
            })    
        }

        if (this.lKey.isDown) {
            team2.entities.forEach(e => {
                e.Die();
            })    
        }

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
        console.log(team1);
        self.scene.start('WinScene', {pos: lastPlayerPosition, id: currentEnemyId, team: team1, NPCFound: NPCFound, NPCTalked: NPCTalked, cafeteriaEnter: this.cafeteriaEnter});
        analyser.Stop();
    }

    OutAttack(entity, callback)
    {
        outImage.x = -400;
        console.log(entity.name);
        outImage.setTexture(entity.name + "_Out");

        this.speedFX.visible = true;
        this.FXbackground.visible = true;
        this.speedFX.play('speedFX');

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
            this.speedFX.visible = false;
            this.FXbackground.visible = false;
            callback();
        });
    }
}