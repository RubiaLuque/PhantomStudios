import { DialogueCharacterData } from "./DialogueCharacterData.js";
export default class DialogueInterpreter {
    names = [ "Javi", "Fueyo", "Mika", "Muxu" ];

    constructor(scene, analyser){
        this.scene = scene;
        
        this.dialogueBackground = scene.add.rectangle(400, 500, 800, 200, 0x000000);
        this.dialogueBackground.alpha = 0.5;
        this.dialogueText = scene.add.text(400, 500, '', { fontSize: '32px', fill: '#FFF'});

        this.background.visible = false;

        this.character = scene.add.sprite(100, 100, "Fueyo");

        this.nextInput = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.nextInput.on('down', ()=>{
            this.next = true;
        });

        this.analyser = analyser;
    }

    SetDialogue(dialogue, endCallback = function(){}){
        let lines = dialogue.split("@");
        this.background.visible = true;
        let self = this;
        let delay = 0;

        this.scene.time.addEvent({
            delay: 10,
            callback: ()=>{
                if(lines.length >= 0)
                {
                    if(self.scene.time.now > delay && self.next)
                    {
                        self.next = false;
                        delay = self.scene.time.now + 100;

                        let line = lines.shift();

                        let characterData = line.split(":")[0].split("/");
                        let currentCharacter = DialogueCharacterData[characterData[0]];

                        self.character.setTexture(characterData[0] + "_sheet", currentCharacter[characterData[1]]);

                        let newText = line.split(":")[1];
                        self.scene.time.addEvent({
                            delay: 10,
                            callback: ()=>
                            {
                                let dataArray = self.analyser.GetDataArray();
                                let value = dataArray[20] * dataArray[20] / 300000;
                                self.character.setScale(0.30 - value, 0.15 + value);

                                if(newText.length > 0)
                                {
                                    self.dialogueText.text += newText.shift();
                                }
                            },
                            loop: true
                        })

                    }
                }
                else if(this.nextInput.isDown)
                {
                    this.background.visible = false;
                    this.dialogueText.text = "";
                    this.scene.time.removeEvent(this);
                    endCallback();
                }
            },
            callbackScope: this.scene,
            loop: true
        });
       }
}