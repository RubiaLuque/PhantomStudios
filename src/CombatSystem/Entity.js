import { analyser } from "../SoundSystem/Index.js"
import { AlteredState } from "./Data/AlteredState.js"
import { Type } from "./Data/Type.js"


export default class Entity
{
    constructor(container, scene)
    {
        this.name = container.name
        this.health = {quantity: container.health, bonus: 0}
        this.maxHealth = this.health.quantity
        this.attack = container.attack
        this.defense = {quantity: container.defense, bonus: 0}
        this.damage = {quantity: container.damage, bonus: 0}
        this.type = container.type
        this.alive = true;
        this.luck = {quantity: container.luck, bonus: 0}
        this.healing = {quantity: -30, bonus: 0, able: true}
        this.event = new Phaser.Events.EventEmitter()
        this.magicalImmunity = false;
        this.physicalImmunity = false;
        this.target = this

        this.image = container.image
        this.scene = scene
        this.sound = analyser;
        this.damageSound = container.damageSound
        this.xp = container.xp
        this.xpThisTurn = 0;
        this.level = container.level
        this.maxLevel = container.maxLevel;
        this.alteredState = AlteredState.none;
        this.doneCritic = false;

        this.alteredStateDuration = 0;

        this.selectedAttack = () => {console.log('No attack selected')}
    }

    static TranslateEntity(container, scene) {
        return new Entity(container, scene) //Podriamos ahorrarnos este método ahora que he cambiado el constructor pero me da toda la pereza del mundo cambiarlo
    }

    Setup()
    {
        this.health.quantity = this.health.quantity + this.health.bonus
        this.maxHealth = this.maxHealth + this.health.bonus

        let originalScale = {x: this.sprite.scaleX, y: this.sprite.scaleY}

        this.sprite.on('pointerover', ()=>{
            this.sprite.setScale(originalScale.x * 1.1, originalScale.y * 1.1);
        });
        this.sprite.on('pointerdown', ()=>{
            this.sprite.tint = 0xcccccc;
        });
        this.sprite.on('pointerup', ()=>{
            this.sprite.tint = 0xffffff;
        });
        this.sprite.on('pointerout', ()=>{
            this.sprite.setScale(originalScale.x, originalScale.y);
        });
    }

    SetupEvents(callbacks)
    {
        this.event.on('GetDamage', callbacks.onGetDamage)
        this.sprite.on('pointerover', callbacks.onPointerOver)
        this.event.on('target', callbacks.onTarget)
        this.sprite.on('pointerdown', callbacks.onPointerDown)
        this.event.on('takeTurn', callbacks.onTakeTurn)
    }

    GetDamage(damage, type, attacker)
    {
        this.sound.Play(this.damageSound)
        if((this.magicalImmunity && this.type.name != "physical") || (this.physicalImmunity && this.type.name=='physical')){
            damage *= 0;
            this.magicalImmunity = false;
            this.physicalImmunity = false;
        }
        else if(type.str == this.type.name) damage *= 2

        else if(this.type.str == type.name) damage /= 2
        
        this.health.quantity -= damage

        if(this.health.quantity > this.maxHealth)
        {
            this.health.quantity = this.maxHealth
        }
        if(this.health.quantity <= 0)
        {
            attacker.xp += this.xp;
            attacker.xpThisTurn += this.xp;
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
        let damage = this.damage.quantity + this.damage.bonus;
        let luck = this.luck.quantity + this.luck.bonus;
        if(Math.random() < luck/10)
        {
            damage *= 1.5
        }

        if(other.target == undefined) other.target = other;
        other.target.GetDamage(damage, type, attacker)

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
        let healing = this.healing.quantity + this.healing.bonus
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
        console.log(endCallback)
        this.AttackTemplate(other, this.type, attacker)
        this.scene.time.addEvent({ delay : 1000, callback: ()=>{endCallback()}, loop: false });
    }

    HealAttack(other, endCallback = function(){}, attacker)
    {
        this.healing.able--; this.HealTemplate(other, this.type, attacker)
        this.scene.time.addEvent({ delay : 1000, callback: ()=>{endCallback()}, loop: false });
        if(this.health.quantity > this.maxHealth) this.health.quantity = this.maxHealth
    }

    ApplyAlteredState(state, duration)
    {
        this.alteredState = state;
        this.alteredState.enter({user: this});
        this.alteredStateDuration = duration;

        if(this.stateInfo != undefined) this.stateInfo.set(this.alteredState)
    }

    CheckAlteredState(data)
    {
        if(this.alteredStateDuration > 0)
        {
            this.alteredStateDuration--;
            this.alteredState.exit(data);
        }
        else this.alteredState = AlteredState.none;
        return this.alteredState.check(data);
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

    MoveTo(target, endCallback = function(){}){
        this.target = target;
        endCallback();
    }
}