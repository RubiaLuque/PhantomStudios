import { DialogueCharacterData } from "./DialogueCharacterData.js";
import { analyser } from "../SoundSystem/Index.js";
import {config} from "../game.js"
export default class DialogueInterpreter {
    names = [ "Javi", "Fueyo", "Mika", "Muxu" ];

    constructor(scene){
        this.scene = scene;

        let posX = scene.player.x
        let posY = scene.player.y

        this.background = scene.add.rectangle(posX, posY + config.height/3, 800, 200, 0x000000);
        this.background.alpha = 0.5;
        this.dialogueText = scene.add.text(this.background.x - this.background.getBounds().width/2, this.background.y, '', { fontSize: '32px', fill: '#FFF', align: 'center'});
        this.background.visible = false;

        this.character = scene.add.sprite(100, 100, "Javi");
        this.character.visible = false;

        this.nextInput = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.nextInput.on('down', ()=>{
            this.next = true;
        });

        this.analyser = analyser;
    }

    SetDialogue(dialogue, endCallback = function(){}){
        let lines = dialogue.split("@");
        this.background.visible = true;
        this.character.visible = true;
        let line = lines.shift()
        let characterData = line.split(":")[0].split("/");
        let currentCharacter = DialogueCharacterData[characterData[0]];
        this.dialogueText.text = line.split(':')[1];
        let self = this;
        let delay = 0;
        let end = false;

        this.scene.time.addEvent({
            delay: 10,
            callback: ()=>{
                if(!end)
                {
                    if(self.scene.time.now > delay && self.next)
                    {
                        self.next = false;
                        delay = self.scene.time.now + 100;
                        this.dialogueText.text = "";
                        
                        line = lines.shift();

                        characterData = line.split(":")[0].split("/");
                        currentCharacter = DialogueCharacterData[characterData[0]];

                        self.character.setTexture(characterData[0], currentCharacter[characterData[1]]);

                        let newText = line.split(":")[1].split("");
                        self.scene.time.addEvent({
                            delay: 10,
                            callback: ()=>
                            {
                                let dataArray = self.analyser.GetDataArray();
                                let value = dataArray[20] * dataArray[20] / 200000;
                                self.character.setScale(1 - value, 1 + value);

                                if(newText.length > 0)
                                    {
                                        self.dialogueText.text += newText.shift();
                                }
                            },
                            loop: true
                        })
                        
                        if(lines[0] == null) end = true;

                    }
                }
                else if(this.next)
                {
                    this.background.visible = false;
                    this.character.visible = false;
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