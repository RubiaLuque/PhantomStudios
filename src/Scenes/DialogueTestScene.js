import DialogueInterpreter from "../DialogueSystem/DialogueInterpreter.js";
export default class DialogueTextScene extends Phaser.Scene{
    constructor(){
        super({key: 'DialogueTestScene'});
    }

    preload(){
        this.load.spritesheet('Javi', 'assets/images/Javi_sheet.png', {frameWidth: 63, frameHeight: 79});
    }

    create(){
        let dialogueInterpreter = new DialogueInterpreter(this)
        dialogueInterpreter.SetDialogue('Javi/default:UwU@Javi/horny:Me corro aaaaa');
    }
}