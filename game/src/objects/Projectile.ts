import { Scene } from "phaser";

export class Projectile extends Phaser.Physics.Arcade.Sprite {
  private damage: number = 0;
  private isActive: boolean = false;
  private lifespan: number = 2000; // 2 seconds before auto-destroy
  private spawnTime: number = 0;

  constructor(scene: Scene, x: number, y: number) {
    // Initially use an empty texture, we'll draw the projectile when fired
    super(scene, x, y, "");

    // Add to scene and enable physics
    scene.add.existing(this);
    scene.physics.add.existing(this);

    // Set up physics properties
    this.setActive(false);
    this.setVisible(false);

    // Set body properties safely using the setter
    this.setGravityY(0);
    this.setGravityX(0);
  }

  fire(
    x: number,
    y: number,
    direction: Phaser.Math.Vector2,
    speed: number,
    damage: number
  ): void {
    // Position the projectile
    this.setPosition(x, y);

    // Set damage
    this.damage = damage;

    // Set velocity based on direction and speed
    this.setVelocity(direction.x * speed, direction.y * speed);

    // Draw the projectile as a simple line
    this.drawProjectile(direction);

    // Activate the projectile
    this.setActive(true);
    this.setVisible(true);
    this.isActive = true;
    this.spawnTime = this.scene.time.now;
  }

  drawProjectile(direction: Phaser.Math.Vector2): void {
    // Create a temporary graphics object to draw the projectile
    const graphics = this.scene.add.graphics();

    // Set line style (color, alpha, width)
    graphics.lineStyle(2, 0xffffff, 2);

    // Create a longer projectile (60px as specified in ticket)
    const projectileLength = 60;

    // Draw a line in the direction the projectile is heading
    graphics.lineBetween(0, 0, projectileLength, 0);

    // Generate texture from the graphics
    const texture = graphics.generateTexture(
      "projectile_texture",
      projectileLength + 4,
      4
    );

    // Clear the graphics object as we no longer need it
    graphics.clear();
    graphics.destroy();

    // Use the generated texture
    this.setTexture("projectile_texture");

    // Set origin to left center so projectile points in direction of travel
    this.setOrigin(0, 0.5);

    // Rotate the projectile to face the direction of travel
    this.rotation = Math.atan2(direction.y, direction.x);
  }

  getDamage(): number {
    return this.damage;
  }

  update(time: number, delta: number): void {
    // Deactivate projectile after lifespan
    if (this.isActive && time > this.spawnTime + this.lifespan) {
      this.deactivate();
    }
  }

  deactivate(): void {
    // Ensure the projectile is completely deactivated
    this.setActive(false);
    this.setVisible(false);
    this.isActive = false;

    // Safely reset body
    if (this.body) {
      this.body.reset(0, 0);
      this.body.stop();

      // Ensure the projectile doesn't continue to be checked for collisions
      this.body.enable = false;
    }

    // Reset velocity
    this.setVelocity(0, 0);

    // Move the projectile offscreen
    this.setPosition(-1000, -1000);

    // Destroy the projectile completely to avoid pooling issues
    this.destroy();
  }
}
