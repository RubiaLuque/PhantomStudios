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
    }

    update()
    {
        if(this.lines.length > 0)
        {
            this.background.visible = true;
            if(this.scene.time.now > this.delay && this.next)
            {
                this.next = false;
                this.delay = this.scene.time.now + 100;
                this.dialogueText.text = this.lines.shift();
            }
        }
        else if(this.nextInput.isDown)
        {
            this.background.visible = false;
            this.dialogueText.text = "";
            this.endCallback();
        }
    }
}