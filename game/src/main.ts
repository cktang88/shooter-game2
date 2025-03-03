import { Game, Types } from "phaser";
import { BaseScene } from "./scenes/BaseScene";

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config: Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 1280,
  height: 720,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { x: 0, y: 980 },
      debug: false,
    },
  },
  scene: BaseScene,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  backgroundColor: "#000000",
};

window.addEventListener("load", () => {
  new Game(config);
});
