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
        this.entity.event.on('GetDamage', UpdateBar);
        UpdateBar();
    }

    UpdateBar()
    {
        let health = this.entity.health.quantity + this.entity.health.bonus

        if(health <= 0) this.destroy();
        else this.setScale((health / this.entity.maxHealth) * 0.3, 0.1);
        console.log(health, " ", this.entity.maxHealth)
    }
}