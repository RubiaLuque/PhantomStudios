export default class DialogueInterpreter {
    delay = 1000;
    constructor(dialogueText, background, scene){
        this.dialogueText = dialogueText;
        this.scene = scene;
        this.background = background;
        this.background.visible = false;
        scene.add.existing(this.background);

        this.nextInput = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.nextInput.on('down', function(){
            this.next = true;
        }, this);
    }

    SetDialogue(dialogue, endCallback = function(){}){
        this.lines = dialogue.split("@");
        this.lines[this.lines.length] = "";
        this.endCallback = endCallback;
        this.dialogueText.text = this.lines.shift();
        let self = this;
        this.background.visible = true;

        this.scene.time.addEvent({
            delay: 10,
            callback: function(){
                if(self.lines.length > 0)
                {
                    if(self.scene.time.now > self.delay && self.next)
                    {
                        self.next = false;
                        self.delay = self.scene.time.now + 100;
                        self.dialogueText.text = self.lines.shift();
                    }
                }
                else if(self.nextInput.isDown)
                {
                    self.background.visible = false;
                    self.dialogueText.text = "";
                    self.scene.time.removeAllEvents();
                    self.endCallback();
                }
            },
            callbackScope: self.scene,
            loop: true
        });
    }
}