import { EnemyPresets } from "../CombatSystem/Data/EnemyPresets.js";
import Entity from "../CombatSystem/Entity.js";
import { EntityData } from "../CombatSystem/Data/EntityData.js";
import Team from "../CombatSystem/Team.js";

export default class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {

        super(scene, x, y, 'Semicorchea')
        this.enemyPreset = EnemyPresets.presets[Math.floor(Math.random() * EnemyPresets.presets.length)];
        
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.team = []; 
        this.enemyPreset.forEach(enemy => {
            this.team.push(Entity.TranslateEntity(EntityData.enemies[enemy], scene)); //Puede estar mal (scene)
        })
        
        this.scale = 0.1;
        this.setOrigin(0.5, 1);
        this.id = 0;
        this.teamClass = new Team(this.team, "Enemies")
    }
}