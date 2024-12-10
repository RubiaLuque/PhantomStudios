export default class Team
{
    constructor(entities)
    {
        this.entities = entities
        this.onTeam = new Phaser.Events.EventEmitter()
        this.currentEntity = 0
    }

    Preload(scene)
    {
        scene.load.image("Shit", "assets/images/Shit.png")
        let self = this;

        this.entities.forEach(entity => {
            entity.scene = scene
            scene.load.image(entity.name, "assets/images/" + entity.image + ".png")
            scene.load.audio(entity.damageSound, "assets/music/" + entity.damageSound + ".wav")

            entity.event.on('die', function(){
                self.entities.forEach((item, index) => {
                    if (item === entity) {
                        self.entities.splice(index, 1);
                    }
                });

                if(self.entities.length <= 0) self.onTeam.emit('death')
            })
        })
    }

    Create(scene, x, y, game)
    {
        this.entities.forEach(entity => {
            entity.sprite = scene.add.sprite(x, y, entity.name)
            entity.sprite.scale = 0.2
            scene.add.existing(entity.sprite)
            y += 140
            x -= 10

            entity.Setup(game);
        })
    }

    CurrentCharacter()
    {
        return this.selectedEntity
    }

    GetNextCharacter()
    {
        let valid = true;
        this.selectedEntity = this.entities[this.currentEntity]

        if(this.currentEntity >= this.entities.length)
        {
            valid = false;
            this.currentEntity = 0
        }
        else
        {
            this.currentEntity++
        }

        return {isValid: valid, entity: this.selectedEntity}
    }

    GetRandomCharacter()
    {
        return this.entities[Math.floor(Math.random() * this.entities.length)]
    }

    GetRandomCharacterExcept(except)
    {
        let aux = this.entities.filter(entity => entity != except)
        return aux[Math.floor(Math.random() * aux.length)]
    }

    GetCharacterCount()
    {
        return this.entities.length
    }
}