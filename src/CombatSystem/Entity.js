import { analyser } from "../SoundSystem/Index.js"
import { AlteredState } from "./Data/AlteredState.js"
import { Type } from "./Data/Type.js"


let healAvailable = true;
export default class Entity
{
    constructor(name, damage, health, type, luck, defense, attack, image, scene, damageSound, xp, level, maxLevel)
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
        this.event = new Phaser.Events.EventEmitter()

        this.image = image
        this.scene = scene
        this.sound = analyser;
        this.damageSound = damageSound
        this.xp = xp
        this.level = level
        this.maxLevel = maxLevel;
        this.alteredState = AlteredState.none;
        this.doneCritic = false;


        this.selectedAttack = () => {console.log('No attack selected')}
    }

    static TranslateEntity(container, scene) {
        return new Entity(container.name, container.damage, container.health, container.type, container.luck, container.defense, container.attack, container.image, scene, container.damageSound, container.xp, container.level, container.maxLevel)
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

    GetDamage(damage, type, attacker)
    {
        this.sound.Play(this.damageSound)
        if(type.str == this.type.name) damage *= 2
        else if(this.type.str == type.name) damage /= 2

        this.health -= damage
        console.log(this.name + ' health:' + this.health)

        if(this.health > this.maxHealth)
        {
            this.health = this.maxHealth
        }
        console.log(this)
        if(this.health <= 0)
        {
            attacker.xp += this.xp;
            this.Die()
        }
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

        this.event.emit('GetDamage', damage)
    }

    AttackTemplate(other, type, attacker)
    {
        console.log(other)
        let damage = this.damage;
        if(Math.random() < this.luck/10)
        {
            damage *= 1.5
        }
        other.GetDamage(damage, type, attacker)

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

    HealTemplate(other, type, attacker)
    {
        let healing = -30;
        other.GetDamage(healing, type, attacker)

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

    Attack(other, endCallback = function(){}, attacker)
    {
        this.AttackTemplate(other, Type.physical, attacker)
        this.scene.time.addEvent({ delay : 1000, callback: ()=>{endCallback()}, loop: false });
    }

    MagicAttack(other, endCallback = function(){}, attacker)
    {
        this.AttackTemplate(other, this.type, attacker)
        this.scene.time.addEvent({ delay : 1000, callback: ()=>{endCallback()}, loop: false });
    }

    HealAttack(other, endCallback = function(){}, attacker)
    {
        if(healAvailable) {healAvailable = false; this.HealTemplate(other, this.type, attacker)}
        this.scene.time.addEvent({ delay : 1000, callback: ()=>{endCallback()}, loop: false });
    }

    Die()
    {
        this.sprite.setTexture('Shit')
        this.sprite.scale = 1;
        this.alive = false;
        this.event.emit('die');
    }

    isWeak(type)
    {
        return type.str == this.type.name
    }

    //Se borran los estados alterados tras un combate
    ClearAlteredStates(){
        this.alteredState = AlteredState.none;
    }
}