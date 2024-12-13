import player from "../Navigation/Player.js";
import Enemy from "../Navigation/Enemy.js";
import Jaime from "../Navigation/Jaime.js"
import Cafeteria from "../Navigation/Cafeteria.js";
import CustomButton from "../UI/CustomButton.js";
import NPC from "../Navigation/NPC.js";
import {analyser} from "../SoundSystem/Index.js";
import DialogueInterpreter from "../DialogueSystem/DialogueInterpreter.js";
//import dialogue from '/assets/dialogue/dialogue.json' with {type: 'json'};

const dialogueR = await fetch('/assets/dialogue/dialogue.json')
const dialogue = await dialogueR.json();

let team1, team2;
let pos = {x: 0, y: 0};
let sceneAdded = false;
let healths;
let defeatedEnemiesIds = [];
let mainMenuButton;
let NPCFound = ["Andres", "Sanchez"];
let NPCTalked = [];
let team;

export default class World1 extends Phaser.Scene
{
    constructor(){
        super({key: "World1"});
    }

    init(result)
    {
        if(result.pos != undefined) pos = result.pos;
        if(result.id != undefined) defeatedEnemiesIds.push(result.id);
        if(result.NPCFound != undefined) NPCFound = result.NPCFound;
        if(result.NPCTalked != undefined) NPCTalked = result.NPCTalked;
        if(result.team != undefined) team = result.team;
        if(result.dial != undefined) this.dial = result.dial;
        else this.dial = false;
    }

    preload()
    {
        this.load.image("Main_Team", "assets/images/Main_Team.png");
        this.load.image("JaviN", "assets/images/Javi.png");
        this.load.image("MikaN", "assets/images/Mika.png");
        this.load.image("FueyoN", "assets/images/Fueyo.png");
        this.load.image("MuxuN", "assets/images/Muxu.png");
        this.load.spritesheet("Javi", "assets/images/Javi_sheet.png", {frameWidth: 1242, frameHeight: 1536});
        this.load.spritesheet("Fueyo", "assets/images/Fueyo_sheet.png", {frameWidth: 1030, frameHeight: 1536});
        this.load.spritesheet("Mika", "assets/images/Mika_sheet.png", {frameWidth: 1242, frameHeight: 1536});
        this.load.spritesheet("Muxu", "assets/images/Muxu_sheet.png", {frameWidth: 1499, frameHeight: 1536});
        this.load.spritesheet("Toni", "assets/images/NPC.png", {frameWidth: 286, frameHeight: 275});
        this.load.spritesheet("Narrador", "assets/images/NPC.png", {frameWidth: 286, frameHeight: 275});
        this.load.spritesheet('Jaime', "assets/images/Jaime.png", {frameWidth: 1000, frameHeight: 1053})
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
        this.collidables.setCollision([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35]);
        
        this.cafeteria = this.tileMap.createFromObjects("entidades", {name: 'Cafeteria', classType: Cafeteria, key: 'Cafeteria'})[0];
        
        this.Toni = this.tileMap.createFromObjects("entidades", {name: 'Toni', classType: NPC, key: 'NPC'})[0];
        
        this.player = this.tileMap.createFromObjects("entidades", {name: 'Player', classType: player, key: 'JaviN'})[0] //key sirve para indicar que image carga
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

                this.physics.add.collider(this.player, this.collidables)
                
                this.enemies = this.tileMap.createFromObjects("entidades", {name: 'Enemy', classType: Enemy, key: 'Fork'}); //Buscar forma de que este sprite sea aleatorio en cada miembro
                console.log(this.enemies)
                let enemyIndex = 0;
                this.enemies.forEach(enemy =>{
                    
                    this.physics.add.collider(enemy, this.collidables)
                    
                    enemy.id = enemyIndex;
                    if (defeatedEnemiesIds.includes(enemy.id)) this.enemies[enemyIndex].destroy();
                    
                    enemyIndex++;
                })

                this.boss = this.tileMap.createFromObjects('entidades', {name: 'Jaime', classType: Jaime, key: 'Jaime'})[0]
                
                this.enemies[enemyIndex] = this.boss

                this.physics.add.collider(this.boss, this.collidables)
                this.boss.id = enemyIndex;
                if (defeatedEnemiesIds.includes(this.boss.id)) this.enemies[enemyIndex].destroy();
                enemyIndex++

                this.bossId = this.boss.id
                
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
            
            this.interpreter = new DialogueInterpreter(this)

            if(this.dial)
            {
                this.interpreter.SetDialogue(dialogue['intro-3'])
                console.log("intro-3")
            }
        }
        
        update()
        {
            this.enemies.forEach(enemy => {
                if(!defeatedEnemiesIds.includes(enemy.id) && Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), enemy.getBounds()))
            {
                let ambush = this.player.y < enemy.y;
                this.scene.start('cards', {team1: this.player.teamClass, team2: enemy.teamClass, 
                    lastPlayerPosition: {x: this.player.x, y: this.player.y}, 
                    enemyId: enemy.id, NPCFound: NPCFound, NPCTalked: NPCTalked, ambush: ambush,
                bossId: this.bossId});
                }
            });
            
        }
        
    }