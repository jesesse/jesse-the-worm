import Phaser from 'phaser'

export default class Preloader extends Phaser.Scene {
  constructor() {
    super('pre-loader')
  }

  preload() {
    this.load.atlas('player-left', 'assets/images/characters/player-move-left.png', 'assets/images/characters/player-move-left.json')

    this.load.atlas('player-right', 'assets/images/characters/player-move-right.png', 'assets/images/characters/player-move-right.json')
  }

  create() {
  
    this.anims.create({
      key: 'player-move-left', // name of this animation
      // helper to generate frames
      frames: this.anims.generateFrameNames('player-left', {
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
      key: 'player-move-right', // name of this animation
      // helper to generate frames
      frames: this.anims.generateFrameNames('player-right', {
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