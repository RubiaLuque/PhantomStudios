export default class Entity
{
    constructor(name, damage, health, type, imagePath)
    {
        this.name = name
        this.health = health
        this.damage = damage
        this.type = type
        this.image = imagePath
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
        other.GetDamage(this.damage, 'physical')
    }

    MagicAttack(other)
    {
        other.GetDamage(this.damage, this.type)
    }

    Die()
    {
        console.log(this.name + ' died')
    }
}

const Type = {
    horny : {name:'horny', str: 'depression'},
    anxiety: {name:'anxiety', str: 'horny'},
    wrath: {name:'wrath', str: 'anxiety'},
    depression: {name:'depression', str: 'wrath'},
    physical: {name:'physical', str: 'depression'}
}