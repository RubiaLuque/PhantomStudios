import CustomButton from "../UI/CustomButton.js";
import MusicAnalyser from "../SoundSystem/MusicAnalyser.js";
import { analyser } from "../SoundSystem/Index.js";

let StartButton, ContinueButton;
let banner;
export default class MainMenu extends Phaser.Scene {
    constructor(){
        super({key: 'main_menu'});
        //this.analyser = new MusicAnalyser(['CityRuins_MainMenu']);
    }

    init(){

    }

    preload(){
        this.load.image('Button', 'assets/images/Button.png');
        this.load.image('Banner', 'assets/images/Vincere_fabulam.png');
    }

    create(){
        banner = new Phaser.GameObjects.Image(this, 405, 140, 'Banner');
        this.add.existing(banner);
        //Boton comienzo de partida
        StartButton = new CustomButton(this, 400, 400, 'Button', 'MISSION START!!', 
            ()=>{
                analyser.Stop();
                this.scene.start('World1', { pos: undefined });
            }
        );
        StartButton.setButtonScale(1, 0.5);
        StartButton.setTextPosition(-90, -10); //Se setea el texto del boton relativo a este

        //Por ahora no hace nada
        ContinueButton = new CustomButton(this, 400, 500, 'Button', '(Continue)', 
            ()=>{
                
            }
        );
        ContinueButton.setButtonScale(1,0.5);
        ContinueButton.setTextPosition(-60,-10); //Se setea el texto del boton relativo a este

        analyser.SetSong('CityRuins_MainMenu');
        analyser.Restart();
    }

    update(){

    }
}
