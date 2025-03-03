import { MOVEMENT, WEAPONS } from "../config/constants";
import { Weapon, WeaponStats } from "./Weapon";

export class Player extends Phaser.Physics.Arcade.Sprite {
  private keys: {
    W: Phaser.Input.Keyboard.Key;
    A: Phaser.Input.Keyboard.Key;
    S: Phaser.Input.Keyboard.Key;
    D: Phaser.Input.Keyboard.Key;
    R: Phaser.Input.Keyboard.Key;
  };
  private isJumping: boolean = false;
  private isCrouching: boolean = false;
  private normalHeight: number;

  // Weapon-related properties
  public currentWeapon: Weapon;
  private weapons: Map<string, Weapon> = new Map();
  private mousePointer: Phaser.Input.Pointer;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, "player");

    // Add player to the scene and enable physics
    scene.add.existing(this);
    scene.physics.add.existing(this);

    // Store normal height for crouching
    this.normalHeight = this.displayHeight;

    // Set up physics properties
    this.setCollideWorldBounds(true);
    this.setBounce(0);
    this.setGravityY(MOVEMENT.GRAVITY);
    this.setFriction(MOVEMENT.GROUND_FRICTION, 0);
    this.setDragX(MOVEMENT.AIR_RESISTANCE * 1000); // Convert to Phaser units

    // Set up input
    if (scene.input.keyboard) {
      this.keys = {
        W: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
        A: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
        S: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
        D: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
        R: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R),
      };
    }

    // Store mouse pointer reference
    this.mousePointer = scene.input.activePointer;

    // Initialize weapons
    this.initializeWeapons(scene);

    // Set up mouse click event for shooting
    scene.input.on("pointerdown", (pointer: Phaser.Input.Pointer) => {
      if (pointer.leftButtonDown()) {
        this.shoot();
      }
    });
  }

  private initializeWeapons(scene: Phaser.Scene): void {
    // Create pistol weapon
    const pistolStats: WeaponStats = {
      damage: WEAPONS.PISTOL.DAMAGE,
      fireRate: WEAPONS.PISTOL.FIRE_RATE,
      projectileSpeed: WEAPONS.PISTOL.PROJECTILE_SPEED,
      accuracy: WEAPONS.PISTOL.ACCURACY,
      magazineSize: WEAPONS.PISTOL.MAGAZINE_SIZE,
      reloadTime: WEAPONS.PISTOL.RELOAD_TIME,
    };

    // Create and add pistol to weapons map
    const pistol = new Weapon(scene, pistolStats);
    this.weapons.set("pistol", pistol);

    // Set current weapon to pistol
    this.currentWeapon = pistol;
  }

  // Method to handle shooting
  private shoot(): void {
    if (!this.currentWeapon) return;

    // Calculate direction from player to cursor
    const direction = new Phaser.Math.Vector2(
      this.mousePointer.worldX - this.x,
      this.mousePointer.worldY - this.y
    ).normalize();

    // Attempt to shoot
    this.currentWeapon.shoot(this.x, this.y, direction);
  }

  // Method to switch weapons
  public switchWeapon(weaponKey: string): void {
    const weapon = this.weapons.get(weaponKey);
    if (weapon) {
      this.currentWeapon = weapon;
    }
  }

  // Get current weapon's projectiles for collision detection
  public getProjectiles(): Phaser.Physics.Arcade.Group {
    return this.currentWeapon.getProjectiles();
  }

  // Method to get the current weapon for HUD
  public getCurrentWeapon(): Weapon {
    return this.currentWeapon;
  }

  update() {
    if (!this.keys) return;

    // Handle horizontal movement
    if (this.keys.A.isDown) {
      this.setVelocityX(-MOVEMENT.SPEED);
      this.setFlipX(true);
    } else if (this.keys.D.isDown) {
      this.setVelocityX(MOVEMENT.SPEED);
      this.setFlipX(false);
    } else {
      // Apply friction when not moving
      this.setVelocityX(0);
    }

    // Handle jumping
    if (this.keys.W.isDown && this.body?.touching.down && !this.isJumping) {
      this.setVelocityY(MOVEMENT.JUMP_VELOCITY);
      this.isJumping = true;
    }

    // Handle crouching
    if (this.keys.S.isDown && this.body?.touching.down) {
      if (!this.isCrouching) {
        this.isCrouching = true;
        this.setDisplaySize(this.displayWidth, this.normalHeight * 0.5);
        this.setOffset(0, this.normalHeight * 0.5);
        this.setVelocityX(0); // Stop movement while crouching
      }
    } else if (this.isCrouching) {
      this.isCrouching = false;
      this.setDisplaySize(this.displayWidth, this.normalHeight);
      this.setOffset(0, 0);
    }

    // Reset jump when touching ground
    if (this.body?.touching.down) {
      this.isJumping = false;
    }

    // Handle reload
    if (this.keys.R.isDown && this.currentWeapon) {
      this.currentWeapon.reload();
    }
  }
}
