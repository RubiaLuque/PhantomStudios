import { EnemyPresets } from "../CombatSystem/Data/EnemyPresets.js";
import Entity from "../CombatSystem/Entity.js";
import { MainTeam } from "../CombatSystem/Data/MainTeam.js";
import Enemy from "./Enemy.js";
import Team from "../CombatSystem/Team.js";

export default class Jaime extends Enemy {
    constructor(scene, x, y) {
        
        super(scene, x, y, 'Jaime')
        this.enemyPreset = EnemyPresets.bosses[0];

        this.team = []; 
        this.team.push(Entity.TranslateEntity(MainTeam.enemies[this.enemyPreset], scene));
        this.teamClass = new Team(this.team, "Boss")
    }
}