import RandomCardSelector from "../CombatSystem/Cards/RandomCardSelector.js"
import {analyser} from "../SoundSystem/Index.js"

let randomCard;

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
        randomCard = new RandomCardSelector();
        this.space = this.input.keyboard.addKey("SPACE");
        this.text = this.add.text(300, 300, "Press SPACE to continue.", { fill: '#FFFFFF' });
    }

    //Frames posteriores de la escena
    update() {
        let isDownSpace = this.space.isDown;
        if (isDownSpace) {
            this.scene.start('combat', {team1: this.team1, team2: this.team2, 
                lastPlayerPosition: this.lastPlayerPosition, enemyId: this.enemyId});
        }
    }

}