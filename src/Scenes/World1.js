import CombatScene from "./CombatScene.js";
import Entity from "../CombatSystem/Entity.js";
import WinScene from "./WinScene.js";
import player from "../Navigation/Player.js";
import { MainTeam } from "../CombatSystem/Data/MainTeam.js";
import { EnemyPresets } from "../CombatSystem/Data/EnemyPresets.js";
import CustomButton from "../UI/CustomButton.js";

let team1, team2;
let pos = {x: 0, y: 0};
let sceneAdded = false;
let defeatedEnemiesIds = [];
let mainMenuButton;

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
        this.load.image('TestTileset', 'assets/images/SpritesPrueba.png');
        this.load.image("Tiles", "assets/tilemaps/tilemap_prueba.png")
        this.load.tilemapTiledJSON("World1", "assets/tilemaps/mundo1.json")
        this.load.tilemapTiledJSON('TestTileMap', 'assets/tilemaps/Testing.json');
        this.load.image('button', 'assets/images/Button.png');
    }

    create()
    {
        mainMenuButton = new CustomButton(this, 40, 20, 'button', 'Return', 
             () =>{
                 this.scene.start("main_menu");
             }
         );
        mainMenuButton.setButtonScale(0.25,0.25);
        mainMenuButton.setTextPosition(-20,-7);
        
        this.tileMap = this.make.tilemap({
            key: "World1"
        })

        const set = this.tileMap.addTilesetImage('Prueba', 'Tiles')

        this.collidables = this.tileMap.createLayer('Capa de patrones 1', set)
        this.collidables.setCollision(1);

        this.player = this.tileMap.createFromObjects("entidades", {name: 'Player', classType: player, key: 'Main_Team'})[0] //key sirve para indicar que image carga

        this.physics.add.collider(this.player, this.collidables)

        this.enemies = this.tileMap.createFromObjects("entidades", {name: 'Enemy', clasType: Phaser.Physics.Arcade.Sprite, key: EnemyPresets.presets[Math.floor(Math.random() * EnemyPresets.presets.length)][0]}); //Buscar forma de que este sprite sea aleatorio en cada miembro
        console.log(this.enemies)
        let enemyIndex = 0;
        this.enemies.forEach(enemy =>{
            
            this.physics.add.existing(enemy);
            //enemy.setGravityY(0.05);
            this.physics.add.collider(enemy, this.collidables)

            enemy.id = enemyIndex;
            console.log(enemy.id)
            if(defeatedEnemiesIds.includes(enemy.id)) this.enemies[enemyIndex].destroy()
            else{
            let enemyPreset = EnemyPresets.presets[Math.floor(Math.random() * EnemyPresets.presets.length)];
            let enemies = [];

            enemyPreset.forEach(enemy => {
                console.log(this.scene)
                enemies.push(Entity.TranslateEntity(MainTeam.enemies[enemy], this.scene.scene));
            })

            enemy.scale = 0.2;
            enemy.team = enemies;
        }
        enemyIndex++;
        })
        console.log(this.enemies)
        if(!sceneAdded)
        {
            this.scene.add('combat', CombatScene)
            this.scene.add('WinScene', WinScene);
            sceneAdded = true;
        }
        this.cameras.main.startFollow(this.player, true, 0.05, 0.05);
    }

    update()
    {
        this.player.preUpdate()

        this.enemies.forEach(enemy => {
            if(!defeatedEnemiesIds.includes(enemy.id) && Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), enemy.getBounds()))
            {
                this.scene.start('combat', {team1: this.player.team, team2: enemy.team, 
                    lastPlayerPosition: {x: this.player.x, y: this.player.y}, enemyId: enemy.id});
            }
        });

    }
}