import { MOVEMENT } from "../config/constants";

export class Player extends Phaser.Physics.Arcade.Sprite {
  private keys: {
    W: Phaser.Input.Keyboard.Key;
    A: Phaser.Input.Keyboard.Key;
    S: Phaser.Input.Keyboard.Key;
    D: Phaser.Input.Keyboard.Key;
  };
  private isJumping: boolean = false;
  private isCrouching: boolean = false;
  private normalHeight: number;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, "player");

    // Add player to the scene and enable physics
    scene.add.existing(this);
    scene.physics.add.existing(this);

    // Store normal height for crouching
    this.normalHeight = this.displayHeight;

    // Set up physics properties
    this.setCollideWorldBounds(true);
    this.setBounce(0);
    this.setGravityY(MOVEMENT.GRAVITY);
    this.setFriction(MOVEMENT.GROUND_FRICTION, 0);
    this.setDragX(MOVEMENT.AIR_RESISTANCE * 1000); // Convert to Phaser units

    // Set up input
    if (scene.input.keyboard) {
      this.keys = {
        W: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
        A: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
        S: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
        D: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
      };
    }
  }

  update() {
    if (!this.keys) return;

    // Handle horizontal movement
    if (this.keys.A.isDown) {
      this.setVelocityX(-MOVEMENT.SPEED);
      this.setFlipX(true);
    } else if (this.keys.D.isDown) {
      this.setVelocityX(MOVEMENT.SPEED);
      this.setFlipX(false);
    } else {
      // Apply friction when not moving
      this.setVelocityX(0);
    }

    // Handle jumping
    if (this.keys.W.isDown && this.body?.touching.down && !this.isJumping) {
      this.setVelocityY(MOVEMENT.JUMP_VELOCITY);
      this.isJumping = true;
    }

    // Handle crouching
    if (this.keys.S.isDown && this.body?.touching.down) {
      if (!this.isCrouching) {
        this.isCrouching = true;
        this.setDisplaySize(this.displayWidth, this.normalHeight * 0.5);
        this.setOffset(0, this.normalHeight * 0.5);
        this.setVelocityX(0); // Stop movement while crouching
      }
    } else if (this.isCrouching) {
      this.isCrouching = false;
      this.setDisplaySize(this.displayWidth, this.normalHeight);
      this.setOffset(0, 0);
    }

    // Reset jump when touching ground
    if (this.body?.touching.down) {
      this.isJumping = false;
    }
  }
}
