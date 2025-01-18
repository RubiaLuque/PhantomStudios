export default class LoadScene extends Phaser.Scene {
    constructor(){
        super({key:"LoadScene"})
    }

    init(){
        this.add.text(180, 250, 'Loading...', {fontSize: 80});
    }
    
    preload(){
        // carga de recursos

        //World1
        this.load.image("Main_Team", "assets/images/Main_Team.png");
        this.load.image("JaviN", "assets/images/Javi.png");
        this.load.image("MikaN", "assets/images/Mika.png");
        this.load.image("FueyoN", "assets/images/Fueyo.png");
        this.load.image("MuxuN", "assets/images/Muxu.png");
        this.load.spritesheet("Javi", "assets/images/Javi_sheet.png", {frameWidth: 1242, frameHeight: 1536});
        this.load.spritesheet("Fueyo", "assets/images/Fueyo_sheet.png", {frameWidth: 1030, frameHeight: 1536});
        this.load.spritesheet("Mika", "assets/images/Mika_sheet.png", {frameWidth: 1242, frameHeight: 1536});
        this.load.spritesheet("Muxu", "assets/images/Muxu_sheet.png", {frameWidth: 1499, frameHeight: 1536});
        this.load.spritesheet("Toni", "assets/images/NPC.png", {frameWidth: 286, frameHeight: 275});
        this.load.spritesheet("Narrador", "assets/images/NPC.png", {frameWidth: 286, frameHeight: 275});
        this.load.spritesheet('Jaime', "assets/images/Jaime.png", {frameWidth: 1000, frameHeight: 1053})
        this.load.image("Cafeteria", "assets/images/Cafeteria.png");
        this.load.image("NPC", "assets/images/NPC.png");
        this.load.image("Fork", "assets/images/Fork.png");
        this.load.image("Demon", "assets/images/Demon.png");
        this.load.image("Uroboros", "assets/images/Uroboros.png");
        this.load.image("Skibidi", "assets/images/Skibidi.png");
        this.load.image('TestTileset', 'assets/images/SpritesPrueba.png');
        this.load.image("Tiles", "assets/tilemaps/inca_back.png")
        this.load.tilemapTiledJSON("World1", "assets/tilemaps/mundo1.json")
        this.load.tilemapTiledJSON('TestTileMap', 'assets/tilemaps/Testing.json');
        this.load.image('button', 'assets/images/Button.png'); //Se usa tanto en minúsculas como en mayúsculas, cuidao ahí
        this.load.json("dialogue", "assets/dialogue/dialogue.json")
        //CafeteriaScene
        this.load.image("Door", "assets/images/CafetePuerta.png");
        this.load.image("TileCaf", "assets/tilemaps/tilemap_cafeteria.png")
        this.load.tilemapTiledJSON("Cafeteria", "assets/tilemaps/Cafeteria.json")
        this.load.image("Andres", "assets/images/NPC.png")
        this.load.image("Sanchez", "assets/images/NPC.png")
        //CardsScene
        this.load.image("Back", "assets/images/cards/Back_3.jpg");
        this.load.image("Fool", "assets/images/cards/Fool.jpg");
        this.load.image("Magician", "assets/images/cards/Magician.jpg");
        this.load.image("Empress", "assets/images/cards/Empress.jpg");
        this.load.image("Devil", "assets/images/cards/Devil.jpg");
        this.load.image("Chariot", "assets/images/cards/Chariot.jpg");
        this.load.image("Hanged_Man", "assets/images/cards/Hanged_Man.jpg");
        this.load.image("Hermit", "assets/images/cards/Hermit.jpg");
        this.load.image("Sun", "assets/images/cards/Sun.jpg");
        this.load.image("Temperance", "assets/images/cards/Temperance.jpg");
        this.load.image("Tower", "assets/images/cards/Tower.jpg");
        this.load.image("Lovers", "assets/images/cards/Lovers.jpg");
        this.load.image("Emperor", "assets/images/cards/Emperor.jpg");
        this.load.image("Death", "assets/images/cards/Death.jpg");
        this.load.image("Star", "assets/images/cards/Star.jpg");
        this.load.image("Moon", "assets/images/cards/Moon.jpg");
        this.load.image("Judgement", "assets/images/cards/Judgement.jpg");
        this.load.image("World", "assets/images/cards/World.jpg");
        this.load.image("Justice", "assets/images/cards/Justice.jpg");
        this.load.image("Wheel_of_Fortune", "assets/images/cards/Wheel_of_Fortune.jpg");
        this.load.image("Strength", "assets/images/cards/Strength.jpg");
        this.load.image("Hierophant", "assets/images/cards/Hierophant.jpg");
        this.load.image("High_Priestess", "assets/images/cards/High_Priestess.jpg");
        this.load.json("dialogue", 'assets/dialogue/dialogue.json')
        //CombatScene
        this.load.image("Button", "assets/images/Button.png");
        this.load.image("Arrow", "assets/images/Arrow.png");
        this.load.audio('Reach_Out', [ 'assets/music/Reach_Out.mp3' ]);
        this.load.audio('oioioi', [ 'assets/music/oioioi.wav' ]);
        this.load.spritesheet('background', 'assets/images/background_sheet_48-Frames.png', {frameWidth: 256, frameHeight: 224});
        this.load.spritesheet('speedFX', 'assets/images/kinggod_speed_426_240.png', {frameWidth: 426, frameHeight: 216});
        //WinScene
        this.load.audio('win', ['assets/music/Win_Theme.mp3']);
        //DemoWinScene
        this.load.image('Pascal', 'assets/images/Pascal.png')
        
        //GameOverScene
        this.load.audio('game_over_theme', ['assets/music/Game_Over_theme.mp3']);
        
        // eventos de carga que nos interesan
        this.load.on('progress', function (value) {
            console.log("progressEvent", value);
        });      
        this.load.on('fileprogress', function (file) {
            console.log("fileprogressEvent", file.src);
        });
        this.load.on('complete', function (f) {
            console.log("filecompleteEvent", 'complete');
            this.scene.scene.start("World1", { pos: undefined, dial: true })
        });
    }

    //Socorro Toni, lo he copiado del boot de ejemplo de los slimes y no funciona
    /*
    create(){
        this.add.image(200, 100, 'Main_Team');
        this.text = this.add.text(200, 110, 'Loading');
        this.count = 0;
    }

    update(t, dt){
        this.count += dt;
        if(this.count > 500){
            this.count = 0;
            if(this.text.text === 'Loading...') this.text.text = 'Loading';
            else this.text.setText(this.text.text+".");
        }
    }*/
}