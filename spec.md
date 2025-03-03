# Raze Game Clone - Specification Document

## Game Overview

Raze is a 2D side-scrolling shooter game featuring fast-paced combat, various weapons, multiple game modes, and character customization. This clone aims to recreate the core experience using Phaser.js, TypeScript, and an Entity Component System (ECS) architecture.

## Core Gameplay Features

### Player Character

- **Movement**: Side-scrolling with WASD/Arrow keys
  - Walking left/right
  - Jumping and double jumping
  - Wall jumping
  - Crouching
  - Sprinting
- **Health System**:
  - 100 base health points
  - Health regeneration over time (configurable)
  - Armor system for damage reduction
- **Character Customization**:
  - Different character skins
  - Equipment slots (head, body, legs)

### Weapons System

- **Weapon Types**:
  - Pistol (default weapon, unlimited ammo)
  - SMG (automatic fire, medium damage, high fire rate)
  - Assault Rifle (automatic fire, high damage, medium fire rate)
  - Shotgun (spread shot, high damage at close range)
  - Sniper Rifle (high damage, slow fire rate)
  - Rocket Launcher (area damage)
  - Grenades (throwable explosives)
- **Weapon Properties**:
  - Damage
  - Fire rate
  - Reload time
  - Ammo capacity
  - Recoil
  - Bullet spread
- **Power-ups**:
  - Invincibility (temporary invulnerability)
  - Speed boost (increased movement speed)
  - Double damage (increased weapon damage)
  - Rapid fire (increased fire rate)
  - Health restore (instant health recovery)

### Combat Mechanics

- **Hit Detection**:
  - Precise hit boxes for player and enemies
  - Headshot bonus damage
- **Damage System**:
  - Different damage values based on weapon and hit location
  - Critical hit system
  - Damage indicators
- **Kill Streaks**:
  - Bonus rewards for consecutive kills without dying
- **Death & Respawn**:
  - Respawn timer
  - Spawn protection (brief invulnerability)

### Levels and Environment

- **Level Design**:
  - Multiple themed levels (military base, urban, factory, etc.)
  - Interactive elements (destructible objects, moving platforms)
  - Hazards (spikes, lava, etc.)
  - Cover and tactical positions
- **Physics**:
  - Gravity and jumping physics
  - Collision detection
  - Projectile physics

### AI and Enemies

- **Enemy Types**:
  - enemy soldiers, very similar to the player character, can pick up and use the same weapons, have the same abilities
- **AI Behavior**:
  - Pathfinding
  - Cover usage
  - Target prioritization
  - Difficulty scaling

### Game Modes

- **Single Player**:
  - Campaign mode with progressive levels
  - Survival mode against waves of enemies
- **Multiplayer** (stretch goal):
  - Deathmatch
  - Team deathmatch
  - Capture the flag
  - Domination (control points)

### UI/UX

- **HUD Elements**:
  - Health and armor display
  - Ammo counter
  - Minimap
  - Score/kill counter
  - Objective indicators
- **Menus**:
  - Main menu
  - Settings menu
  - Character customization
  - Weapon loadout
  - Level selection
- **Audio-Visual Feedback**:
  - Hit markers
  - Damage indicators
  - Kill confirmations
  - Achievement notifications

### Audio

- **Sound Effects**:
  - Weapon sounds
  - Character movement
  - Environmental sounds
  - UI interactions
- **Music**:
  - Menu music
  - In-game background music
  - Victory/defeat jingles

### Progression System

- **Experience Points**:
  - Gained from kills, objectives, and level completion
- **Leveling System**:
  - Player level with rewards
- **Unlockables**:
  - New weapons
  - Character skins
  - Equipment
  - Special abilities

## Technical Architecture

### Entity Component System (ECS)

- **Entities**: Game objects like players, enemies, projectiles, etc.
- **Components**: Data containers for entities (Position, Health, Sprite, etc.)
- **Systems**: Logic that processes entities with specific components

### Core Systems

- **Rendering System**: Handles sprite rendering, animations, and visual effects
- **Physics System**: Manages movement, collision detection, and physics interactions
- **Input System**: Processes keyboard/mouse input and converts to game actions
- **Combat System**: Handles damage calculation, hit detection, and combat mechanics
- **AI System**: Controls enemy behavior and pathfinding
- **Audio System**: Manages sound effects and music
- **UI System**: Renders and updates user interface elements
- **Progression System**: Tracks player progress, levels, and unlocks

### Performance Optimizations

- **Object Pooling**: Reuse game objects to reduce garbage collection
- **Asset Management**: Efficient loading and unloading of assets
- **Culling**: Only render objects visible on screen
- **Level Streaming**: Load level sections dynamically

### Data Management

- **Save/Load System**: Store and retrieve player progress
- **Configuration**: Externalize game parameters for easy balancing
- **Localization**: Support for multiple languages

## Stretch Goals

- **Mobile Support**: Touch controls for mobile devices
- **Additional Game Modes**: Objective-based missions, time trials
- **Level Editor**: Allow players to create custom levels
- **Weapon Crafting**: Combine weapon parts to create custom weapons
- **Clan System**: Create and join clans for team competitions
- **Leaderboards**: Global ranking system
- **Achievements**: In-game accomplishments with rewards

## Technical Constraints

- **Target Platforms**: Web browsers (desktop first, mobile as stretch goal)
- **Performance Target**: 60 FPS on mid-range hardware
- **Network Requirements** (for multiplayer): Low latency, efficient state synchronization
- **Asset Size Budget**: Optimize for reasonable load times

## Development Tooling

- **Version Control**: Git
- **Build System**: Vite
- **Package Management**: npm
- **Testing Framework**: Vitest for unit tests
- **Asset Pipeline**: Tools for optimizing sprites, audio, and other assets
