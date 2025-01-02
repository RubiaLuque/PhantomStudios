import { EnemyPresets } from "../CombatSystem/Data/EnemyPresets.js";
import Entity from "../CombatSystem/Entity.js";
import { EntityData } from "../CombatSystem/Data/EntityData.js";
import Team from "../CombatSystem/Team.js";

export default class Jaime extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y) {
        
        super(scene, x, y, 'Jaime')
        this.enemyPreset = EnemyPresets.bosses[0];
        
                scene.add.existing(this);
                scene.physics.add.existing(this);

        this.team = []; 
        this.team.push(Entity.TranslateEntity(EntityData.enemies[this.enemyPreset], scene));
        this.teamClass = new Team(this.team, "Boss")
                
        this.scale = 0.15;
        this.setOrigin(0.5, 1);
        this.id = 0;
    }
}