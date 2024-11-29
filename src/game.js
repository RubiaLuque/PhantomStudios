import CombatScene from "./Scenes/CombatScene.js";
import MainMenu from "./Scenes/MainMenu.js";
import World1 from "./Scenes/World1.js";
import WinScene from "./Scenes/WinScene.js";
import CafeteriaScene from "./Scenes/CafeteriaScene.js";
/**
 * Inicio del juego en Phaser. Creamos el archivo de configuración del juego y creamos
 * la clase Game de Phaser, encargada de crear e iniciar el juego.
 */
let config = {
	type: Phaser.AUTO,
	width:  800,
	height: 600,
	pixelArt: true,
    parent: "Juego",
	scale: {
		autoCenter: Phaser.Scale.CENTER_HORIZONTALLY
	},
	scene: [MainMenu, World1, CafeteriaScene, CombatScene, WinScene],	// Decimos a Phaser cual es nuestra escena
	physics: { 
		default: 'arcade', 
		arcade: { 
			gravity: { y: 1500 }, 
			debug: true
		},
		checkCollision: {
			up: true,
			down: true,
			left: true,
			right: true
		}
	},
	backgroundColor: '#202020'
};

new Phaser.Game(config);