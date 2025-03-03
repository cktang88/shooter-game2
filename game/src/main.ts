import "phaser";
import { Boot } from "./scenes/Boot";
import { Preloader } from "./scenes/Preloader";
import { MainMenu } from "./scenes/MainMenu";
import { Game } from "./scenes/Game";
import { GameOver } from "./scenes/GameOver";
import { LEVEL } from "./config/constants";

// Global debug flag for easy toggling
let physicsDebug = true;

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 1200,
  height: 800,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { x: 0, y: 0 }, // We'll handle gravity per-sprite
      debug: physicsDebug, // Enable physics debugging
    },
  },
  scene: [Boot, Preloader, MainMenu, Game, GameOver],
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    // Use the full level dimensions for the game world, but keep the canvas size at 1200x800
    width: 1200,
    height: 800,
  },
  backgroundColor: "#0f172a", // Dark slate blue background
};

// Create the game instance
window.addEventListener("load", () => {
  // Create game and store it for reference
  const game = new Phaser.Game(config);

  // Add keyboard listener for debug toggle (Ctrl+D)
  window.addEventListener("keydown", (event) => {
    // Check for Ctrl+D to toggle debug mode
    if (event.key === "d" && (event.ctrlKey || event.metaKey)) {
      // Prevent default browser behavior
      event.preventDefault();

      // Toggle physics debugging
      physicsDebug = !physicsDebug;

      // Update the physics debug setting in all scenes
      for (const scene of game.scene.scenes) {
        if (scene.physics && scene.physics.world) {
          scene.physics.world.drawDebug = physicsDebug;

          // Also need to toggle the debug flag to show bodies
          scene.physics.world.debugGraphic.clear();
        }
      }

      console.log(
        `Physics debug mode: ${physicsDebug ? "ENABLED" : "DISABLED"}`
      );
    }
  });
});
