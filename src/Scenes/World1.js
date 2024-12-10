import CombatScene from "./CombatScene.js";
import WinScene from "./WinScene.js";
import player from "../Navigation/Player.js";
import Enemy from "../Navigation/Enemy.js";
import Cafeteria from "../Navigation/Cafeteria.js";
import { EnemyPresets } from "../CombatSystem/Data/EnemyPresets.js";
import CardsScene from "./CardsScene.js";
import CustomButton from "../UI/CustomButton.js";
import NPC from "../Navigation/NPC.js";
import {analyser} from "../SoundSystem/Index.js";

let team1, team2;
let pos = {x: 0, y: 0};
let sceneAdded = false;
let healths;
let defeatedEnemiesIds = [];
let mainMenuButton;
let NPCFound = ["Andres", "Sanchez"];
let NPCTalked = [];
let team;

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
        // if(result.healths != undefined) healths = result.healths;
        if(result.NPCFound != undefined) NPCFound = result.NPCFound;
        if(result.NPCTalked != undefined) NPCTalked = result.NPCTalked;
        if (result.team != undefined) team = result.team;
        console.log(result.healths)
    }

    preload()
    {
        this.load.image("Main_Team", "assets/images/Main_Team.png");
        this.load.image("Cafeteria", "assets/images/Cafeteria.png");
        this.load.image("NPC", "assets/images/NPC.png");
        this.load.image("Fork", "assets/images/Fork.png");
        this.load.image("Demon", "assets/images/Demon.png");
        this.load.image("Uroboros", "assets/images/Uroboros.png");
        this.load.image("Skibidi", "assets/images/Skibidi.png");
        this.load.image('TestTileset', 'assets/images/SpritesPrueba.png');
        this.load.image("Tiles", "assets/tilemaps/inca_back.png")
        this.load.tilemapTiledJSON("World1", "assets/tilemaps/mundo1.json")
        this.load.tilemapTiledJSON('TestTileMap', 'assets/tilemaps/Testing.json');
        this.load.image('button', 'assets/images/Button.png');
    }

    create()
    {
           this.tileMap = this.make.tilemap({
            key: "World1"
        })

        const set = this.tileMap.addTilesetImage('Aztec_Tileset', 'Tiles')

        analyser.SetRandomSong(['Reach_Out', 'Going_Down', 'CYN', 'School_Days', 'Break_Out'])
        analyser.Restart();
        
        this.collidables = this.tileMap.createLayer('Capa de patrones 1', set)
        this.collidables.setCollision([8, 23, 27, 28, 14, 5, 6, 7, 4, 11, 17, 12]);

        this.cafeteria = this.tileMap.createFromObjects("entidades", {name: 'Cafeteria', classType: Cafeteria, key: 'Cafeteria'})[0];

        this.Toni = this.tileMap.createFromObjects("entidades", {name: 'Toni', classType: NPC, key: 'NPC'})[0];

        this.player = this.tileMap.createFromObjects("entidades", {name: 'Player', classType: player, key: 'Main_Team'})[0] //key sirve para indicar que image carga
        if (team != undefined){
            this.player.team = team;
        }
        this.player.eKey.on("down", ()=>{
            if(Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), this.cafeteria.getBounds()))
            {
                this.scene.start('CafeteriaScene', {team: this.player.team, pos: {x: this.player.x, y: this.player.y}, NPCFound: NPCFound })
            }
            if(Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), this.Toni.getBounds()))
            {
                NPCFound.push(this.Toni.name)
                this.Toni.destroy()
            }
        })

        if (pos.x != 0 && pos.y != 0) {
            this.player.x = pos.x
            this.player.y = pos.y
        }
        // if (healths != undefined)
        // {
        //     this.player.team.forEach(entity =>{
        //         if(healths[entity.name] == undefined)
        //         {
        //             entity.health = 1;
        //         }
        //         else
        //         {
        //             entity.health = healths[entity.name]
        //         }
        //     })
        // }

        this.physics.add.collider(this.player, this.collidables)
        
        this.enemies = this.tileMap.createFromObjects("entidades", {name: 'Enemy', classType: Enemy, key: 'Fork'}); //Buscar forma de que este sprite sea aleatorio en cada miembro
        console.log(this.enemies)
        let enemyIndex = 0;
        this.enemies.forEach(enemy =>{
            
            this.physics.add.collider(enemy, this.collidables)

            enemy.id = enemyIndex;
            console.log(enemy.id);
            if (defeatedEnemiesIds.includes(enemy.id)) this.enemies[enemyIndex].destroy();
                
            enemyIndex++;
        })

        console.log(this.enemies);
        /*if(!sceneAdded)
        {
            this.scene.add('combat', CombatScene)
            this.scene.add('WinScene', WinScene);
            sceneAdded = true;
        }*/
        this.cameras.main.startFollow(this.player, true, 0.05, 0.05);


        mainMenuButton = new CustomButton(this, 50, 25, 'button', 'Return', 
            () =>{
                this.scene.start("main_menu");
            }
        );
        mainMenuButton.setButtonScale(0.25,0.25);
        mainMenuButton.setTextPosition(-20,-7);
        mainMenuButton.setScrollFactor(0);
        mainMenuButton.text.setScrollFactor(0);
        console.log(this.player.team)

        
    }

    update()
    {
        //this.player.preUpdate()

        this.enemies.forEach(enemy => {
            if(!defeatedEnemiesIds.includes(enemy.id) && Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), enemy.getBounds()))
            {
                console.log(this.player.team);
                console.log(enemy.team)
                this.scene.start('cards', {team1: this.player.team, team2: enemy.team, 
                    lastPlayerPosition: {x: this.player.x, y: this.player.y}, enemyId: enemy.id, NPCFound: NPCFound, NPCTalked: NPCTalked});
            }
        });

    }

}