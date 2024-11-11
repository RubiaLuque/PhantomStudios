import CustomButton from "../UI/CustomButton.js";
import FloatingText from "../CombatSystem/FloatingText.js";
import MusicAnalyser from "../SoundSystem/MusicAnalyser.js";
import Team from "../CombatSystem/Team.js";
import DialogueInterpreter from "../DialogueInterpreter.js";
import LifeBar from "../CombatSystem/LifeBar.js";
import World1 from "./World1.js";
import WinScene from "./WinScene.js";

const songs = ['Reach_Out', 'School_Days', 'Going_Down', 'CYN', 'Break_Out'];

const Type = {
    horny : {name:'horny', str: 'depression'},
    anxiety: {name:'anxiety', str: 'horny'},
    wrath: {name:'wrath', str: 'anxiety'},
    depression: {name:'depression', str: 'wrath'},
    physical: {name:'physical', str: 'depression'}
}

let AttackButton, MagicButton, resultText, damageText;
let nuclearBombButton;
let selectedCharacter;

let XcamVel = 0.05;
let YcamVel = 0.1;

let currentCharacter = 0;

let team1, team2;
let arrow;
let onEndTurn, onPhaseChange;
let turnText;
let lastPlayerPosition, currentEnemyId;
let phase, center;
let currentTeam;

const freqPositions = [50, 60, 70, 80];

/*Escena de Phaser*/
export default class CombatScene extends Phaser.Scene {
    constructor(){
        super({key: 'combat'});
        //this.analyser = new MusicAnalyser(songs);
    }

    init(teams){
        //Inicializacion de los equipos, Team 1 es el jugador y Team 2 es el enemigo
        team1 = new Team(teams.team1)
        team2 = new Team(teams.team2)

        //Guardamos la posicion del jugador y el id del enemigo para la siguiente escena
        lastPlayerPosition = teams.lastPlayerPosition;
        currentEnemyId = teams.enemyId;

        this.WIDTH = this.game.config.width;
        this.HEIGHT = this.game.config.height;

        currentCharacter = 0;
    }

    preload(){
        team1.Preload(this);
        team2.Preload(this);

        this.load.image("Button", "assets/images/Button.png");
        this.load.image("Arrow", "assets/images/Arrow.png");

        this.load.audio('Reach_Out', [ 'assets/music/Reach_Out.mp3' ]);
        this.load.audio('oioioi', [ 'assets/music/oioioi.wav' ]);
    }

    create(){
        self = this;

        //Objeto centro para tener facilidad de centrar la camara
        center = new Phaser.GameObjects.Image(this, this.WIDTH/2, this.HEIGHT/2, '');
        this.add.existing(center);
        center.visible = false;

        //Creacion de los personajes para que se vean en escena
        team1.Create(this, 250, 100, this);
        team2.Create(this, 700, 100, this);

        //Creacion del texto que indica de quien es el turno
        turnText = this.add.text(400, 500, 'Your turn', { fontSize: '50px', fill: '#FFF'});
        this.add.existing(turnText);

        //Creacion de los botones para seleccionar ataque o magia. Tambien el nuclear pero ese es para debug
        AttackButton = new CustomButton(this, 400, 400, "Button", "Attack", 
            function(){
                selectedCharacter.selectedAttack = selectedCharacter.Attack;
                team2.entities.forEach(element => {element.sprite.setInteractive()})
                onPhaseChange.emit('combat');
            }
        );
        AttackButton.setButtonScale(0.5, 0.25);

        MagicButton = new CustomButton(this, 400, 500, "Button", "Magic",
            function(){
                selectedCharacter.selectedAttack = selectedCharacter.MagicAttack;
                team2.entities.forEach(element => {element.sprite.setInteractive()})
                onPhaseChange.emit('combat');
            }
        );
        MagicButton.setButtonScale(0.5, 0.25);

        nuclearBombButton = new CustomButton(this, 600, 550, "Button", "Nuclear Bomb",
            function(){
                team2.entities.forEach(element => {element.GetDamage(1000, Type.physical)});
            }
        );
        nuclearBombButton.setButtonScale(0.5, 0.25);

        //Hacemos que los enemigos se puedan seleccionar y que el ataque seleccionado se ejecute al hacer click
        team2.entities.forEach(element => {
            element.sprite.on('pointerdown', function(){
                if(element.alive)
                {
                    AttackButton.setActive(false)
                    MagicButton.setActive(false)
                    selectedCharacter.selectedAttack(element, function(){onPhaseChange.emit('next')});
                    team2.entities.forEach(element => {element.sprite.disableInteractive()});

                    element.sprite.emit('pointerup');
                    element.sprite.emit('pointerout');
                }
            });

            element.sprite.on('pointerover', function(){
                        arrow.x = element.sprite.x
                        arrow.y = element.sprite.y - 70
            });
        });

        //Asignacion de eventos comunes en todos los personajes
        [team1, team2].forEach(team => {
            //Asignamos un evento cuando los personajes reciben daño para que se ejecute la funcion onDamage
            team.entities.forEach(entity => {
                    entity.on.on('GetDamage', function(damage){
                        self.onDamage(entity.sprite, damage);
                    });

                    //Evento para cuando se selecciona un personaje ya se del equipo 1 o 2
                    //Si es del equipo 1 los botones de ataque y magia se ponen al lado del personaje
                    entity.on.on('select', function(){
                        if(team == team1) self.SetButtonNextToCharacter(selectedCharacter);
                        arrow.x = entity.sprite.x
                        arrow.y = entity.sprite.y - 70
                    });

                    //Creamos la barra de vida para cada personaje
                    //Bounds indica el tamaño del sprite para que la barra de vida se ponga arriba del sprite
                    //Si el personaje es del equipo 2 la barra de vida se pone a la izquierda del personaje en vez de arriba
                    let bounds = entity.sprite.getBounds();
                    if(team == team2) new LifeBar(self, entity.sprite.x, entity.sprite.y - bounds.height/2, 'Button', entity);
                    else new LifeBar(self, entity.sprite.x - 100, entity.sprite.y, 'Button', entity, true);
            });
        });

        //Creacion de la flecha que indica el personaje seleccionado (tambien se puede usar para indicar el objetivo)
        arrow = this.add.sprite(0, 0, 'Arrow')
        arrow.scale = 0.2
        this.add.existing(arrow)

        //Eventos para el cambio de fase y final de turno
        onEndTurn = new Phaser.Events.EventEmitter();
        onPhaseChange = new Phaser.Events.EventEmitter();

        //Evento que se emite cuando se selecciona el ataque o la magia
        onPhaseChange.on('combat', function(){
            team2.entities.forEach(element => { element.sprite.setInteractive(); });
            phase = 'combat';
        });

        //Evento que se emite en cuanto se ataca a un enemigo despues de seleccionar el ataque o la magia
        //Cambiamos de personaje y si ya no hay mas personajes cambiamos de turno
        onPhaseChange.on('next', function(){
                currentCharacter++;
                selectedCharacter = team1.GetCharacter(currentCharacter);

                if(currentCharacter >= team1.GetCharacterCount())
                {
                    onEndTurn.emit('endTurn');
                    currentCharacter = -1;
                }
                else
                {
                    AttackButton.setActive(true)
                    MagicButton.setActive(true)
                    selectedCharacter.on.emit('select');
                }
        });

        //Se emite cuando el turno del jugador termina
        onEndTurn.on('endTurn', function(){
            let i = 0;
            turnText.setText('Enemy turn');
            arrow.tint = 0xFF0000;
            turnText.tint = 0xFF0000;
            arrow.visible = false;
            currentTeam = team2;

            //Los delayed call son como lo time.addEvent
            //Los usamos en este caso para retrasar la funcion que se va a ejecutar, de esa forma conseguimos
            //que el combate se vea claro y no se ejecute todo de golpe
            self.time.delayedCall(1000, function(){
                self.cameras.main.startFollow(arrow, true, 0.025, 0.025, 0, 0);} 
            );

            self.time.addEvent({ delay : 1000, 
            callback: function(){
                arrow.visible = true;
                if(i < team2.GetCharacterCount())
                {
                    let current = team2.GetCharacter(i);
                    current.on.emit('select');

                    self.time.addEvent({ delay : 500,
                        callback: function(){
                            let target = team1.GetRandomCharacter();
                            current.Attack(target, function(){onPhaseChange.emit('wait')});
                            arrow.x = target.sprite.x
                            arrow.y = target.sprite.y - 70
                        }, loop: false });

                    i++;
                }
                else
                {
                    turnText.tint = 0xFFFFFF;
                    arrow.tint = 0xFFFFFF;
                    turnText.setText('Your turn');
                    onPhaseChange.emit('next');
                    currentTeam = team1;
                    self.time.removeEvent(this);
                    self.cameras.main.startFollow(center, true, 0.005, 0.005, 0, 0);
                }
            }, 
            loop: true });
        });

        //Evento que se emite cuando el equipo se queda sin personajes con vida
        //Las comprobaciones de esto tienen lugar en la clase Team que sabe cuando una entidad del equipo muere
        team1.onTeam.on('death', function(){
            console.log('You lose');
            resultText = self.add.text(400, 300, 'You lose', { fontSize: '64px', fill: '#FFF'});
        });

        team2.onTeam.on('death', function(){
            console.log('You win');
            resultText = self.add.text(400, 300, 'You win', { fontSize: '64px', fill: '#FFF'});

            //Tras ganar retrasamos un poco la carga de la pantalla de victoria
            self.time.addEvent({ delay : 1000, 
                callback: function(){
                //self.unLoad();
                self.scene.start('WinScene',
                {pos: lastPlayerPosition, id: currentEnemyId});}, 
                loop: false });
        });

        //Establevemos valores iniciales para el combate
        //Empieza el equipo 1 y el personaje seleccionado es el primero
        currentTeam = team1;
        selectedCharacter = team1.GetCharacter(0);
        arrow.x = selectedCharacter.sprite.x
        arrow.y = selectedCharacter.sprite.y - 70
        this.SetButtonNextToCharacter(selectedCharacter);

        //Creacion del texto de daño
        damageText = new FloatingText(this, 0, 0, '0', { fontSize: '64px', fill: '#F00'});

        //Creacion del interprete de dialogos, para que se pueda usar si es necesario
        let dialogueBackground = this.add.rectangle(400, 500, 800, 200, 0x000000);
        dialogueBackground.alpha = 0.5;
        let dialogueText = this.add.text(400, 500, '', { fontSize: '32px', fill: '#FFF'});
        this.interpreter = new DialogueInterpreter(dialogueText, dialogueBackground, this);

        //Incializamos la musica
        //this.analyser.SetRandomSong();
        //this.analyser.Restart();
    }

    update()
    {
        //Obtenemos los valores de las frecuencias de la musica y las guardamos en un array
        //let dataArray = this.analyser.GetDataArray();

        //Cambiamos el tamaño de los personajes segun las frecuencias de la musica
        /*let i = 0;
        currentTeam.entities.forEach(element => {
            let value = dataArray[freqPositions[i]] * dataArray[freqPositions[i]] / 300000;
            element.sprite.setScale(0.30 - value, 0.15 + value);
            i++;
        });*/

        //Le damos un ligero movimiento a la camara para mas dinamismo
        let range = 5
        
        if(this.cameras.main.x > range-0.025 || this.cameras.main.x < -range+0.025) XcamVel *= -1
        this.cameras.main.x += XcamVel

        if(this.cameras.main.y > range-0.025 || this.cameras.main.y < -range+0.025) YcamVel *= -1
        this.cameras.main.y += YcamVel

        //El texto de turno se mueve con la camara
        turnText.x = this.cameras.main.scrollX + 450
        turnText.y = this.cameras.main.scrollY + 400

        //Actualizamos el texto de daño
        damageText.update()
    }

    //Recibe la posición en la que el texto de daño se va a mostrar y el daño que se va a mostrar
    onDamage(position, damage)
    {
        damageText.x = position.x
        damageText.y = position.y
        damageText.setText(Math.floor(damage))
        damageText.alpha = 1
    }

    //Funcion para hacer un lerp
    lerp(a, b, t)
    {
        return a + (b - a) * t
    }

    //Funcion para poner los botones de ataque y magia al lado del personaje seleccionado
    SetButtonNextToCharacter(character)
    {
        AttackButton.setButtonPosition(character.sprite.x + 120, character.sprite.y - 20);
        AttackButton.setButtonRotation(-0.1);
        MagicButton.setButtonPosition(character.sprite.x + 120, character.sprite.y + 30);
        MagicButton.setButtonRotation(0.1);
    }

    //Funcion que se ejecuta al salir de la escena
    //unLoad(){this.analyser.Stop();}
}