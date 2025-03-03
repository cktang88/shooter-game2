import { Scene } from "phaser";
import { LEVEL, MOVEMENT, PLAYER } from "../config/constants";

export interface SpawnPoint {
  x: number;
  y: number;
  type: "player" | "enemy";
}

export class Level {
  private scene: Scene;
  private platforms: Phaser.Physics.Arcade.StaticGroup;
  private boundaries: Phaser.Physics.Arcade.StaticGroup;
  private spawnPoints: SpawnPoint[] = [];

  // Define number of tiers
  private readonly NUM_TIERS = 6; // Number of vertical tiers including ground

  constructor(scene: Scene) {
    this.scene = scene;
    this.platforms = scene.physics.add.staticGroup();
    this.boundaries = scene.physics.add.staticGroup();

    this.createLevel();
  }

  private createLevel(): void {
    // Create level boundaries
    this.createBoundary(
      LEVEL.WIDTH / 2,
      0,
      LEVEL.WIDTH,
      LEVEL.BOUNDARY_THICKNESS
    );
    this.createBoundary(
      0,
      LEVEL.HEIGHT / 2,
      LEVEL.BOUNDARY_THICKNESS,
      LEVEL.HEIGHT
    );
    this.createBoundary(
      LEVEL.WIDTH,
      LEVEL.HEIGHT / 2,
      LEVEL.BOUNDARY_THICKNESS,
      LEVEL.HEIGHT
    );
    this.createBoundary(
      LEVEL.WIDTH / 2,
      LEVEL.HEIGHT,
      LEVEL.WIDTH,
      LEVEL.BOUNDARY_THICKNESS
    );

    // Add tier indicators for debugging
    for (let tier = 0; tier < this.NUM_TIERS; tier++) {
      const y = LEVEL.HEIGHT - tier * LEVEL.TIER_HEIGHT;
      const text = this.scene.add.text(30, y - 15, `Tier ${tier}`, {
        fontFamily: "Arial",
        fontSize: "12px",
        color: "#ffffff",
        backgroundColor: "#00000066",
        padding: { x: 4, y: 2 },
      });

      // Draw a dashed line to show the tier level
      const graphics = this.scene.add.graphics();
      graphics.lineStyle(1, 0xffffff, 0.3);
      graphics.lineBetween(60, y, LEVEL.WIDTH - 60, y);
    }

    // Visualize jump arcs from different positions for debugging
    this.visualizeJumpArc(
      100,
      LEVEL.HEIGHT - LEVEL.PLATFORM_THICKNESS / 2 - PLAYER.HEIGHT / 2
    );
    this.visualizeJumpArc(
      LEVEL.WIDTH / 2,
      LEVEL.HEIGHT -
        LEVEL.TIER_HEIGHT -
        LEVEL.PLATFORM_THICKNESS / 2 -
        PLAYER.HEIGHT / 2
    );

    // Create arena-style platforms
    this.createArenaLayout();

    // Create spawn points
    this.addSpawnPoint(
      100,
      LEVEL.HEIGHT - LEVEL.PLATFORM_THICKNESS / 2 - PLAYER.HEIGHT / 2 - 10,
      "player"
    );

    // Add enemy spawn points at different tiers
    this.addSpawnPoint(
      LEVEL.WIDTH - 200,
      LEVEL.HEIGHT - LEVEL.PLATFORM_THICKNESS / 2 - PLAYER.HEIGHT / 2 - 10,
      "enemy"
    );

    this.addSpawnPoint(
      LEVEL.WIDTH / 2,
      LEVEL.HEIGHT -
        LEVEL.TIER_HEIGHT -
        LEVEL.PLATFORM_THICKNESS / 2 -
        PLAYER.HEIGHT / 2 -
        10,
      "enemy"
    );
  }

  private createArenaLayout(): void {
    // Tier 0: Ground level platforms
    // Create main ground with gaps
    this.createPlatform(
      LEVEL.WIDTH * 0.25,
      LEVEL.HEIGHT - LEVEL.PLATFORM_THICKNESS / 2,
      LEVEL.WIDTH * 0.4,
      LEVEL.PLATFORM_THICKNESS
    );

    this.createPlatform(
      LEVEL.WIDTH * 0.75,
      LEVEL.HEIGHT - LEVEL.PLATFORM_THICKNESS / 2,
      LEVEL.WIDTH * 0.4,
      LEVEL.PLATFORM_THICKNESS
    );

    // Tier 1: First level above ground
    this.createPlatform(
      LEVEL.WIDTH * 0.15,
      LEVEL.HEIGHT - LEVEL.TIER_HEIGHT - LEVEL.PLATFORM_THICKNESS / 2,
      LEVEL.MIN_PLATFORM_WIDTH * 1.5,
      LEVEL.PLATFORM_THICKNESS
    );

    this.createPlatform(
      LEVEL.WIDTH * 0.5,
      LEVEL.HEIGHT - LEVEL.TIER_HEIGHT - LEVEL.PLATFORM_THICKNESS / 2,
      LEVEL.MIN_PLATFORM_WIDTH * 2,
      LEVEL.PLATFORM_THICKNESS
    );

    this.createPlatform(
      LEVEL.WIDTH * 0.85,
      LEVEL.HEIGHT - LEVEL.TIER_HEIGHT - LEVEL.PLATFORM_THICKNESS / 2,
      LEVEL.MIN_PLATFORM_WIDTH * 1.5,
      LEVEL.PLATFORM_THICKNESS
    );

    // Tier 2
    this.createPlatform(
      LEVEL.WIDTH * 0.3,
      LEVEL.HEIGHT - LEVEL.TIER_HEIGHT * 2 - LEVEL.PLATFORM_THICKNESS / 2,
      LEVEL.MIN_PLATFORM_WIDTH * 1.8,
      LEVEL.PLATFORM_THICKNESS
    );

    this.createPlatform(
      LEVEL.WIDTH * 0.7,
      LEVEL.HEIGHT - LEVEL.TIER_HEIGHT * 2 - LEVEL.PLATFORM_THICKNESS / 2,
      LEVEL.MIN_PLATFORM_WIDTH * 1.8,
      LEVEL.PLATFORM_THICKNESS
    );

    // Tier 3
    this.createPlatform(
      LEVEL.WIDTH * 0.2,
      LEVEL.HEIGHT - LEVEL.TIER_HEIGHT * 3 - LEVEL.PLATFORM_THICKNESS / 2,
      LEVEL.MIN_PLATFORM_WIDTH * 1.3,
      LEVEL.PLATFORM_THICKNESS
    );

    this.createPlatform(
      LEVEL.WIDTH * 0.5,
      LEVEL.HEIGHT - LEVEL.TIER_HEIGHT * 3 - LEVEL.PLATFORM_THICKNESS / 2,
      LEVEL.MIN_PLATFORM_WIDTH * 2,
      LEVEL.PLATFORM_THICKNESS
    );

    this.createPlatform(
      LEVEL.WIDTH * 0.8,
      LEVEL.HEIGHT - LEVEL.TIER_HEIGHT * 3 - LEVEL.PLATFORM_THICKNESS / 2,
      LEVEL.MIN_PLATFORM_WIDTH * 1.3,
      LEVEL.PLATFORM_THICKNESS
    );

    // Tier 4
    this.createPlatform(
      LEVEL.WIDTH * 0.35,
      LEVEL.HEIGHT - LEVEL.TIER_HEIGHT * 4 - LEVEL.PLATFORM_THICKNESS / 2,
      LEVEL.MIN_PLATFORM_WIDTH * 1.5,
      LEVEL.PLATFORM_THICKNESS
    );

    this.createPlatform(
      LEVEL.WIDTH * 0.65,
      LEVEL.HEIGHT - LEVEL.TIER_HEIGHT * 4 - LEVEL.PLATFORM_THICKNESS / 2,
      LEVEL.MIN_PLATFORM_WIDTH * 1.5,
      LEVEL.PLATFORM_THICKNESS
    );

    // Tier 5 (top level)
    this.createPlatform(
      LEVEL.WIDTH * 0.5,
      LEVEL.HEIGHT - LEVEL.TIER_HEIGHT * 5 - LEVEL.PLATFORM_THICKNESS / 2,
      LEVEL.MIN_PLATFORM_WIDTH * 2,
      LEVEL.PLATFORM_THICKNESS
    );

    // Add some floating platforms for interesting gameplay
    // These platforms are intentionally smaller to increase difficulty

    // Between Tier 0-1
    this.createPlatform(
      LEVEL.WIDTH * 0.35,
      LEVEL.HEIGHT - LEVEL.TIER_HEIGHT * 0.5 - LEVEL.PLATFORM_THICKNESS / 2,
      LEVEL.MIN_PLATFORM_WIDTH * 0.8,
      LEVEL.PLATFORM_THICKNESS
    );

    // Between Tier 1-2
    this.createPlatform(
      LEVEL.WIDTH * 0.65,
      LEVEL.HEIGHT - LEVEL.TIER_HEIGHT * 1.5 - LEVEL.PLATFORM_THICKNESS / 2,
      LEVEL.MIN_PLATFORM_WIDTH * 0.8,
      LEVEL.PLATFORM_THICKNESS
    );

    // Between Tier 2-3
    this.createPlatform(
      LEVEL.WIDTH * 0.4,
      LEVEL.HEIGHT - LEVEL.TIER_HEIGHT * 2.5 - LEVEL.PLATFORM_THICKNESS / 2,
      LEVEL.MIN_PLATFORM_WIDTH * 0.8,
      LEVEL.PLATFORM_THICKNESS
    );

    // Between Tier 3-4
    this.createPlatform(
      LEVEL.WIDTH * 0.6,
      LEVEL.HEIGHT - LEVEL.TIER_HEIGHT * 3.5 - LEVEL.PLATFORM_THICKNESS / 2,
      LEVEL.MIN_PLATFORM_WIDTH * 0.8,
      LEVEL.PLATFORM_THICKNESS
    );

    // Between Tier 4-5
    this.createPlatform(
      LEVEL.WIDTH * 0.5,
      LEVEL.HEIGHT - LEVEL.TIER_HEIGHT * 4.5 - LEVEL.PLATFORM_THICKNESS / 2,
      LEVEL.MIN_PLATFORM_WIDTH * 0.8,
      LEVEL.PLATFORM_THICKNESS
    );
  }

  private visualizeJumpArc(startX: number, startY: number): void {
    // Only show in debug mode
    if (!this.scene.physics.world.drawDebug) return;

    const graphics = this.scene.add.graphics();
    graphics.lineStyle(1, 0x00ff00, 0.5);

    // Constants for jump calculation
    const jumpVelocity = MOVEMENT.JUMP_VELOCITY;
    const gravity = MOVEMENT.GRAVITY;
    const timeStep = 0.05; // Small time step for simulation

    // Draw the jump arc
    let x = startX;
    let y = startY;
    let vx = MOVEMENT.SPEED; // Assuming horizontal movement while jumping
    let vy = jumpVelocity;
    let t = 0;

    graphics.moveTo(x, y);

    // Simulate jump for 1.5 seconds
    while (t < 1.5) {
      // Update position
      x += vx * timeStep;
      y += vy * timeStep;

      // Update velocity (only vertical affected by gravity)
      vy += gravity * timeStep;

      // Draw line to new position
      graphics.lineTo(x, y);

      // Stop if we hit the ground
      if (y > startY) break;

      t += timeStep;
    }

    // Show max jump height with an indicator line
    const maxHeight = startY + (jumpVelocity * jumpVelocity) / (2 * gravity);
    graphics.lineStyle(1, 0x00ffff, 0.7);
    graphics.lineBetween(startX - 50, maxHeight, startX + 50, maxHeight);

    // Add text to show max jump height
    this.scene.add.text(
      startX + 10,
      maxHeight - 10,
      `Jump to: ~${Math.round(maxHeight)}px`,
      {
        fontFamily: "Arial",
        fontSize: "12px",
        color: "#00ffff",
        backgroundColor: "#00000066",
        padding: { x: 4, y: 2 },
      }
    );
  }

  private createPlatform(
    x: number,
    y: number,
    width: number,
    height: number
  ): void {
    // Create the platform as a static physics body
    const platform = this.scene.add.rectangle(x, y, width, height, 0x4b5563);
    this.platforms.add(platform);

    // Adjust the body size to match the platform size
    const body = platform.body as Phaser.Physics.Arcade.Body;
    body.updateFromGameObject();

    // Add a text indicator for platform height in debug mode
    if (this.scene.physics.world.drawDebug) {
      this.scene.add
        .text(x, y - height / 2 - 12, `y: ${Math.round(y - height / 2)}`, {
          fontFamily: "Arial",
          fontSize: "10px",
          color: "#ffffff",
          backgroundColor: "#00000066",
          padding: { x: 2, y: 1 },
        })
        .setOrigin(0.5, 1);
    }
  }

  private createBoundary(
    x: number,
    y: number,
    width: number,
    height: number
  ): void {
    // Create invisible boundary as a static physics body
    const boundary = this.scene.add.rectangle(x, y, width, height, 0xff0000, 0);
    this.boundaries.add(boundary);

    // Adjust the body size to match the boundary size
    const body = boundary.body as Phaser.Physics.Arcade.Body;
    body.updateFromGameObject();
  }

  private addSpawnPoint(x: number, y: number, type: "player" | "enemy"): void {
    this.spawnPoints.push({ x, y, type });

    // Add a visual indicator for spawn points (visible only in debug mode)
    const color = type === "player" ? 0x00ff00 : 0xff0000;
    const spawnMarker = this.scene.add.circle(x, y, 10, color, 0.5);

    // Add text to indicate spawn type
    this.scene.add
      .text(x, y + 15, type, {
        fontFamily: "Arial",
        fontSize: "12px",
        color: "#ffffff",
      })
      .setOrigin(0.5);
  }

  // Public methods to access level components
  public getPlatforms(): Phaser.Physics.Arcade.StaticGroup {
    return this.platforms;
  }

  public getBoundaries(): Phaser.Physics.Arcade.StaticGroup {
    return this.boundaries;
  }

  public getSpawnPoints(type?: "player" | "enemy"): SpawnPoint[] {
    if (type) {
      return this.spawnPoints.filter((point) => point.type === type);
    }
    return this.spawnPoints;
  }

  public getPlayerSpawnPoint(): SpawnPoint {
    const playerSpawns = this.getSpawnPoints("player");
    return playerSpawns[0] || { x: 100, y: 100, type: "player" };
  }

  // Method to update level state if needed
  public update(): void {
    // No update logic needed for static level elements yet
  }
}
