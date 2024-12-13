import { DialogueCharacterData } from "./DialogueCharacterData.js";
import { analyser } from "../SoundSystem/Index.js";
import {config} from "../game.js"
export default class DialogueInterpreter {
    names = [ "Javi", "Fueyo", "Mika", "Muxu" ];

    constructor(scene){
        this.scene = scene;

        let posX = scene.player.x
        let posY = scene.player.y

        this.background = new Phaser.GameObjects.Rectangle(scene, posX, posY + config.height/2.35, 800, 200, 0x000000);
        this.background.alpha = 0.5;

        this.character = scene.add.sprite(this.background.x, this.background.y, "Fueyo");
        this.character.setOrigin(0.5, 1)
        this.character.setPosition(this.background.x, posY + config.height/2)
        this.character.setScale(0.4, 0.4)
        this.character.visible = false;

        scene.add.existing(this.background);

        this.dialogueText = scene.add.text(this.background.x - this.background.getBounds().width/2, this.background.y, '', { fontSize: '32px', fill: '#FFF'});
        this.background.visible = false;

        this.nextInput = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.nextInput.on('down', ()=>{
            this.next = true;
        });

        this.analyser = analyser;
    }

    SetDialogue(dialogue, endCallback = function(){}){
        this.scene.player.canMove = false;

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
                    let posX = this.scene.player.x
                    let posY = this.scene.player.y
                    this.background.setPosition(posX, posY + config.height / 3)
                    this.dialogueText.setPosition(this.background.x - this.background.getBounds().width/2, this.background.y)
                    this.character.setPosition(this.background.x, posY + config.height/2)

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
                                // self.character.setScale(0.3 - value, 0.3 + value);

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

                    this.scene.player.canMove = true;
                    endCallback();
                }
            },
            callbackScope: this.scene,
            loop: true
        });
       }
}