import CombatScene from "./CombatScene.js";
import Entity from "../CombatSystem/Entity.js";
import Team from "../CombatSystem/Team.js";
import player from "../Navigation/Player.js";
let team1, team2;

let Player

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
        this.load.image("Main_Team", "assets/images/Main_Team.png");
        this.load.image("Fork", "assets/images/Fork.png");
    }

    create()
    {
        Player = new player(this, 100, 100);

        let Fork = new Entity('Fork', 90, 50, Type.depression, 1, "Fork", this, 'kaj')
        let Fork2 = new Entity('Fork', 3, 50, Type.depression, 1, "Fork", this, 'kaj')
        let enemies = [Fork, Fork2]

        this.enemy = new Phaser.GameObjects.Image(this, 200, 200, 'Fork');
        this.add.existing(this.enemy);
        this.enemy.scale = 0.2;

        this.enemy.team = enemies;

        this.scene.add('combat', CombatScene)
    }

    update()
    {
        Player.preUpdate();

        if(Phaser.Geom.Intersects.RectangleToRectangle(Player.getBounds(), this.enemy.getBounds()))
        {
            this.scene.start('combat', {team1: Player.team, team2: this.enemy.team})
        }
    }
}