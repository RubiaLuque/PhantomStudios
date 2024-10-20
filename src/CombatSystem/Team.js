export default class Team
{
    constructor(entities)
    {
        this.entities = entities
        this.onTeam = new Phaser.Events.EventEmitter()
    }

    Preload(scene)
    {
        scene.load.image("Shit", "assets/images/Shit.png")
        let self = this;

        this.entities.forEach(entity => {
            entity.scene = scene
            scene.load.image(entity.name, "assets/images/" + entity.image + ".png")
            scene.load.audio(entity.damageSound, "assets/music/" + entity.damageSound + ".wav")

            entity.on.on('die', function(){
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

            entity.Setup(game);
        })
    }

    GetCharacter(index)
    {
        if(index < 0 || index >= this.entities.length) index = 0
        return this.entities[index]
    }

    GetRandomCharacter()
    {
        return this.entities[Math.floor(Math.random() * this.entities.length)]
    }

    GetCharacterCount()
    {
        return this.entities.length
    }
}