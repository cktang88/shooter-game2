import { Scene } from "phaser";
import { Player } from "../objects/Player";
import { PLAYER } from "../config/constants";
import { Projectile } from "../objects/Projectile";
import { HUD } from "../objects/HUD";

export class Game extends Scene {
  camera: Phaser.Cameras.Scene2D.Camera;
  background: Phaser.GameObjects.Image;
  msg_text: Phaser.GameObjects.Text;
  private player!: Player;
  private platforms!: Phaser.Physics.Arcade.StaticGroup;
  private hud!: HUD;
  private debugText!: Phaser.GameObjects.Text;

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

    // Handle keyboard events for various game actions
    if (this.input.keyboard) {
      this.input.keyboard.on("keydown-ESC", () => {
        this.scene.start("MainMenu");
      });
    }

    // Create platforms
    this.platforms = this.physics.add.staticGroup();

    // Add ground platform
    const ground = this.platforms.create(
      400,
      568,
      "platform"
    ) as Phaser.Physics.Arcade.Sprite;
    ground.setScale(2).refreshBody();

    // Add some additional platforms for testing
    this.platforms.create(600, 400, "platform");
    this.platforms.create(50, 250, "platform");
    this.platforms.create(750, 220, "platform");

    // Create player
    this.player = new Player(this, PLAYER.SPAWN_X, PLAYER.SPAWN_Y);

    // Add collision between player and platforms
    this.physics.add.collider(this.player, this.platforms);

    // Add collision between projectiles and platforms using correct callback signature
    this.physics.add.collider(
      this.player.getProjectiles(),
      this.platforms,
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

    // Set up camera to follow player
    this.cameras.main.startFollow(this.player, true);
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
