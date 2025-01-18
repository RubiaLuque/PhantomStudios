import CustomButton from "../UI/CustomButton.js";
import { analyser } from "../SoundSystem/Index.js";

export default class GameOverScene extends Phaser.Scene {
    constructor() {
        super({ key: 'game_over' });
        
    }

    init() { }
    
    preload() { }
    
    create() {
        this.add.text(70, 100, 'Fabulam is ruined', {font: 'bold 70px Times New Roman' });
        this.mainMenuButton = new CustomButton(this, 400, 300, 'button', 'Main Menu', 
        () =>{
            this.scene.start("main_menu", {dial: false});
            })
        this.mainMenuButton.setButtonScale(1, 0.5);
        this.mainMenuButton.setTextPosition(-50, -10);
        this.retryButton = new CustomButton(this, 400, 400, 'button', 'Retry', 
            () => {
                this.scene.start("World1", { pos: undefined, dial: false });
            }
        )
        this.retryButton.setButtonScale(1, 0.5);
        this.retryButton.setTextPosition(-30, -10);

        analyser.SetSong('game_over_theme');
        analyser.Restart();
    }
    
    update(){}
}