import Phaser from 'phaser'

export default class Game extends Phaser.Scene {
	player!: any
	cursors!: Phaser.Types.Input.Keyboard.CursorKeys

	constructor() {
		super('game')
	}

	create() {
		this.physics.world.setBounds(0, 0, this.scale.width, this.scale.height)
		this.physics.world.setBoundsCollision()
		this.cursors = this.input.keyboard.createCursorKeys();
		this.player = this.physics.add.sprite(this.scale.width / 2, this.scale.height / 2, 'player-left', 'jess-worm-move01.png').setScale(0.5, 0.5);
		this.player.body.setCollideWorldBounds(true)

		
	}

	update(time: number, delta: number): void {
		
		if (this.cursors.left.isDown) {
			this.player.anims.play('player-move-left', true)
			this.player.body.setVelocityX(-200)
		} else if (this.cursors.right.isDown) {
			this.player.anims.play('player-move-right', true)
			this.player.body.setVelocityX(200)
		} else {
			this.player.anims.stop();
			this.player.setVelocityX(0)
		}


	}
}