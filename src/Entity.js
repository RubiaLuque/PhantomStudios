export default class Entity
{
    constructor(name, damage, health, type)
    {
        this.name = name
        this.health = health
        this.damage = damage
        this.type = type
    }

    GetDamage(damage, type)
    {
        if(type.str == this.type.name) damage *= 2
        else if(this.type.str == type.name) damage /= 2

        this.health -= damage
        console.log(this.name + ' health:' + this.health)
    }

    Attack(other)
    {
        other.GetDamage(this.damage, 'physical')
    }

    MagicAttack(other)
    {
        other.GetDamage(this.damage, this.type)
    }
}

const Type = {
    horny : {name:'horny', str: 'depression'},
    anxiety: {name:'anxiety', str: 'horny'},
    wrath: {name:'wrath', str: 'anxiety'},
    depression: {name:'depression', str: 'wrath'},
    physical: {name:'physical', str: 'depression'}
}