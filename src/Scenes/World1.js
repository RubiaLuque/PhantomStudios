import CombatScene from "./CombatScene.js";
import Entity from "../CombatSystem/Entity.js";
import WinScene from "./WinScene.js";
import player from "../Navigation/Player.js";
import { MainTeam } from "../CombatSystem/Data/MainTeam.js";
import { EnemyPresets } from "../CombatSystem/Data/EnemyPresets.js";
let team1, team2;
let pos = {x: 0, y: 0};
let sceneAdded = false;
let defeatedEnemiesIds = [];

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

    init(result)
    {
        if(result.pos != undefined) pos = result.pos;
        if(result.id != undefined) defeatedEnemiesIds.push(result.id);
    }

    preload()
    {
        this.load.image("Main_Team", "assets/images/Main_Team.png");
        this.load.image("Fork", "assets/images/Fork.png");
        this.load.image("Demon", "assets/images/Demon.png");
        this.load.image("Uroboros", "assets/images/Uroboros.png");
        this.load.image("Skibidi", "assets/images/Skibidi.png");
    }

    create()
    {
        Player = new player(this, 100, 100);
        Player.setPosition(pos.x, pos.y);

        this.enemies = [];
        for(let i = 0; i < 4; i++)
        {
            if(defeatedEnemiesIds.includes(i)) continue;

            let enemyPreset = EnemyPresets.presets[Math.floor(Math.random() * EnemyPresets.presets.length)];
            let enemyImage = enemyPreset[0];
            let enemies = [];

            enemyPreset.forEach(enemy => {
                console.log(this.scene)
                enemies.push(Entity.TranslateEntity(MainTeam.enemies[enemy], this.scene.scene));
            })

            let enemy = new Phaser.GameObjects.Image(this, 125 * (i + 1), 125 * (i + 1), enemyImage);
            this.add.existing(enemy);
            enemy.scale = 0.2;
            enemy.team = enemies;
            enemy.id = i;
            this.enemies.push(enemy);
        }

        if(!sceneAdded)
        {
            this.scene.add('combat', CombatScene)
            this.scene.add('WinScene', WinScene);
            sceneAdded = true;
        }
        this.cameras.main.startFollow(Player, true, 0.05, 0.05);
    }

    update()
    {
        Player.preUpdate();

        this.enemies.forEach(enemy => {
            if(Phaser.Geom.Intersects.RectangleToRectangle(Player.getBounds(), enemy.getBounds()))
            {
                this.scene.start('combat', {team1: Player.team, team2: enemy.team, 
                    lastPlayerPosition: {x: Player.x, y: Player.y}, enemyId: enemy.id});
            }
        });

    }
}