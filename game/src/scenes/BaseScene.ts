import { Scene } from "phaser";

export class BaseScene extends Scene {
  constructor(config: string | Phaser.Types.Scenes.SettingsConfig) {
    super(config);
  }

  create(): void {
    // this.world = new World(this);
  }

  update(time: number, delta: number): void {
    // this.world.update(time, delta);
  }
}
