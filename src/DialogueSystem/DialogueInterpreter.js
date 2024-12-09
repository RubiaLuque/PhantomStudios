import { DialogueCharacterData } from "./DialogueCharacterData.js";
export default class DialogueInterpreter {
    names = [ "Javi", "Fueyo", "Mika", "Muxu" ];

    constructor(scene){
        this.dialogueText = dialogueText;
        this.scene = scene;
        
        this.dialogueBackground = scene.add.rectangle(400, 500, 800, 200, 0x000000);
        this.dialogueBackground.alpha = 0.5;
        this.dialogueText = scene.add.text(400, 500, '', { fontSize: '32px', fill: '#FFF'});
        
        this.background.visible = false;

        scene.add.existing(this.background);

        this.character = scene.add.sprite(100, 100, "Fueyo");

        this.nextInput = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.nextInput.on('down', ()=>{
            this.next = true;
        });
    }

    SetDialogue(dialogue, endCallback = function(){}){
        this.lines = dialogue.split("@");
        this.dialogueText.text = this.lines.shift();
        this.background.visible = true;
        let self = this;

        this.scene.time.addEvent({
            delay: 10,
            callback: function(){
                if(this.lines.length >= 0)
                {
                    if(this.scene.time.now > this.delay && this.next)
                    {
                        this.next = false;
                        this.delay = this.scene.time.now + 100;

                        let line = this.lines.shift();

                        let characterData = line.split(":")[0].split("/");
                        let currentCharacter = DialogueCharacterData[characterData[0]];

                        this.character.setTexture(characterData[0] + "_sheet", currentCharacter[characterData[1]]);

                        this.dialogueText.text = line.split(":")[1];
                    }
                }
                else if(this.nextInput.isDown)
                {
                    this.background.visible = false;
                    this.dialogueText.text = "";
                    this.scene.time.removeEvent(this);
                    endCallback();
                }
            }.bind(self),
            callbackScope: this.scene,
            loop: true
        });
       }
}