import player from "../Navigation/Player.js";
import Enemy from "../Navigation/Enemy.js";
import Jaime from "../Navigation/Jaime.js"
import Cafeteria from "../Navigation/Cafeteria.js";
import CustomButton from "../UI/CustomButton.js";
import NPC from "../Navigation/NPC.js";
import {analyser} from "../SoundSystem/Index.js";
import DialogueInterpreter from "../DialogueSystem/DialogueInterpreter.js";

let pos = {x: 0, y: 0};
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
        if(result.cafeteriaEnter != undefined) this.cafeteriaEnter = result.cafeteriaEnter
        else this.cafeteriaEnter = false
        if(result.defeatedEnemiesIds != undefined) defeatedEnemiesIds = result.defeatedEnemiesIds
    }

    create()
    {
        this.bossDial = true
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
            this.player.teamClass.entities = team.entities;
        }
        this.player.eKey.on("down", ()=>{
            if(Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), this.cafeteria.getBounds()))
                {
                    this.scene.start('CafeteriaScene', {team: this.player.team, pos: {x: this.player.x, y: this.player.y}, NPCFound: NPCFound, cafeteriaEnter: this.cafeteriaEnter })
                }
                if(Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), this.Toni.getBounds()))
                    {
                        NPCFound.push(this.Toni.name)
                        this.interpreter.SetDialogue(this.data['Toni-1'])
                        this.Toni.destroy()
                    }
                })
                
                if (pos.x != 0 && pos.y != 0) {
                    this.player.x = pos.x
                    this.player.y = pos.y
                }

                this.physics.add.collider(this.player, this.collidables)
                
                this.enemies = this.tileMap.createFromObjects("entidades", {name: 'Enemy', classType: Enemy, key: 'Semicorchea'}); //Buscar forma de que este sprite sea aleatorio en cada miembro
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
               this.cameras.main.startFollow(this.player, true, 0.05, 0.05);


               mainMenuButton = new CustomButton(this, 50, 25, 'button', 'Return', 
                () =>{
                    this.scene.start("main_menu", {dial: false});
                }
            );
            mainMenuButton.setButtonScale(0.25,0.25);
            mainMenuButton.setTextPosition(-20,-7);
            mainMenuButton.setScrollFactor(0);
            mainMenuButton.text.setScrollFactor(0);
            
            this.interpreter = new DialogueInterpreter(this)
            this.data = this.cache.json.get("dialogue");

            if(this.dial)
            {
                // this.interpreter.SetDialogue(this.data['intro-3'])
            }
            else if(defeatedEnemiesIds[defeatedEnemiesIds.length - 1] == this.bossId)
            {
                this.interpreter.SetDialogue(this.data['Jaime-2'], () => {
                    this.scene.start('demoWinScene')
                })
            }
        }
        
        update()
        {
            if(this.player.body.velocity.y > 500) this.player.setVelocityY(500);

            this.enemies.forEach(enemy => {
            if(!defeatedEnemiesIds.includes(enemy.id) && Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), enemy.getBounds()))
            {
                console.log(this.player)
                let ambush = this.player.y < enemy.y;
                analyser.Stop();
                this.scene.start('cards', {team1: this.player.teamClass, team2: enemy.teamClass, 
                    lastPlayerPosition: {x: this.player.x, y: this.player.y}, 
                    enemyId: enemy.id, NPCFound: NPCFound, NPCTalked: NPCTalked, ambush: ambush,
                    bossId: this.bossId, cafeteriaEnter: this.cafeteriaEnter})}

            });
            
        }
        
    }