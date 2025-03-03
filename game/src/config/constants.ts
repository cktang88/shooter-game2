export const MOVEMENT = {
  SPEED: 200, // pixels/second
  JUMP_VELOCITY: -400, // pixels/second (negative because y-axis is inverted)
  GRAVITY: 980, // pixels/second²
  GROUND_FRICTION: 0.1,
  AIR_RESISTANCE: 0.01,
} as const;

export const PLAYER = {
  SPAWN_X: 100,
  SPAWN_Y: 100,
  WIDTH: 32,
  HEIGHT: 48,
  HEALTH: 100,
  HEALTH_REGEN: 1, // HP per second
  RESPAWN_TIME: 3000, // milliseconds
  SPAWN_INVULNERABILITY: 2000, // milliseconds
} as const;

// Weapon specifications based on updated WEAP-1 ticket
export const WEAPONS = {
  PISTOL: {
    DAMAGE: 20,
    FIRE_RATE: 3, // shots per second
    PROJECTILE_SPEED: 2200, // pixels/second
    ACCURACY: 95, // percentage (0-100)
    MAGAZINE_SIZE: 12,
    RELOAD_TIME: 1000, // milliseconds
  },
} as const;

// Level specifications based on LEV-1 ticket
export const LEVEL = {
  WIDTH: 1920,
  HEIGHT: 1080,
  PLATFORM_THICKNESS: 8,
  MIN_PLATFORM_WIDTH: 128,
  BOUNDARY_THICKNESS: 10,
  TIER_HEIGHT: 70, // Reduced to be less than max jump height (must account for player standing on platform)
  MAX_JUMP_HEIGHT: 82, // Maximum jump height based on physics (v²/2g)
} as const;
