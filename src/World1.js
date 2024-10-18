let team1, team2;

export default class World1 extends Phaser.Scene
{
    constructor(){
        super({key: "World1"});
    }

    init()
    {
    }

    preload()
    {

    }

    create()
    {
        this.scene.start('combat', {team1, team2});
    }

    update()
    {

    }
}