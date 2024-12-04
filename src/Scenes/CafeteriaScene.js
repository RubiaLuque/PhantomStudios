import playerCafeteria from "../Navigation/CafeteriaPlayer.js";


let pos = {x: 0, y: 0};
export default class CafeteriaScene extends Phaser.Scene
{
    constructor(){
        super({key: "CafeteriaScene"});
    }

    init(result)
    {
        //if(result.pos != undefined) pos = result.pos;
        if(result.id != undefined) defeatedEnemiesIds.push(result.id);
    }

    preload(){
        this.load.image("Main_Team", "assets/images/Main_Team.png");
        this.load.image("Tiles", "assets/tilemaps/tilemap_prueba.png")
        this.load.tilemapTiledJSON("Cafeteria", "assets/tilemaps/Cafeteria.json")
    }

    create()
    {
        this.tileMap = this.make.tilemap({
            key: "Cafeteria"
        })

        const set = this.tileMap.addTilesetImage('tilemap_prueba', 'Tiles')

        this.collidables = this.tileMap.createLayer('Colisionables', set)
        this.collidables.setCollision(3);
        
        this.player = this.tileMap.createFromObjects("Entidades", {name: 'Player', classType: playerCafeteria, key: 'Main_Team'})[0] //key sirve para indicar que image carga
        

        if (pos.x != 0 && pos.y != 0) {
            this.player.x = pos.x
            this.player.y = pos.y
        }

        this.physics.add.collider(this.player, this.collidables)
        this.cameras.main.startFollow(this.player, true, 0.05, 0.05);
    }

    update()
    {
        this.player.preUpdate()
    }
}