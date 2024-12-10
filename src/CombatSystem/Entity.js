import { analyser } from "../SoundSystem/Index.js"
import { AlteredState } from "./Data/AlteredState.js"

export default class Entity
{
    constructor(name, damage, health, type, luck, defense, attack, image, scene, damageSound)
    {
        this.name = name
        this.health = health
        this.maxHealth = health
        this.attack = attack
        this.defense = defense
        this.damage = damage
        this.type = type
        this.alive = true;
        this.luck = luck
        this.on = new Phaser.Events.EventEmitter()

        this.image = image
        this.scene = scene
        this.sound = analyser;
        this.damageSound = damageSound
        this.alteredState = AlteredState.none;
    }

    static TranslateEntity(container, scene) {
        return new Entity(container.name, container.damage, container.health, container.type, container.luck, container.defense, container.attack, container.image, scene, container.damageSound)
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
        this.sound.Play(this.damageSound)
        if(type.str == this.type.name) damage *= 2
        else if(this.type.str == type.name) damage /= 2

        console.log(damage);
        this.health -= damage
        console.log(this.name + ' health:' + this.health)

        if(this.health <= 0) this.Die()

        let self = this
        let xTracker = this.sprite.x
        let goBack = false

        this.scene.time.addEvent({ delay : 5,
            callback: function(){
                if(goBack){
                    self.sprite.x -= 1
                    if(self.sprite.x <= xTracker - 10){
                        self.sprite.x = xTracker;
                        self.scene.time.removeEvent(this)
                    }
                }
                else{
                    self.sprite.x += 1
                    if(self.sprite.x >= xTracker + 10){
                        self.sprite.x = xTracker + 10
                        goBack = true
                    }
                }
            },
            loop: true
        });

        this.on.emit('GetDamage', damage)
    }

    AttackTemplate(other, type)
    {
        let damage = this.damage;
        if(Math.random() < this.luck/10)
        {
            console.log(this.name + ' critical hit')
            damage *= 1.5
        }
        console.log(this)
        other.GetDamage(damage, type)

        let self = this

        this.scene.time.addEvent({ delay : 5,
            callback: function(){
                self.sprite.rotation += 0.1
                if(self.sprite.rotation >= 3)
                {
                    self.sprite.rotation = 0
                    self.scene.time.removeEvent(this)
                }
            },
            loop: true });
    }

    Attack(other, endCallback = function(){})
    {
        this.AttackTemplate(other, Type.physical)
        this.scene.time.addEvent({ delay : 1000, callback: function(){endCallback()}, loop: false });
    }

    MagicAttack(other, endCallback = function(){})
    {
        this.AttackTemplate(other, this.type)
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

    //Se borran los estados alterados tras un combate
    ClearAlteredStates(){
        this.alteredState = AlteredState.none;
    }
}

const Type = {
    horny : {name:'horny', str: 'depression'},
    anxiety: {name:'anxiety', str: 'horny'},
    wrath: {name:'wrath', str: 'anxiety'},
    depression: {name:'depression', str: 'wrath'},
    physical: {name:'physical', str: 'depression'}
}


// const AlteredState = {
//     None: {
//         enter: function(){},
//         check: function(){return true},
//         exit: function(){}
//     },
//     Sueño: { 
//         enter: function(){},
//         check: function(target){ target.health += 4; return false},
//         exit: function(){}
//     },
//     Sordo: {
//         enter: function(){},
//         check: function(){return true},
//         exit: function(){}
//     },
//     Miedo:{
//         enter: function(){},
//         check: function(target, team){ 
//             let selected = team.GetRandomCharacterExcept(target);
//             target.sprite.setPosition(selected.x - 100, selected.y);
//             return true
//         },
//         exit: function(){}
//     },
//     Papeado:{
//         enter: function(){},
//         check: function(){return true},
//         exit: function(){}
//     }
// }