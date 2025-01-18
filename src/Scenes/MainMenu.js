import CustomButton from "../UI/CustomButton.js";
import { analyser } from "../SoundSystem/Index.js";

let StartButton, ContinueButton;
let banner;
export default class MainMenu extends Phaser.Scene {
    constructor(){
        super({key: 'main_menu'});
    }

    init(player){
        this.pos = player.pos
        if(player.dial != undefined) this.dial = player.dial
        else this.dial = true;
        if(player.defeatedEnemiesIds != undefined) this.defeatedEnemiesIds = player.defeatedEnemiesIds
    }

    preload(){
        this.load.image('Button', 'assets/images/Button.png');
        this.load.image('Banner', 'assets/images/Vincere_fabulam.png');
    }

    create(){
        banner = new Phaser.GameObjects.Image(this, 405, 140, 'Banner');
        this.add.existing(banner);
        //Boton pa jugar
        StartButton = new CustomButton(this, 400, 425, 'Button', 'MISSION START!!', 
            ()=>{
                analyser.Stop();
                this.scene.start('LoadScene', {pos: this.pos, dial: this.dial, defeatedEnemiesIds: this.defeatedEnemiesIds});
            }
        );
        StartButton.setButtonScale(1, 0.5);
        StartButton.setTextPosition(-90, -10); //Se setea el texto del boton relativo a este

        analyser.SetSong('CityRuins_MainMenu');
        analyser.Restart();
    }

    update(){

    }
}
