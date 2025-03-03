import { Scene } from "phaser";
import { Player } from "../objects/Player";
import { PLAYER, LEVEL } from "../config/constants";
import { Projectile } from "../objects/Projectile";
import { HUD } from "../objects/HUD";
import { Level } from "../objects/Level";

export class Game extends Scene {
  camera: Phaser.Cameras.Scene2D.Camera;
  background: Phaser.GameObjects.Image;
  msg_text: Phaser.GameObjects.Text;
  private player!: Player;
  private level!: Level;
  private hud!: HUD;
  private debugText!: Phaser.GameObjects.Text;

  constructor() {
    super("Game");
  }

  create() {
    this.camera = this.cameras.main;
    this.camera.setBackgroundColor(0xcccccc);

    // Setup world bounds based on level size
    this.physics.world.setBounds(0, 0, LEVEL.WIDTH, LEVEL.HEIGHT);

    // Create a background that fits the level
    this.background = this.add.image(
      LEVEL.WIDTH / 2,
      LEVEL.HEIGHT / 2,
      "background"
    );
    this.background.setDisplaySize(LEVEL.WIDTH, LEVEL.HEIGHT);
    this.background.setAlpha(0.5);

    this.msg_text = this.add.text(
      LEVEL.WIDTH / 2,
      LEVEL.HEIGHT / 2,
      "This is Raze.",
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

    // Handle keyboard events for various game actions
    if (this.input.keyboard) {
      this.input.keyboard.on("keydown-ESC", () => {
        this.scene.start("MainMenu");
      });
    }

    // Create level
    this.level = new Level(this);

    // Create player at the spawn point
    const playerSpawn = this.level.getPlayerSpawnPoint();
    this.player = new Player(this, playerSpawn.x, playerSpawn.y);

    // Add collisions between player and level elements
    this.physics.add.collider(this.player, this.level.getPlatforms());
    this.physics.add.collider(this.player, this.level.getBoundaries());

    // Add collision between projectiles and level elements
    this.physics.add.collider(
      this.player.getProjectiles(),
      this.level.getPlatforms(),
      (obj1, obj2) => {
        // Handle projectile collision
        if (obj1 instanceof Phaser.Physics.Arcade.Sprite) {
          // Cast to Projectile to access deactivate method
          const projectile = obj1 as Projectile;
          if (typeof projectile.deactivate === "function") {
            projectile.deactivate();
          } else {
            // Fallback if for some reason we can't access the deactivate method
            obj1.setActive(false);
            obj1.setVisible(false);
            obj1.body?.reset(0, 0);
          }
        }
      },
      undefined,
      this
    );

    // Set up camera to follow player and respect level bounds
    this.cameras.main.startFollow(this.player, true);
    this.cameras.main.setBounds(0, 0, LEVEL.WIDTH, LEVEL.HEIGHT);
    this.cameras.main.setZoom(1);

    // Show game instructions
    this.createInstructionText();

    // Create HUD
    this.hud = new HUD(this, this.player);

    // Add debug mode indicator
    this.createDebugIndicator();
  }

  private createInstructionText(): void {
    const instructions = [
      "WASD: Move",
      "Mouse: Aim",
      "Click: Shoot",
      "R: Reload",
      "ESC: Menu",
    ];

    const textStyle = {
      fontFamily: "Arial",
      fontSize: 16,
      color: "#ffffff",
      stroke: "#000000",
      strokeThickness: 2,
    };

    // Position in top-left corner, relative to camera
    const instructionsText = this.add.text(
      20,
      20,
      instructions.join("\n"),
      textStyle
    );

    // Make the text stay fixed to the camera
    instructionsText.setScrollFactor(0);
  }

  private createDebugIndicator(): void {
    // Add debug mode indicator text
    this.debugText = this.add.text(
      this.cameras.main.width - 120,
      20,
      this.physics.world.drawDebug ? "DEBUG: ON" : "DEBUG: OFF",
      {
        fontFamily: "Arial",
        fontSize: 16,
        backgroundColor: "#00000088",
        padding: { x: 8, y: 4 },
        color: this.physics.world.drawDebug ? "#00ff00" : "#ff0000",
      }
    );

    // Fix to camera
    this.debugText.setScrollFactor(0);

    // Add info about how to toggle debug mode
    const debugHelpText = this.add.text(
      this.cameras.main.width - 120,
      50,
      "Press Ctrl+D to toggle",
      {
        fontFamily: "Arial",
        fontSize: 12,
        backgroundColor: "#00000088",
        padding: { x: 8, y: 4 },
        color: "#ffffff",
      }
    );

    // Fix to camera
    debugHelpText.setScrollFactor(0);
  }

  update() {
    // Update player
    this.player.update();

    // Update level
    this.level.update();

    // Update HUD
    if (this.hud) {
      this.hud.update();
    }

    // Update debug indicator
    if (this.debugText) {
      this.debugText.setText(
        this.physics.world.drawDebug ? "DEBUG: ON" : "DEBUG: OFF"
      );
      this.debugText.setColor(
        this.physics.world.drawDebug ? "#00ff00" : "#ff0000"
      );
    }
  }
}
