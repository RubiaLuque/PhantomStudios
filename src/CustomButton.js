export default class CustomButton extends Phaser.GameObjects.Sprite
{
    constructor(scene, x, y, texture, text, callback)
    {
        super(scene, x, y, texture);
        this.setScale(1, 0.5);
        this.setInteractive();

        this.on('pointerover', function(){
            this.setScale(1.1, 0.6);
        });
        this.on('pointerdown', function(){
            this.tint = 0xcccccc;
            callback();
        });
        this.on('pointerup', function(){
            this.tint = 0xffffff;
        });
        this.on('pointerout', function(){
            this.setScale(1, 0.5);
        });

        scene.add.existing(this);
        this.text = scene.add.text(x - 40, y - 10, text, { fontSize: '32px', fill: '#000' });
    }
}