import { Scene } from "phaser";
import { Player } from "../objects/Player";
import { PLAYER } from "../config/constants";

export class Game extends Scene {
  camera: Phaser.Cameras.Scene2D.Camera;
  background: Phaser.GameObjects.Image;
  msg_text: Phaser.GameObjects.Text;
  private player!: Player;
  private platforms!: Phaser.Physics.Arcade.StaticGroup;

  constructor() {
    super("Game");
  }

  create() {
    this.camera = this.cameras.main;
    this.camera.setBackgroundColor(0x1e293b);

    this.background = this.add.image(512, 384, "background");
    this.background.setAlpha(0.5);

    this.msg_text = this.add.text(
      512,
      384,
      "Make something fun!\nand share it with us:\nsupport@phaser.io",
      {
        fontFamily: "Arial Black",
        fontSize: 38,
        color: "#ffffff",
        stroke: "#000000",
        strokeThickness: 8,
        align: "center",
      }
    );
    this.msg_text.setOrigin(0.5);

    this.input.once("pointerdown", () => {
      this.scene.start("GameOver");
    });

    // Create platforms
    this.platforms = this.physics.add.staticGroup();

    // Add ground platform
    const ground = this.platforms.create(
      400,
      568,
      "platform"
    ) as Phaser.Physics.Arcade.Sprite;
    ground.setScale(2).refreshBody();

    // Create player
    this.player = new Player(this, PLAYER.SPAWN_X, PLAYER.SPAWN_Y);

    // Add collision between player and platforms
    this.physics.add.collider(this.player, this.platforms);

    // Set up camera to follow player
    this.cameras.main.startFollow(this.player, true);
    this.cameras.main.setZoom(1);
  }

  update() {
    // Update player
    this.player.update();
  }
}
