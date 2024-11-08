import CustomButton from "../UI/CustomButton.js";
import MusicAnalyser from "../SoundSystem/MusicAnalyser.js";

let StartButton, ContinueButton;

export default class MainMenu extends Phaser.Scene {
    constructor(){
        super({key: 'main_menu'});
        this.analyser = new MusicAnalyser(['CityRuins_MainMenu']);
    }

    init(){

    }

    preload(){
        this.load.audio('CityRuins_MainMenu', ['assets/music/CityRuins_MainMenu.mp3']);
        this.load.image('Button', 'assets/images/Button.png');
    }

    create(){
        //Boton comienzo de partida
        StartButton = new CustomButton(this, 400, 200, 'Button', 'MISSION START!!', 
            ()=>{
                this.scene.start('World1');
            }
        );
        StartButton.setButtonScale(1.5, 1);
        StartButton.setTextPosition(-190, -20); //Se setea el texto del boton relativo a este

        //Por ahora no hace nada
        ContinueButton = new CustomButton(this, 400, 400, 'Button', '(Continue)', 
            ()=>{
                
            }
        );
        ContinueButton.setButtonScale(1.5,1);
        ContinueButton.setTextPosition(-120,-20); //Se setea el texto del boton relativo a este

        //Inicializar cancion
        this.analyser.SetRandomSong();
        this.analyser.Restart();
    }

    update(){

    }
}
