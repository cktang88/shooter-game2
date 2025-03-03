import { Scene } from "phaser";

export class Preloader extends Scene {
  constructor() {
    super("Preloader");
  }

  init() {
    //  We loaded this image in our Boot Scene, so we can display it here
    this.add.image(512, 384, "background");

    //  A simple progress bar. This is the outline of the bar.
    this.add.rectangle(512, 384, 468, 32).setStrokeStyle(1, 0xffffff);

    //  This is the progress bar itself. It will increase in size from the left based on the % of progress.
    const bar = this.add.rectangle(512 - 230, 384, 4, 28, 0xffffff);

    //  Use the 'progress' event emitted by the LoaderPlugin to update the loading bar
    this.load.on("progress", (progress: number) => {
      //  Update the progress bar (our bar is 464px wide, so 100% = 464px)
      bar.width = 4 + 460 * progress;
    });
  }

  preload() {
    // Show loading progress
    const progress = this.add.graphics();
    this.load.on("progress", (value: number) => {
      progress.clear();
      progress.fillStyle(0xffffff, 1);
      progress.fillRect(0, 270, 800 * value, 60);
    });

    // Load assets
    this.load.image("background", "assets/background.png");

    // Load player assets - using a muted blue color
    const playerGraphics = this.add.graphics();
    playerGraphics.fillStyle(0x3b82f6); // Nice muted blue color
    playerGraphics.fillRect(0, 0, 32, 48);
    playerGraphics.generateTexture("player", 32, 48);
    playerGraphics.destroy();

    // Load platform assets - using a muted gray color
    const platformGraphics = this.add.graphics();
    platformGraphics.fillStyle(0x4b5563); // Nice muted gray color
    platformGraphics.fillRect(0, 0, 400, 32);
    platformGraphics.generateTexture("platform", 400, 32);
    platformGraphics.destroy();
  }

  create() {
    //  When all the assets have loaded, it's often worth creating global objects here that the rest of the game can use.
    //  For example, you can define global animations here, so we can use them in other scenes.

    //  Move to the MainMenu. You could also swap this for a Scene Transition, such as a camera fade.
    this.scene.start("MainMenu");
  }
}
