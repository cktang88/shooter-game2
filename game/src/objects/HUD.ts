import { Scene } from "phaser";
import { Player } from "./Player";

export class HUD {
  private scene: Scene;
  private player: Player;
  private ammoText: Phaser.GameObjects.Text;
  private weaponNameText: Phaser.GameObjects.Text;
  private reloadProgressBar: Phaser.GameObjects.Graphics;

  constructor(scene: Scene, player: Player) {
    this.scene = scene;
    this.player = player;

    // Create ammo counter
    this.ammoText = scene.add.text(
      scene.cameras.main.width - 120,
      scene.cameras.main.height - 40,
      "Ammo: 0/0",
      {
        fontFamily: "Arial",
        fontSize: 16,
        color: "#ffffff",
        stroke: "#000000",
        strokeThickness: 2,
      }
    );
    this.ammoText.setScrollFactor(0);

    // Create weapon name text
    this.weaponNameText = scene.add.text(
      scene.cameras.main.width - 120,
      scene.cameras.main.height - 70,
      "Weapon: Pistol",
      {
        fontFamily: "Arial",
        fontSize: 16,
        color: "#ffffff",
        stroke: "#000000",
        strokeThickness: 2,
      }
    );
    this.weaponNameText.setScrollFactor(0);

    // Create reload progress bar
    this.reloadProgressBar = scene.add.graphics();
    this.reloadProgressBar.setScrollFactor(0);
  }

  public update(): void {
    // Check if player exists and has weapon data
    if (!this.player) return;

    try {
      // Get weapon data
      const currentWeapon = this.player.currentWeapon;
      if (!currentWeapon) return;

      // Update ammo text
      const ammoInClip = currentWeapon.getAmmoInClip();
      const magazineSize = currentWeapon.getMagazineSize();
      this.ammoText.setText(`Ammo: ${ammoInClip}/${magazineSize}`);

      // Update reload progress bar
      this.reloadProgressBar.clear();

      if (currentWeapon.isCurrentlyReloading()) {
        const progress = currentWeapon.getReloadProgress();
        const barWidth = 100;
        const barHeight = 10;
        const x = this.scene.cameras.main.width - 120;
        const y = this.scene.cameras.main.height - 25;

        // Draw background
        this.reloadProgressBar.fillStyle(0x333333, 0.8);
        this.reloadProgressBar.fillRect(x, y, barWidth, barHeight);

        // Draw progress
        this.reloadProgressBar.fillStyle(0x00ff00, 1);
        this.reloadProgressBar.fillRect(x, y, barWidth * progress, barHeight);

        // Show "RELOADING" text
        this.ammoText.setText("RELOADING");
      }
    } catch (error) {
      console.error("Error updating HUD:", error);
    }
  }
}
