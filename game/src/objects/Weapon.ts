import { Scene } from "phaser";
import { Projectile } from "./Projectile";

export interface WeaponStats {
  damage: number;
  fireRate: number; // shots per second
  projectileSpeed: number;
  accuracy: number; // percentage (0-100)
  magazineSize: number;
  reloadTime: number; // milliseconds
}

export class Weapon {
  private scene: Scene;
  private lastFired: number = 0;
  private stats: WeaponStats;
  private projectiles: Phaser.Physics.Arcade.Group;
  private ammoInClip: number;
  private isReloading: boolean = false;
  private reloadTimer: Phaser.Time.TimerEvent | null = null;

  constructor(scene: Scene, stats: WeaponStats) {
    this.scene = scene;
    this.stats = stats;
    this.ammoInClip = stats.magazineSize;

    // Create projectile group with physics
    this.projectiles = scene.physics.add.group({
      classType: Projectile,
      maxSize: 30, // Pool size for projectiles
      runChildUpdate: true, // Run update method on each projectile
    });
  }

  public shoot(x: number, y: number, direction: Phaser.Math.Vector2): boolean {
    const time = this.scene.time.now;

    // Check if weapon can fire (based on fire rate and ammo)
    if (
      time > this.lastFired + 1000 / this.stats.fireRate &&
      this.ammoInClip > 0 &&
      !this.isReloading
    ) {
      // Apply accuracy deviation
      const accuracy = this.stats.accuracy / 100;
      const deviation = (1 - accuracy) * 0.1; // Max 0.1 radians deviation at 0% accuracy
      const angle = Math.atan2(direction.y, direction.x);
      const randomAngle = angle + (Math.random() * 2 - 1) * deviation;

      // Create new direction vector with accuracy applied
      const newDirection = new Phaser.Math.Vector2(
        Math.cos(randomAngle),
        Math.sin(randomAngle)
      ).normalize();

      // Get a projectile from the pool
      const projectile = this.projectiles.get() as Projectile;

      if (projectile) {
        projectile.fire(
          x,
          y,
          newDirection,
          this.stats.projectileSpeed,
          this.stats.damage
        );

        // Update last fired time and reduce ammo
        this.lastFired = time;
        this.ammoInClip--;

        // Auto-reload when empty
        if (this.ammoInClip === 0) {
          this.reload();
        }

        return true;
      }
    }

    return false;
  }

  public reload(): void {
    if (this.isReloading || this.ammoInClip === this.stats.magazineSize) return;

    this.isReloading = true;

    // Create reload timer
    this.reloadTimer = this.scene.time.delayedCall(
      this.stats.reloadTime,
      () => {
        this.ammoInClip = this.stats.magazineSize;
        this.isReloading = false;
        this.reloadTimer = null;
      }
    );
  }

  public getProjectiles(): Phaser.Physics.Arcade.Group {
    return this.projectiles;
  }

  public getAmmoInClip(): number {
    return this.ammoInClip;
  }

  public getMagazineSize(): number {
    return this.stats.magazineSize;
  }

  public isCurrentlyReloading(): boolean {
    return this.isReloading;
  }

  public getReloadProgress(): number {
    if (!this.isReloading || !this.reloadTimer) return 1;

    return this.reloadTimer.getProgress();
  }
}
