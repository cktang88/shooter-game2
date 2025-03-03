# Raze Game Clone

A 2D side-scrolling shooter game built with Phaser 3, TypeScript.

## Project Structure

```
src/
├── scenes/           # Game scenes
└── main.ts          # Game entry point
```

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Setup Instructions

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start development server:
   ```bash
   npm run dev
   ```
4. Build for production:
   ```bash
   npm run build
   ```

## Development

### ECS Architecture

The game uses an Entity Component System (ECS) architecture:

- **Entities**: Game objects (players, enemies, projectiles)
- **Components**: Data containers for entities (Position, Health, Sprite)
- **Systems**: Logic that processes entities with specific components

### Adding New Features

1. Create new components in `src/ecs/components/`
2. Create new systems in `src/ecs/systems/`
3. Create new entities in `src/ecs/entities/`
4. Register systems in the appropriate scene

## License

MIT
