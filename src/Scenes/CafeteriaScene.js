import Cafeteria from "../Navigation/Cafeteria.js";
import playerCafeteria from "../Navigation/CafeteriaPlayer.js";
import NPC from "../Navigation/NPC.js";
import { NPCEffects } from "../CombatSystem/Data/NPCEffects.js";
import CustomButton from "../UI/CustomButton.js";
import DialogueInterpreter from "../DialogueSystem/DialogueInterpreter.js";


let pos = {x: 0, y: 0};
let healths;
let NPCFound = []
let NPCTalked = []
let JaviButton, FueyoButton, MikaButton, MuxuButton;
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
        if(result.NPCTalked != undefined) NPCTalked = result.NPCTalked;
        if (result.cafeteriaEnter != undefined) this.cafeteriaEnter = result.cafeteriaEnter
    }

    preload(){
    }

    create()
    {
        this.tileMap = this.make.tilemap({
            key: "Cafeteria"
        })

        const set = this.tileMap.addTilesetImage('tilemap_cafeteria', 'TileCaf')

        this.floor = this.tileMap.createLayer('Suelo', set)
        this.collidables = this.tileMap.createLayer('Colisionables', set)
        this.collidables.setCollision([37, 38, 39, 40]);
        
        
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
                    NPCTalked.forEach(B =>{
                        if(NPC.name == B)
                        {
                            NPC.upgradeAvailable = false;
                        }
                    })
                    
                    NPC.sprite = this.add.sprite(NPC.x, NPC.y, NPC.image)
                    NPC.sprite.scale = 0.2;
                }
                else{
                    NPC.destroy();
                }
            })
            
            i++;
        })
        this.player = this.tileMap.createFromObjects("Entidades", {name: 'Player', classType: playerCafeteria, key: 'MikaN'})[0] //key sirve para indicar que image carga
        this.player.setSize(800,1400);
        this.player.setOffset(30,40);
        
        let dialogueInterpreter = new DialogueInterpreter(this)
        const data = this.cache.json.get("dialogue");
        
        let self = this;
        this.player.eKey.on("down", ()=>{
            console.log(NPCFound)
            console.log(NPCTalked)
            this.NPCs.forEach(A => {
                if(A.upgradeAvailable && Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), A.getBounds()))
                    {
                        this.player.body.setVelocity(0, 0);
                        this.player.canMove = false;
                    if(A.name == "Andres" || A.name == "Sanchez")
                    {
                        this.player.team.forEach(character =>{
                        character.health = character.maxHealth
                        console.log("Equipo curado, tremendo bocadillo")
                    })
                    }
                    else if (A.name == 'Toni' && !NPCTalked.includes(A.name))
                    {
                        NPCTalked.push(A.name);
                        dialogueInterpreter.SetDialogue(data['Toni-2'], () =>{
                        JaviButton = new CustomButton(this, 0, 600, "Button", "Javi", 
                            function(){
                                console.log(self.player.team[0][A.upgradeStat])
                                console.log(A)
                                self.player.team[0][A.upgradeStat].quantity = (self.player.team[0][A.upgradeStat].quantity + A.upgradeAmount);
                                A.upgradeAvailable = false;
                                NPCTalked.push(A.name)
                                JaviButton.text.destroy()
                                FueyoButton.text.destroy()
                                MikaButton.text.destroy()
                                MuxuButton.text.destroy()
                                FueyoButton.destroy()
                                MikaButton.destroy()
                                MuxuButton.destroy()
                                console.log(self.player.team)
                                JaviButton.destroy()
                            }
                        );
                        FueyoButton = new CustomButton(this, 190, 600, "Button", "Fueyo", 
                            function(){
                                self.player.team[1][A.upgradeStat].quantity = (self.player.team[1][A.upgradeStat].quantity + A.upgradeAmount);
                                A.upgradeAvailable = false;
                                NPCTalked.push(A.name)
                                JaviButton.text.destroy()
                                FueyoButton.text.destroy()
                                MikaButton.text.destroy()
                                MuxuButton.text.destroy()
                                JaviButton.destroy()
                                MikaButton.destroy()
                                MuxuButton.destroy()
                                console.log(self.player.team)
                                FueyoButton.destroy()
                            }
                        );
                        MikaButton = new CustomButton(this, 380, 600, "Button", "Mika", 
                            function(){
                                self.player.team[2][A.upgradeStat].quantity = (self.player.team[2][A.upgradeStat].quantity + A.upgradeAmount);
                                A.upgradeAvailable = false;
                                NPCTalked.push(A.name)
                                JaviButton.text.destroy()
                                FueyoButton.text.destroy()
                                MikaButton.text.destroy()
                                MuxuButton.text.destroy()
                                JaviButton.destroy()
                                FueyoButton.destroy()
                                MuxuButton.destroy()
                                console.log(self.player.team)
                                MikaButton.destroy()
                            }
                        );
                        MuxuButton = new CustomButton(this, 570, 600, "Button", "Muxu", 
                            function(){
                                self.player.team[3][A.upgradeStat].quantity = (self.player.team[3][A.upgradeStat].quantity + A.upgradeAmount);
                                A.upgradeAvailable = false;
                                NPCTalked.push(A.name)
                                JaviButton.text.destroy()
                                FueyoButton.text.destroy()
                                MikaButton.text.destroy()
                                MuxuButton.text.destroy()
                                JaviButton.destroy()
                                FueyoButton.destroy()
                                MikaButton.destroy()
                                console.log(self.player.team)
                                MuxuButton.destroy()
                            }
                        );
                        JaviButton.setButtonScale(0.5, 0.25);
                        FueyoButton.setButtonScale(0.5, 0.25);
                        MikaButton.setButtonScale(0.5, 0.25);
                        MuxuButton.setButtonScale(0.5, 0.25);
                        })
                    }
                }

            });
            this.player.canMove = true;
        })

        this.physics.add.collider(this.player, this.collidables)
        this.physics.add.collider(this.player, this.door)
        this.physics.add.collider(this.player, this.NPCs)
        this.cameras.main.startFollow(this.player, true, 0.05, 0.05);

        if(!this.cafeteriaEnter){
                dialogueInterpreter.SetDialogue(data['Cafeteria']);
                this.cafeteriaEnter = true;
        }
    }

    update()
    {
        if(Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), this.door.getBounds()))
        {
            this.scene.start('World1', {pos: {x: pos.x, y: pos.y}, team: this.player.team, NPCFound: NPCFound, NPCTalked: NPCTalked, cafeteriaEnter: this.cafeteriaEnter})
        }
    }
}