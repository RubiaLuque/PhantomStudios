import CustomButton from "../UI/CustomButton.js";

export default class DemoWinScene extends Phaser.Scene{
    constructor(){
        super({key:'demoWinScene'});
    }

     create(){

        this.add.image(400, 425, 'Pascal').setScale(0.2, 0.2);
            
            this.add.text(30, 100, 'Gracias por jugar a la Demo de Vincere fabulam, terminaremos el juego en 2050')
    
            //Por ahora no hace nada
            this.MenuButton = new CustomButton(this, 400, 175, 'Button', 'Return', 
                ()=>{
                    this.scene.start('main_menu')
                }
            );
            this.MenuButton.setButtonScale(1,0.5);
            this.MenuButton.setTextPosition(-50,-10); //Se setea el texto del boton relativo a este
    }
}