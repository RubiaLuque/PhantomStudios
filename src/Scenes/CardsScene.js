import RandomCardSelector from "../CombatSystem/Cards/RandomCardSelector.js"
import TarotCard from "../CombatSystem/Cards/TarotCard.js";
import DialogueInterpreter from "../DialogueSystem/DialogueInterpreter.js";
import { CardsEffects } from "../CombatSystem/Cards/CardsEffects.js";
import { cardsInfo } from "../CombatSystem/Cards/CardsInfo.js";

export default class CardsScene extends Phaser.Scene{
    constructor(){
        super({key: 'cards'});
    }

    //Definir parametros de la escena
    init(prevScene) {
        this.team1 = prevScene.team1;
        this.team2 = prevScene.team2;
        this.lastPlayerPosition = prevScene.lastPlayerPosition;
        this.enemyId = prevScene.enemyId;
        this.NPCFound = prevScene.NPCFound
        this.NPCTalked = prevScene.NPCTalked;
        this.ambush = prevScene.ambush;
        this.bossId = prevScene.bossId;
        this.cafeteriaEnter = prevScene.cafeteriaEnter
    }

    //Crear los objetos de la escena + lo que ocurre en el primer frame
    create() { 
        
        this.randomCardSelector = new RandomCardSelector();
        this.enter = this.input.keyboard.addKey("ENTER");
        this.add.text(500,510, "Enemigos", { fill: '#FFFFFF' });
        this.add.text(200,510, "Jugadores", { fill: '#FFFFFF' });
        this.add.text(200,570, "CLICK para ver los efectos de las cartas", { fill: '#FFFFFF' });
        this.text = this.add.text(250,550, "INTRO para empezar el combate", { fill: '#FFFFFF' });
        //Recibe el tipo Type de la carta de cada equipo de manera aleatoria
        let teamElection = this.randomCardSelector.RandomElection();
        //let teamElection = {texture: 'Moon', function: CardsEffects.MoonEffect}
        let enemiesElection = this.randomCardSelector.RandomElection();
        //let enemiesElection = {texture: 'Lovers', function: CardsEffects.LoversEffect}
        
        this.player = {x: 400, y: 300}
        //Cartas elegidas 
        this.cardTeam = new TarotCard(this, 250, 250, 'Back', teamElection.texture, teamElection.function, teamElection.info);
        //this.cardTeam = new TarotCard(this, 250, 250, 'Back', 'Moon', CardsEffects.MoonEffect, cardsInfo.MoonInfo)
        this.cardEnemies = new TarotCard(this, 550, 250, 'Back', enemiesElection.texture, enemiesElection.function, enemiesElection.info);
        this.interpreter = new DialogueInterpreter(this)

        if(this.enemyId == this.bossId) {
            this.cardEnemies.funct = function(){};
            this.cardEnemies.card = 'Back';
            const data = this.cache.json.get("dialogue");
            this.interpreter.SetDialogue(data['Jaime-1'])
        }
        
        this.cardTeam.SetCardScale(0.7, 0.7);
        this.cardEnemies.SetCardScale(0.7, 0.7);
        
        //Animacion de las cartas rotando
        this.DoCardAnimation();
    }

    //Frames posteriores de la escena
    update() {
        let isDownEnter = this.enter.isDown;

        if (isDownEnter) {
            console.log(this.team1)
            this.scene.start('combat', {team1: this.team1, team2: this.team2, 
                lastPlayerPosition: this.lastPlayerPosition, enemyId: this.enemyId,
                cardTeam: this.cardTeam, cardEnemies: this.cardEnemies, NPCFound: this.NPCFound, NPCTalked: this.NPCTalked, ambush: this.ambush, cafeteriaEnter: this.cafeteriaEnter});
        }

        this.children.bringToTop(this.interpreter.background)
        this.children.bringToTop(this.interpreter.character)
        this.children.bringToTop(this.interpreter.dialogueText)
    }

    DoCardAnimation() {
        this.tweens.add({
            targets: this.cardTeam,
            props: {
                scaleX: { value: 0, duration: 1000, yoyo: true },
                texture: { value: this.cardTeam.card, duration: 0, delay: 1000 }
            },
            ease: 'quart.in'
        });

        this.tweens.add({
            targets: this.cardEnemies,
            props: {
                scaleX: { value: 0, duration: 1000, yoyo: true },
                texture: { value: this.cardEnemies.card, duration: 0, delay: 1000 }
            },
            ease: 'quart.in',
        });
    }

}