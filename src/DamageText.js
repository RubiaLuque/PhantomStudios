export default class DamageText extends Phaser.GameObjects.Text
{
    constructor(scene, x, y, text, style)
    {
        super(scene, x, y, text, style);
        scene.add.existing(this);

        this.setOrigin(0.5, 0.5);
        this.setDepth(2);
        this.setScale(0.5);
        this.alpha = 0;
    }

    update()
    {
        if(this.alpha > 0)
        {
            this.alpha -= 0.01
            this.y = this.lerp(this.y, this.y - 30, 0.05)
            if(this.alpha < 0.1) this.alpha = 0
        }
    }

    lerp(a, b, t)
    {
        return a + (b - a) * t
    }
}