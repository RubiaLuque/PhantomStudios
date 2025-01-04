//Debe tener:
// - Efecto
// - imagen
// - tipo de carta
// - animacion de entrada


export default class TarotCard extends Phaser.GameObjects.Sprite{

    constructor(scene, x, y, back, texture, funct, info) {
        super(scene, x, y, back);
        this.card = texture;
        this.funct = funct;
        scene.add.existing(this);

        this.infoSquare = new Phaser.GameObjects.Rectangle(scene, x, y, 290, 500, 0x000000);
        this.infoSquare.visible = false;
        scene.add.existing(this.infoSquare);

        this.info = scene.add.text(x - 100, y - 200, info, {fontSize: '15px', color: '#fff'});
        this.info.visible = false;
        this.infoVisible = false;
        
        this.on('pointerdown', ()=>{
            console.log('entra')
            if(!this.infoVisible){
                this.infoSquare.visible = true;
                this.info.visible = true;
                this.infoVisible = true;
            }
            else{
                this.infoSquare.visible = false;
                this.info.visible = false;
                this.infoVisible = false;
            }
        });
        
        this.setInteractive();
    }

    DoAction(team1, team2) {
        this.funct(team1, team2);
    }

    SetCardPosition(x, y) {
        this.x = x;
        this.y = y;
    }

    SetCardScale(w, h) {
        this.setScale(w, h);
    }
}
