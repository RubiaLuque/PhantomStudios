import CombatScene from "./Scenes/CombatScene.js";
import MainMenu from "./Scenes/MainMenu.js";
import World1 from "./Scenes/World1.js";
/**
 * Inicio del juego en Phaser. Creamos el archivo de configuración del juego y creamos
 * la clase Game de Phaser, encargada de crear e iniciar el juego.
 */
let config = {
	type: Phaser.AUTO,
	width:  800,
	height: 600,
	pixelArt: true,
    parent: "Persona6",
	scale: {
		autoCenter: Phaser.Scale.CENTER_HORIZONTALLY
	},
	scene: [MainMenu, World1, CombatScene],	// Decimos a Phaser cual es nuestra escena
	physics: { 
		default: 'arcade', 
		arcade: { 
			gravity: { y: 100 }, 
			debug: true
		}
	},
	backgroundColor: '#447'
};

new Phaser.Game(config);