import CombatScene from "./CombatScene.js";
import Entity from "./Entity.js";
import Team from "./Team.js";
let team1, team2;

const Type = {
    horny : {name:'horny', str: 'depression'},
    anxiety: {name:'anxiety', str: 'horny'},
    wrath: {name:'wrath', str: 'anxiety'},
    depression: {name:'depression', str: 'wrath'},
    physical: {name:'physical', str: 'depression'}
}

export default class World1 extends Phaser.Scene
{
    constructor(){
        super({key: "World1"});
    }

    init()
    {
    }

    preload()
    {
        let Javi, Fueyo, Mika, Muxu
        
        Javi = new Entity('Javi', 10, 15, Type.horny, 2, "./assets/images/Javi.png")
        Mika = new Entity('Mika', 5, 20, Type.depression, 2, "./assets/images/Mika.png")
        Fueyo = new Entity('Fueyo', 7, 17, Type.wrath, 2, "./assets/images/Fueyo.png")
        Muxu = new Entity('Muxu', 6, 12, Type.anxiety, 4, "./assets/images/Muxu.png")

        let allies = [Javi, Fueyo, Mika, Muxu]

        let Fork = new Entity('Fork', 90, 50, Type.depression, 1, "./assets/images/Fork.png")
        let Fork2 = new Entity('Fork', 3, 50, Type.depression, 1, "./assets/images/Fork.png")
        let enemies = [Fork, Fork2]
        
        team1 = new Team(allies);
        team2 = new Team(enemies);

        this.scene.add('combat', CombatScene)
    }

    create()
    {
        this.scene.start('combat', {team1, team2});
    }

    update()
    {

    }
}