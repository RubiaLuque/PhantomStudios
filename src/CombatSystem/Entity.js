export default class Entity
{
    constructor(name, damage, health, type, luck, image, scene, damageSound)
    {
        this.name = name
        this.health = health
        this.damage = damage
        this.type = type
        this.alive = true;
        this.luck = luck
        this.on = new Phaser.Events.EventEmitter()

        this.image = image
        this.scene = scene
        this.sound = scene.sound
        this.damageSound = damageSound
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
        console.log(this.damageSound)
        this.sound.play(this.damageSound)
        if(type.str == this.type.name) damage *= 2
        else if(this.type.str == type.name) damage /= 2

        this.health -= damage
        console.log(this.name + ' health:' + this.health)

        if(this.health <= 0) this.Die()

        this.on.emit('GetDamage', damage)
    }

    Attack(other, endCallback = function(){})
    {
        let self = this;
        let damage = self.damage;
        if(Math.random() < self.luck/10)
        {
            console.log(self.name + ' critical hit')
            damage *= 2
        }
        other.GetDamage(damage, self.type)

        this.scene.time.addEvent({ delay : 1000, callback: function(){endCallback()}, loop: false });
    }

    MagicAttack(other, endCallback = function(){})
    {
        let damage = this.damage;
        if(Math.random() < this.luck/10)
        {
            console.log(this.name + ' critical hit')
            damage *= 1.5
        }
        other.GetDamage(damage, this.type)

        this.scene.time.addEvent({ delay : 1000, callback: function(){endCallback()}, loop: false });
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