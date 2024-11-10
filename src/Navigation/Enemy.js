import { EnemyPresets } from "../CombatSystem/Data/EnemyPresets.js";
import Entity from "../CombatSystem/Entity.js";
import { MainTeam } from "../CombatSystem/Data/MainTeam.js";

export default class Enemy extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y) {
        this.enemyPreset = EnemyPresets.presets[Math.floor(Math.random() * EnemyPresets.presets.length)];
        
        super(scene, x, y, this.enemyPreset[0])
        
        scene.physics.add.existing(this);
        
        this.enemies = [];

        enemyPreset.forEach(enemy => {
            this.enemies.push(Entity.TranslateEntity(MainTeam.enemies[enemy], scene)); //Puede estar mal (scene)
        })
        
        this.scale = 0.2;
        this.team = enemies;
        this.id = 0;
    }
}