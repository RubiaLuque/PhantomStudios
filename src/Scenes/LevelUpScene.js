import CustomButton from "../UI/CustomButton.js";

let levelText, upgradeText;
let team;
let pos;
let id;
let NPCFound = [], NPCTalked = [];
let LifeButton, AttackButton, DefenseButton;
let personaje;
let character;

export default class LevelUpScene extends Phaser.Scene
{
    constructor(){
        super({key: "LevelUp"});
    }

    init(result)
    {
        if(result.pos != undefined) pos = result.pos;
        if(result.team != undefined) team = result.team;
        if(result.id != undefined) id = result.id;
        if(result.NPCFound != undefined) NPCFound = result.NPCFound;
        if(result.NPCTalked != undefined) NPCTalked = result.NPCTalked;
        this.cafeteriaEnter = result.cafeteriaEnter
    }

    preload()
    {
        team.Preload(this)
    }

    create()
    {
        personaje = new Phaser.Events.EventEmitter();
        console.log(team)
        let i = 0;
        personaje.on('puedeMejorar', ()=>{
            console.log(team.entities[i])
            if(team.entities[i].xp >= (team.entities[i].level * 10) && team.entities[i].level < team.entities[i].maxLevel)
                {
                    personaje.emit('mejorar')
                }
                else personaje.emit('siguiente')
            });
            
            personaje.on('mejorar', ()=>{

                team.entities[i].sprite = this.add.sprite(100, 250, team.entities[i].name)
                team.entities[i].sprite.scale = 0.2
                character = this.add.existing(team.entities[i].sprite)
                
                team.entities[i].xp -= (team.entities[i].level * 10)
                team.entities[i].level++
                levelText = this.add.text(0, 0,     "¡Has subido al nivel "+team.entities[i].level+"!", { fontSize: '50px', fill: '#ffffff' });
                upgradeText = this.add.text(0, 400, "Selecciona una\nestadística\nque mejorar", { fontSize: '40px', fill: '#ffffff' });

                LifeButton = new CustomButton(this, 600, 100, "Button", "Vida", 
                    function(){
                        team.entities[i].maxHealth = team.entities[i].maxHealth + 10;
                        team.entities[i].health.quantity = team.entities[i].health.quantity + 10;
                        console.log(team.entities[i])
                        AttackButton.destroy()
                        DefenseButton.destroy()
                        LifeButton.destroy()
                        personaje.emit('puedeMejorar')
                    }
                );
                AttackButton = new CustomButton(this, 600, 300, "Button", "Ataque", 
                    function(){
                        team.entities[i].damage.quantity = team.entities[i].damage.quantity + 5;
                        console.log(team.entities[i])
                        LifeButton.destroy()
                        DefenseButton.destroy()
                        AttackButton.destroy()
                        personaje.emit('puedeMejorar')
                    }
                );
                DefenseButton = new CustomButton(this, 600, 500, "Button", "Defensa", 
                    function(){
                        team.entities[i].defense.quantity = team.entities[i].defense.quantity + 5;
                        console.log(team.entities[i])
                        LifeButton.destroy()
                        AttackButton.destroy()
                        DefenseButton.destroy()
                        personaje.emit('puedeMejorar')
                    }
                );
        });

        personaje.on('siguiente', ()=>{
            i++;
            if(character != null) character.destroy();
            if(i < team.GetCharacterCount()) personaje.emit('puedeMejorar');
            else personaje.emit('finMejoras');
        });

        personaje.on('finMejoras', ()=>{
            console.log(team)
            this.scene.start('World1', {pos: pos, id: id, team: team, NPCFound: NPCFound, NPCTalked: NPCTalked, cafeteriaEnter: this.cafeteriaEnter});
        })

        personaje.emit('puedeMejorar')
    }

    update()
    {

    }
}