export default class Team
{
    constructor(entities)
    {
        this.entities = entities
    }

    Preload(scene)
    {
        this.entities.forEach(entity => {
            scene.load.image(entity.name, entity.image)
        })
    }

    Create(scene, x, y)
    {
        this.entities.forEach(entity => {
            entity.sprite = scene.add.sprite(x, y, entity.name)
            entity.sprite.scale = 0.2
            scene.add.existing(entity.sprite)
            y += 100
        })
    }

    GetCharacter(index)
    {
        if(index < 0 || index >= this.entities.length) index = 0
        return this.entities[index]
    }

    GetCharacterCount()
    {
        return this.entities.length
    }
}