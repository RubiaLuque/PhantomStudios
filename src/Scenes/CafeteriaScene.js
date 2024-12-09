import Cafeteria from "../Navigation/Cafeteria.js";
import playerCafeteria from "../Navigation/CafeteriaPlayer.js";
import NPC from "../Navigation/NPC.js";
import { NPCEffects } from "../CombatSystem/Data/NPCEffects.js";


let pos = {x: 0, y: 0};
let healths;
let NPCFound = ["Andres", "Sanchez"]
export default class CafeteriaScene extends Phaser.Scene
{
    constructor(){
        super({key: "CafeteriaScene"});
    }

    init(result)
    {
        if(result.pos != undefined) pos = result.pos;
        if(result.id != undefined) defeatedEnemiesIds.push(result.id);
        if(result.healths != undefined) healths = result.healths;
        if(result.NPCFound != undefined) NPCFound = result.NPCFound;
    }

    preload(){
        this.load.image("Main_Team", "assets/images/Main_Team.png");
        this.load.image("Door", "assets/images/CafetePuerta.png");
        this.load.image("NPC", "assets/images/NPC.png");
        this.load.image("Tiles", "assets/tilemaps/tilemap_prueba.png")
        this.load.tilemapTiledJSON("Cafeteria", "assets/tilemaps/Cafeteria.json")
        this.load.image("Andres", "assets/images/NPC.png")
        this.load.image("Sanchez", "assets/images/NPC.png")
        this.load.image("Toni", "assets/images/NPC.png")
        this.load.image("Mozos", "assets/images/NPC.png")
        this.load.image("Poletti", "assets/images/NPC.png")
    }

    create()
    {
        this.tileMap = this.make.tilemap({
            key: "Cafeteria"
        })

        const set = this.tileMap.addTilesetImage('tilemap_prueba', 'Tiles')

        this.floor = this.tileMap.createLayer('Suelo', set)
        this.collidables = this.tileMap.createLayer('Colisionables', set)
        this.collidables.setCollision(3);
        
        
        this.door = this.tileMap.createFromObjects("Entidades", {name: 'Door', classType: Cafeteria, key: 'Door'})[0]

        
        this.NPCs = this.tileMap.createFromObjects("Entidades", {name: 'NPC', classType: NPC})
        
        let i = 0;
        this.NPCs.forEach(NPC =>{
            NPC.name = NPCEffects.NPCs[i].name;
            NPCFound.forEach(A =>{
                if(NPC.name == A){
                    NPC.upgradeStat = NPCEffects.NPCs[i].upgradeStat;
                    NPC.upgradeAmount = NPCEffects.NPCs[i].upgradeAmount;
                    NPC.image = NPCEffects.NPCs[i].image;
                    NPC.upgradeAvailable = true;
                    
                    NPC.sprite = this.add.sprite(NPC.x, NPC.y, NPC.name)
                    NPC.sprite.scale = 0.2;
                }
                else{
                    NPC.destroy();
                }
            })
            
            i++;
        })
        this.player = this.tileMap.createFromObjects("Entidades", {name: 'Player', classType: playerCafeteria, key: 'Main_Team'})[0] //key sirve para indicar que image carga
        
        this.physics.add.collider(this.player, this.collidables)
        this.physics.add.collider(this.player, this.door)
        this.physics.add.collider(this.player, this.NPCs)
        this.cameras.main.startFollow(this.player, true, 0.05, 0.05);
    }

    update()
    {
        if(Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), this.door.getBounds()))
        {
            this.scene.start('World1', {pos: {x: pos.x, y: pos.y}, healths: healths, NPCFound: NPCFound})
        }

        this.NPCs.forEach(A => {
            if(A.upgradeAvailable && Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), A.getBounds()))
            {
                
            }
        });
    }
}