import { AlteredState } from "./Data/AlteredState.js"
export default class AlteredStateInfo extends Phaser.Physics.Arcade.Sprite
{
    constructor(scene, x, y, entity) {
        super(scene, x, y, 'whiteCircle')

        this.setOrigin(0.5, 0.5);
        this.setScale(0.015, 0.015);
        scene.add.existing(this);

        this.backPanel = scene.add.rectangle(x, y, 150, 50, 0x000000);
        this.backPanel.alpha = 0.5;
        this.backPanel.setOrigin(0.5, 0);
        this.backPanel.visible = false;

        this.explanationText = scene.add.text(x, y, "", {fontSize: '12px', fill: '#FFF', align: 'center'});
        this.explanationText.setOrigin(0.5, 0)

        this.on('pointerover', ()=>{
            if(entity.alteredState == AlteredState.none) return;
            this.explanationText.visible = true;
            this.backPanel.visible = true;
            this.explanationText.text = entity.alteredState.explanation;
        });
        this.on('pointerout', ()=>{
            this.explanationText.visible = false;
            this.backPanel.visible = false;
            this.explanationText.text = "";
        });

        this.setInteractive();
    }
}