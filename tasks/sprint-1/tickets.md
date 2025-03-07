# Sprint 1: Core Movement and Basic Combat (MVP)

## Project Setup (SETUP-1)

**Priority**: P0
**Estimate**: 4 hours
**Description**: Set up initial project structure with Phaser.js, TypeScript.
**Tasks**:

- Initialize new Vite + TypeScript project
- Install and configure Phaser.js
- Configure build and development environment
- Set up linting and formatting
  **Acceptance Criteria**:
- Project builds successfully
- Development server runs without errors
- TypeScript compilation works
- README with setup instructions exists

## Basic Movement System (MOVE-1)

**Priority**: P0
**Estimate**: 8 hours
**Description**: Implement core player movement mechanics
**Tasks**:

- Create Player entity with required components (Position, Velocity, Input)
- Implement MovementSystem for handling player movement
- Add WASD/Arrow key input handling
- Implement basic jumping mechanics
- Add ground collision detection
  **Technical Specs**:
- Movement speed: 200 pixels/second
- Jump velocity: 400 pixels/second
- Gravity: 980 pixels/second²
- Ground friction: 0.1
- Air resistance: 0.01
  **Acceptance Criteria**:
- Player moves smoothly left/right with WASD/Arrow keys
- Player can jump with spacebar
- Player collides with ground correctly
- Movement feels responsive and smooth
- No input lag or stuttering

## Basic Weapon System (WEAP-1)

**Priority**: P0
**Estimate**: 8 hours
**Description**: Implement default pistol and basic shooting mechanics
**Tasks**:

- Create Weapon component and WeaponSystem
- Implement basic pistol weapon
- Add projectile entity and system
- Create collision detection for projectiles
- Projectile graphics is just short fast-moving lines (60px) for now
- Add basic weapon switching logic
  **Technical Specs**:
- Pistol damage: 20
- Pistol fire rate: 3 shots/second
- Projectile speed: 2200 pixels/second
- Pistol accuracy: 95%
- Magazine size: 12 bullets
  **Acceptance Criteria**:
- Player can shoot with left mouse click
- Projectiles travel in straight lines
- Projectiles are destroyed on collision
- Weapon has correct fire rate
- Basic weapon switching works
- Basic reloading works, automatically when clip empty + manually anytime

## Test Level Creation (LEV-1)

**Priority**: P1
**Estimate**: 6 hours
**Description**: Create initial test level with basic platforms
**Tasks**:

- Design simple level layout
- Implement platform entities
- Add collision system for platforms
- Create level boundaries
- Add spawn points
  **Technical Specs**:
- Level size: 1920x1080 pixels
- Platform thickness: 8 pixels
- Minimum platform width: 128 pixels
- Level boundaries: solid walls
  **Acceptance Criteria**:
- Level loads correctly
- All platforms have proper collision
- Player can move and jump between platforms
- Level boundaries prevent player from leaving
- Spawn points work correctly

## Basic Enemy System (ENEMY-1)

**Priority**: P1
**Estimate**: 6 hours
**Description**: Implement basic enemy entities that move on platforms and interact with the player
**Tasks**:

- Create Enemy entity with required components (Position, Velocity, Health)
- Implement simple AI for random movement on platforms
- Add collision detection with platforms, player, and projectiles
- Create enemy spawn system
- Implement basic enemy graphics (simple placeholder sprites)
- Add damage handling for enemies
  **Technical Specs**:
- Enemy movement speed: 100 pixels/second
- Enemy health: 50
- Random movement: Change direction every 2-5 seconds
- Spawn rate: Configurable, default 1 enemy per 10 seconds
- Platform awareness: Enemies don't fall off edges
- Collision damage to player: 10 per hit
  **Acceptance Criteria**:
- Enemies spawn correctly in the level
- Enemies move randomly on platforms without falling off
- Enemies collide properly with platforms and boundaries
- Enemies take damage from player projectiles
- Enemies damage player on collision
- Enemies die when health reaches 0

## Health System (HLTH-1)

**Priority**: P1
**Estimate**: 4 hours
**Description**: Implement basic player health system
**Tasks**:

- Create Health component
- Implement damage handling system
- Add health regeneration
- Create death/respawn logic
  **Technical Specs**:
- Max health: 100
- Health regen rate: 1 HP/second
- Respawn time: 3 seconds
- Spawn invulnerability: 2 seconds
  **Acceptance Criteria**:
- Health system tracks damage correctly
- Player dies when health reaches 0
- Health regeneration works as specified
- Respawn system functions properly
- Spawn protection works

## Basic UI Elements (UI-1)

**Priority**: P1
**Estimate**: 6 hours
**Description**: Create essential UI elements for gameplay
**Tasks**:

- Create health display
- Add ammo counter
- Implement kill feed
- Add basic score display
- Create crosshair
  **Technical Specs**:
- UI scale: 1x
- Health bar dimensions: 200x20 pixels
- Font size: 16px
- UI update rate: 60Hz
  **Acceptance Criteria**:
- Health display updates in real-time
- Ammo counter shows correct values
- Kill feed displays recent kills
- Score updates correctly
- UI is clearly visible and non-intrusive

## Testing & Bug Fixes (TEST-1)

**Priority**: P2
**Estimate**: 4 hours
**Description**: Comprehensive testing of Sprint 1 features
**Tasks**:

- Test all movement mechanics
- Verify weapon system functionality
- Check level collision detection
- Test UI responsiveness
- Document and fix found bugs
  **Acceptance Criteria**:
- All core features work as specified
- No major bugs in movement system
- Weapon system functions reliably
- UI updates correctly
- Performance meets target (60 FPS)
