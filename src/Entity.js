export default class Entity
{
    constructor(name, damage, health, type, imagePath)
    {
        this.name = name
        this.health = health
        this.damage = damage
        this.type = type
        this.alive = true;
        this.on = new Phaser.Events.EventEmitter()

        this.image = imagePath
    }

    Setup()
    {
        let originalScale = {x: this.sprite.scaleX, y: this.sprite.scaleY}

        this.sprite.on('pointerover', function(){
            this.setScale(originalScale.x * 1.1, originalScale.y * 1.1);
        });
        this.sprite.on('pointerdown', function(){
            this.tint = 0xcccccc;
        });
        this.sprite.on('pointerup', function(){
            this.tint = 0xffffff;
        });
        this.sprite.on('pointerout', function(){
            this.setScale(originalScale.x, originalScale.y);
        });
    }

    GetDamage(damage, type)
    {
        if(type.str == this.type.name) damage *= 2
        else if(this.type.str == type.name) damage /= 2

        this.health -= damage
        console.log(this.name + ' health:' + this.health)

        if(this.health <= 0) this.Die()
    }

    Attack(other)
    {
        console.log(this + ' attacks ' + other.name)
        other.GetDamage(this.damage, 'physical')
    }

    MagicAttack(other)
    {
        other.GetDamage(this.damage, this.type)
    }

    Die()
    {
        console.log(this.name + ' died')
        this.sprite.setTexture('Shit')
        this.sprite.scale = 1;
        this.alive = false;
        this.on.emit('die');
    }
}

const Type = {
    horny : {name:'horny', str: 'depression'},
    anxiety: {name:'anxiety', str: 'horny'},
    wrath: {name:'wrath', str: 'anxiety'},
    depression: {name:'depression', str: 'wrath'},
    physical: {name:'physical', str: 'depression'}
}