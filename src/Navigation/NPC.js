import { NPCEffects } from "../CombatSystem/Data/NPCEffects.js";

let upgrade;

export default class NPC extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y){
        super(scene, x, y)
        this.scale = 0.2;

        
    }
}