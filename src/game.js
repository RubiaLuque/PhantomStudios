import CombatScene from "./Scenes/CombatScene.js";
import MainMenu from "./Scenes/MainMenu.js";
import World1 from "./Scenes/World1.js";
import WinScene from "./Scenes/WinScene.js";
import CardsScene from "./Scenes/CardsScene.js";
import CafeteriaScene from "./Scenes/CafeteriaScene.js";
import LevelUpScene from "./Scenes/LevelUpScene.js";
import LoadScene from "./Scenes/LoadScene.js";
/**
 * Inicio del juego en Phaser. Creamos el archivo de configuración del juego y creamos
 * la clase Game de Phaser, encargada de crear e iniciar el juego.
 */
export let config = {
	type: Phaser.AUTO,
	width:  800,
	height: 600,
	pixelArt: true,
    parent: "Juego",
	scale: {
		autoCenter: Phaser.Scale.CENTER_HORIZONTALLY
	},


	scene: [MainMenu, LoadScene, World1, CardsScene, CafeteriaScene, CombatScene, WinScene, LevelUpScene],	// Decimos a Phaser cual es nuestra escena

	physics: { 
		default: 'arcade', 
		arcade: { 
			gravity: { y: 1500 }, 
			debug: false
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