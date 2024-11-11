export default class CustomButton extends Phaser.GameObjects.Sprite
{
    currentScale = {x: 1, y: 0.5};
    constructor(scene, x, y, texture, text, callback)
    {
        super(scene, 0, 0, texture);
        this.depth = 1; //Para que se renderice por encima del tilemap

        this.setScale(this.currentScale.x, this.currentScale.y);
        this.setInteractive();

        this.on('pointerover', function(){
            this.setScale(this.currentScale.x * 1.1, this.currentScale.y * 1.1);
        });
        this.on('pointerdown', function(){
            this.tint = 0xcccccc;
            callback();
        });
        this.on('pointerup', function(){
            this.tint = 0xffffff;
        });
        this.on('pointerout', function(){
            this.setScale(this.currentScale.x, this.currentScale.y);
        });

        scene.add.existing(this);
        this.text = scene.add.text(-40, -10, text, { fontSize: '42px', fill: '#000' });
        this.container = scene.add.container(x, y, [this, this.text]);
    }

    setButtonPosition(x, y)
    {
        this.container.x = x;
        this.container.y = y;
    }

    setButtonScale(x, y)
    {
        this.scaleX = x;
        this.scaleY = y;
        this.text.setFontSize(42 * y);
        this.text.x = this.x - 40 * x;
        this.text.y = this.y - 10 * y;
        this.currentScale = {x: x, y: y};
    }

    setButtonRotation(rotation)
    {
        this.container.rotation = rotation;
    }

    setActive(value)
    {
        this.container.visible = value;
    }

    // Se situa el texto dentro del boton relativo al mismo
    setTextPosition(x, y){
        this.text.x = this.x + x;
        this.text.y = this.y + y;
    }
}