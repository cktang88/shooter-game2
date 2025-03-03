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
