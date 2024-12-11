import { config } from "../game.js";
export default class Team
{
    constructor(entities, name)
    {
        this.name = name;
        this.entities = entities
        this.onTeam = new Phaser.Events.EventEmitter()
        this.currentEntity = 0
        this.extraTurns = 0
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
        y += 350;
        this.entities.forEach(entity => {
            entity.sprite = scene.add.sprite(x, y, entity.name)
            entity.sprite.scale = 0.2
            entity.sprite.setOrigin(0.5, 1);
            scene.add.existing(entity.sprite)
            y += 140
            
            if(x < config.width/2) x += 20;
            else x-= 20;

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
            this.currentEntity = 0

            if(this.extraTurns > 0){
                this.extraTurns--;
                this.selectedEntity = this.entities[this.currentEntity];
                this.currentEntity++;
            }
            else valid = false;
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