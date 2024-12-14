import RandomCardSelector from "../CombatSystem/Cards/RandomCardSelector.js"
import { analyser } from "../SoundSystem/Index.js"
import TarotCard from "../CombatSystem/Cards/TarotCard.js";
import { CardsEffects } from "../CombatSystem/Cards/CardsEffects.js";
import DialogueInterpreter from "../DialogueSystem/DialogueInterpreter.js";

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

    //
    preload() {
        //Cartas tarot
        this.load.image("Back", "assets/images/cards/Back_3.jpg");
        this.load.image("Fool", "assets/images/cards/Fool.jpg");
        this.load.image("Magician", "assets/images/cards/Magician.jpg");
        this.load.image("Empress", "assets/images/cards/Empress.jpg");
        this.load.image("Devil", "assets/images/cards/Devil.jpg");
        this.load.image("Chariot", "assets/images/cards/Chariot.jpg");
        this.load.image("Hanged_Man", "assets/images/cards/Hanged_Man.jpg");
        this.load.image("Hermit", "assets/images/cards/Hermit.jpg");
        this.load.image("Sun", "assets/images/cards/Sun.jpg");
        this.load.image("Temperance", "assets/images/cards/Temperance.jpg");
        this.load.image("Tower", "assets/images/cards/Tower.jpg");
        this.load.image("Lovers", "assets/images/cards/Lovers.jpg");
        this.load.image("Emperor", "assets/images/cards/Emperor.jpg");
        this.load.image("Death", "assets/images/cards/Death.jpg");
        this.load.image("Star", "assets/images/cards/Star.jpg");
        this.load.image("Moon", "assets/images/cards/Moon.jpg");
        this.load.image("Judgement", "assets/images/cards/Judgement.jpg");
        this.load.image("World", "assets/images/cards/World.jpg");
        this.load.image("Justice", "assets/images/cards/Justice.jpg");
        this.load.image("Fortune", "assets/images/cards/Wheel_of_Fortune.jpg");
        this.load.image("Strength", "assets/images/cards/Strength.jpg");
        this.load.image("Hierophant", "assets/images/cards/Hierophant.jpg");
        this.load.image("High_Priestess", "assets/images/cards/High_Priestess.jpg");
        this.load.json("dialogue", 'assets/dialogue/dialogue.json')
    }

    //Crear los objetos de la escena + lo que ocurre en el primer frame
    create() { 
        
        this.randomCardSelector = new RandomCardSelector();
        this.enter = this.input.keyboard.addKey("ENTER");
        this.text = this.add.text(300,520, "Press ENTER to continue.", { fill: '#FFFFFF' });
        //Recibe el tipo Type de la carta de cada equipo de manera aleatoria
        let teamElection = this.randomCardSelector.RandomElection();
        //let teamElection = {texture: 'Moon', function: CardsEffects.MoonEffect}
        let enemiesElection = this.randomCardSelector.RandomElection();
        //let enemiesElection = {texture: 'Lovers', function: CardsEffects.LoversEffect}
        
        this.player = {x: 400, y: 300}
        //Cartas elegidas 
        this.cardTeam = new TarotCard(this, 250, 250, teamElection.texture, teamElection.function);
        this.cardEnemies = new TarotCard(this, 550, 250, enemiesElection.texture, enemiesElection.function);
        this.interpreter = new DialogueInterpreter(this)

        if(this.enemyId == this.bossId) {
            this.cardEnemies.funct = function(){};
            this.cardEnemies.texture = 'Back';
            const data = this.cache.json.get("dialogue");
            this.interpreter.SetDialogue(data['Jaime-1'])
        }
        //Para que no aparezcan las imagenes en el fondo al hacer la animacion de flip
        this.cardTeam.setAlpha(0, 0, 0, 0);
        this.cardEnemies.setAlpha(0, 0, 0, 0);

        //Texturas de la parte de atras de las cartas
        this.backTeam = this.add.image(250, 250, "Back");
        this.backEnenmies = this.add.image(550, 250, "Back");
        
        this.cardTeam.SetCardScale(0.7, 0.7);
        this.cardEnemies.SetCardScale(0.7, 0.7);
        this.backTeam.setScale(0.7, 0.7);
        this.backEnenmies.setScale(0.7, 0.7);
        
        //Animacion de las cartas rotando
        this.DoCardAnimation();
    }

    //Frames posteriores de la escena
    update() {
        let isDownEnter = this.enter.isDown;

        if (isDownEnter) {
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
            targets: this.backTeam,
            props: {
                scaleX: { value: 0, duration: 1000, yoyo: true },
                texture: { value: this.cardTeam.texture, duration: 0, delay: 1000 }
            },
            ease: 'quart.in'
        });

        this.tweens.add({
            targets: this.backEnenmies,
            props: {
                scaleX: { value: 0, duration: 1000, yoyo: true },
                texture: { value: this.cardEnemies.texture, duration: 0, delay: 1000 }
            },
            ease: 'quart.in',
        });
    }

}