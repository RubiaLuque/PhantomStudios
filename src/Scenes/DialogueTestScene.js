import DialogueInterpreter from "../DialogueSystem/DialogueInterpreter.js";
import dialogue from '/assets/dialogue/dialogue.json' with {type: 'json'};

export default class DialogueTestScene extends Phaser.Scene{
    constructor(){
        super({key: 'DialogueTestScene'});
    }

    preload(){
        this.load.spritesheet('Javi', 'assets/images/Javi_sheet.png', {frameWidth: 63, frameHeight: 79});
    }

    create(){
        let dialogueInterpreter = new DialogueInterpreter(this)
        dialogueInterpreter.SetDialogue(dialogue['prueba']);
    }
}