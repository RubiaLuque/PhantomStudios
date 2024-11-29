import RandomCardSelector from "../CombatSystem/Cards/RandomCardSelector.js"
import { analyser } from "../SoundSystem/Index.js"
import TarotCard from "../CombatSystem/Cards/TarotCard.js";


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
    }

    //
    preload() {
        //Cartas tarot
        this.load.image("Fool", "assets/images/cards/Fool.jpg");
        this.load.image("Magician", "assets/images/cards/Magician.jpg");
    }

    //Crear los objetos de la escena + lo que ocurre en el primer frame
    create() { 
        this.randomCardSelector = new RandomCardSelector();
        this.space = this.input.keyboard.addKey("SPACE");
        this.text = this.add.text(300,520, "Press SPACE to continue.", { fill: '#FFFFFF' });
        //Recibe el tipo Type de la carta de cada equipo de manera aleatoria
        let teamElection = this.randomCardSelector.RandomElection();
        let enemiesElection = this.randomCardSelector.RandomElection();

        //Cartas elegidas 
        this.cardTeam = new TarotCard(this, 250, 250, teamElection.texture, teamElection.function);
        this.cardEnemies = new TarotCard(this, 550, 250, enemiesElection.texture, enemiesElection.function);

        this.cardTeam.SetCardScale(0.7, 0.7);
        this.cardEnemies.SetCardScale(0.7, 0.7);

        this.cardTeam.CardAnimation();
        this.cardEnemies.CardAnimation();
        
    }

    //Frames posteriores de la escena
    update() {
        let isDownSpace = this.space.isDown;

        if (isDownSpace) {
            this.scene.start('combat', {team1: this.team1, team2: this.team2, 
                lastPlayerPosition: this.lastPlayerPosition, enemyId: this.enemyId,
                cardTeam: this.cardTeam, cardEnemies: this.cardEnemies});
        }
    }

}