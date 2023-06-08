import Phaser  from 'phaser'

import Game from './Game'
import Preloader from './Preloader'

const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	parent: 'app',
	width: 1255,
	height: 866,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 200 },
		},
	},
	scene: [Preloader, Game],
}

export default new Phaser.Game(config)
