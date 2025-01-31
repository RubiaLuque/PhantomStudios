import DialogueInterpreter from "../DialogueSystem/DialogueInterpreter.js";

export default class DialogueTestScene extends Phaser.Scene{
    constructor(){
        super({key: 'DialogueTestScene'});
    }

    preload(){
        this.load.json("dialogue", "assets/dialogue/dialogue.json");
        this.load.spritesheet('Javi', 'assets/images/Javi_sheet.png', {frameWidth: 63, frameHeight: 79});
    }

    create(){
        let dialogueInterpreter = new DialogueInterpreter(this)
        const data = this.cache.json.get("dialogue");
        dialogueInterpreter.SetDialogue(data['prueba']);
    }
}