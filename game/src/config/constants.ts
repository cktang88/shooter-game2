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
} as const;

// Weapon specifications based on WEAP-1 ticket
export const WEAPONS = {
  PISTOL: {
    DAMAGE: 20,
    FIRE_RATE: 2, // shots per second
    PROJECTILE_SPEED: 600, // pixels/second
    ACCURACY: 95, // percentage (0-100)
    MAGAZINE_SIZE: 12,
    RELOAD_TIME: 1000, // milliseconds
  },
} as const;
