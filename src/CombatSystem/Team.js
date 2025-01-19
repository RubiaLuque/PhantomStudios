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

    Create(scene, ambush)
    {
        let positions;

        if(ambush) positions = [{x:150, y:200}, {x:650, y:200}, {x:150, y:450}, {x:650, y:450}]
        else positions = [{x:350, y:250}, {x:450, y:250}, {x:350, y:350}, {x:450, y:350}]

        let i = 0;
        this.entities.forEach(entity => {
            let position = positions[i];

            entity.sprite = scene.add.sprite(position.x, position.y, entity.name)
            entity.sprite.scale = 0.1
            entity.sprite.setOrigin(0.5, 1);
            scene.add.existing(entity.sprite)
            
            entity.Setup(scene);
            i++;
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

    isTeamDead() {
        //false: el equipo no esta muerto entero
        //true: todo el equipo ha muerto
        this.entities.forEach( e => {
            console.log(e.alive)
            if (e.alive) return false;
            else return true;
        })

        
    }
}