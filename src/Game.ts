import Phaser from 'phaser'
import { TextureKeys } from './TextureKeys'

export default class Game extends Phaser.Scene {

	player!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody
	background!: Phaser.GameObjects.Image
	platforms!: Phaser.Physics.Arcade.StaticGroup
	foods!: Phaser.Physics.Arcade.Group
	score!: number
	text!: Phaser.GameObjects.Text
	cursors!: Phaser.Types.Input.Keyboard.CursorKeys

	constructor() {
		super('game')
	}

	private createPlatforms() {
		const platforms = this.physics.add.staticGroup();
		for (let i = 0; i < 4; i++) {
			const platformWidth = Phaser.Math.Between(200, 500)
			const posX = Phaser.Math.Between(0, this.scale.width - platformWidth)
			const platform = platforms.create(posX, ((i * 175) + 120), TextureKeys.Platform, undefined, true, true).setOrigin(0, 0);
			platform.setScale(1, 0.8)
			platform.displayWidth = platformWidth;
			platform.body.updateFromGameObject();
		}
		return platforms;
	}

	private createPlayer(){
		const player = this.physics.add.sprite(this.scale.width / 2, this.scale.height - 70, TextureKeys.PlayerMoveLeft, 'jess-worm-move01.png').setScale(0.5, 0.5);
		player.setBounce(0.2)
		player.body.setCollideWorldBounds(true)
		player.body.checkCollision.up = false
		player.body.checkCollision.left = false
		player.body.checkCollision.right = false
		return player;
	}

	private createFoods(){
		const foods = this.physics.add.group({
			key: TextureKeys.Apple,
			repeat: 5,
			setXY:{x: 100, y: 0, stepX: 200},
			setScale: {x:0.5, y:	0.5},
		})
		foods.children.iterate((child) => {
			const body = child.body as Phaser.Physics.Arcade.Body
			body.setBounceY(0.3)
			body.setCollideWorldBounds(true);
		})

		return foods;
	}

	private handleEatFood(obj1:any,  obj2:any){	
		this.foods.killAndHide(obj2)
		obj2.disableBody(true,true)
		this.score += 10;
		this.text.setText(`Score: ${this.score}`)
	}

	create() {
		const { width, height } = this.scale

		this.add.image(width / 2, height / 2, TextureKeys.Background)
		
		this.platforms = this.createPlatforms();
		this.foods = this.createFoods();
		this.player = this.createPlayer();

		this.physics.world.setBounds(0, 0, this.scale.width, this.scale.height - 70)
		this.physics.world.setBoundsCollision(true, true, false, true)
		this.physics.world.addCollider(this.player, this.platforms)
		this.physics.world.addCollider(this.foods, this.platforms)
		this.physics.world.addOverlap(this.player, this.foods, this.handleEatFood, undefined, this)

		this.score = 0;
		this.text = this.add.text(width/2, 20, `Score: 0`, {
			fontSize: '24px'
		}).setOrigin(0.5,0)
		

		this.cursors = this.input.keyboard.createCursorKeys();
	}

	update(time: number, delta: number): void {
		const body = this.player.body as Phaser.Physics.Arcade.Body

		if (this.cursors.left.isDown) {
			this.player.anims.play(TextureKeys.PlayerMoveLeft, true)
			body.setVelocityX(-200)
		} else if (this.cursors.right.isDown) {
			this.player.anims.play(TextureKeys.PlayerMoveRight, true)
			body.setVelocityX(200)
		} else {
			this.player.anims.stop();
			this.player.setVelocityX(0)
		}

		if (this.cursors.up.isDown && body.blocked.down) {
			this.player.anims.play(TextureKeys.PlayerMoveRight, true)
			body.setVelocityY(-280)
		}

	}
}