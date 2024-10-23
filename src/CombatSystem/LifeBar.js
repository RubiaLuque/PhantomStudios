export default class LifeBar extends Phaser.GameObjects.Sprite
{
    constructor(scene, x, y, texture, entity)
    {
        super(scene, x, y, texture);
        this.entity = entity;
        this.tint = 0xff0000;
        scene.add.existing(this);

        scene.add.text(x-20, y-5, this.entity.name);

        let UpdateBar = this.UpdateBar.bind(this);
        this.entity.on.on('GetDamage', UpdateBar);
        UpdateBar();
    }

    UpdateBar()
    {
        if(this.entity.health <= 0) this.destroy();
        else this.setScale((this.entity.health / this.entity.maxHealth) * 0.3, 0.1);
    }
}