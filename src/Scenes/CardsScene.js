import RandomCardSelector from "../CombatSystem/Cards/RandomCardSelector.js"
import {analyser} from "../SoundSystem/Index.js"

let ramdomCard;

export default class CardsScene extends Phaser.Scene{
    constructor(){
        super({key: 'cards'});
    }

    //Definir parametros de la escena
    init() {

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
    }

    //Frames posteriores de la escena
    update() { }

}