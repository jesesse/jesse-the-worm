import Phaser from 'phaser'
import { TextureKeys } from './TextureKeys'

export default class Preloader extends Phaser.Scene {
  constructor() {
    super('pre-loader')
  }

  preload() {
    this.load.image(TextureKeys.Background, 'assets/images/world/background.png')
    this.load.image(TextureKeys.Platform, 'assets/images/world/platform.png')
    this.load.image(TextureKeys.Apple, 'assets/images/world/food_apple_100.png')

    this.load.atlas(TextureKeys.PlayerMoveLeft, 'assets/images/characters/player-move-left.png', 'assets/images/characters/player-move-left.json')
    this.load.atlas(TextureKeys.PlayerMoveRight, 'assets/images/characters/player-move-right.png', 'assets/images/characters/player-move-right.json')
  }

  create() {
  
    this.anims.create({
      key: TextureKeys.PlayerMoveLeft, // name of this animation
      // helper to generate frames
      frames: this.anims.generateFrameNames(TextureKeys.PlayerMoveLeft, {
        start: 1,
        end: 8,
        prefix: 'jess-worm-move',
        zeroPad: 2,
        suffix: '.png'

      }),
      frameRate: 20,
      repeat: - 1 // -1 to loop forever
    })

    this.anims.create({
      key: TextureKeys.PlayerMoveRight, // name of this animation
      // helper to generate frames
      frames: this.anims.generateFrameNames(TextureKeys.PlayerMoveRight, {
        start: 1,
        end: 8,
        prefix: 'jess-worm-move',
        zeroPad: 2,
        suffix: '.png'

      }),
      frameRate: 20,
      repeat: - 1 // -1 to loop forever
    })

    this.scene.start('game')
  }
}