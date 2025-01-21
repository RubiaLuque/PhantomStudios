import { AlteredState } from "./Data/AlteredState.js"
export default class AlteredStateInfo extends Phaser.Physics.Arcade.Sprite
{
    constructor(scene, x, y, entity) {
        super(scene, x, y, 'whiteCircle')
        
        this.circle = scene.add.image(x, y, 'whiteCircle');
        this.circle.setScale(0.035, 0.035);

        this.setOrigin(0.5, 0.5);
        scene.add.existing(this);
        this.setScale(0.015, 0.015);

        this.set(entity.alteredState);

        this.backPanel = scene.add.rectangle(x, y, 150, 25, 0x000000);
        this.backPanel.alpha = 0.5;
        this.backPanel.setOrigin(0.5, 1);
        this.backPanel.visible = false;

        this.explanationText = scene.add.text(x, y, "", {fontSize: '12px', fill: '#FFF', align: 'center'});
        this.explanationText.setOrigin(0.5, 1)

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

    set(alteredState)
    {
        if(alteredState == AlteredState.none)
        {
            this.visible = false;
            this.circle.visible = false;
        }
        else
        {
            this.visible = true;
            this.circle.visible = true;
            this.setTexture(alteredState.icon);
        }
    }
}