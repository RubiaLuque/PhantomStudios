import CustomButton from "../UI/CustomButton.js";

export default class DemoEndScene extends Phaser.Scene{
    constructor(){
        super({key:'demoEndScene'});
    }

     create(){
            
            this.add.text(30, 400, 'Gracias por jugar a la Demo de Vincere fabulam, terminaremos el juego en 2050')
    
            //Por ahora no hace nada
            this.MenuButton = new CustomButton(this, 400, 500, 'Button', 'Return', 
                ()=>{
                    this.scene.start('main_menu')
                }
            );
            this.MenuButton.setButtonScale(1,0.5);
            this.MenuButton.setTextPosition(-60,-10); //Se setea el texto del boton relativo a este
        }
}