import FloatingText from "../CombatSystem/FloatingText.js";
import CustomButton from "../UI/CustomButton.js";
const characters = ['Javi', 'Fueyo', 'Mika', 'Muxu'];
let expText;
let pos, enemyId;
let NPCFound, NPCTalked;
let team;
export default class WinScene extends Phaser.Scene
{
    constructor(){
        super({key: "WinScene"});
    }

    init(result)
    {
        pos = result.pos
        enemyId = result.id;
        team = result.team;
        NPCFound = result.NPCFound;
        NPCTalked = result.NPCTalked;
        this.cafeteriaEnter = result.cafeteriaEnter
    }

    create()
    {
        let self = this;
        this.sound.play('win', {loop: true});

        let win = this.add.text(400, 100, 'You Win!', {fontSize: '64px'});
        win.setOrigin(0.5, 0.5);
        this.add.existing(win);
        expText = new FloatingText(this, 400, 200, '', {fontSize: '64px', fill: 0x00ff00});
        let characterImages = [];

        let i = 0;
        characters.forEach(element => {
            let character = new Phaser.GameObjects.Image(self, 100 + i * 200, 300, element);
            character.scale = 0.2;
            self.add.existing(character);
            characterImages.push(character);

            self.add.text(character.x - 20, character.y + 200, element);
            i++;
        });

        let j = 0;
        this.time.addEvent(
        {
            delay: 1000,
            callback: function()
            {
                let element = characterImages[j];
                expText.setText('Exp: +' + team.entities[j].xpThisTurn);
                team.entities[j].xpThisTurn = 0;
                let bounds = element.getBounds();
                expText.setPosition(bounds.centerX, bounds.centerY);
                j++;
            },
            repeat: 3
        });

        this.time.delayedCall(5000, function(){
            new CustomButton(self, 400, 500, 'Button', 'Exit', function(){
                self.sound.stopAll();
                self.scene.start('LevelUp', {pos: pos, id: enemyId, team: team, NPCFound: NPCFound, NPCTalked: NPCTalked, cafeteriaEnter: self.cafeteriaEnter});
            });
        });
    }

    update()
    {
        expText.update();
    }
}