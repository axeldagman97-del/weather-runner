// ============================================================
// OBSTACLES
// Everything that scrolls in from the right and ends the game if
// you touch it. "Patterns" are groups of one or more obstacles.
// Every pattern can be passed with a single jump, a crouch, or
// (for lightning) by staying on the ground.
// ============================================================

let obstacles = [];
let nextGap = 0; // distance in pixels before the next pattern

function resetObstacles() {
  obstacles = [];
  nextGap = 0;
}

// Create an obstacle that sits on the ground
function groundObstacle(offsetX, width, height) {
  return {
    type: 'ground',
    x: canvas.width + offsetX, // start just off the right edge
    y: GROUND_Y - height,
    width: width,
    height: height,
  };
}

// Each pattern returns a list of obstacles
const PATTERNS = {
  short: () => [
    groundObstacle(0, randomBetween(20, 30), randomBetween(25, 35)),
  ],

  tall: () => [groundObstacle(0, randomBetween(20, 25), randomBetween(55, 65))],

  wide: () => [groundObstacle(0, randomBetween(60, 80), randomBetween(25, 30))],

  // Two small obstacles close together - one jump clears both
  double: () => [
    groundObstacle(0, 18, 25),
    groundObstacle(18 + 45, 18, 25), // 45px gap after the first one
  ],

  // A flying obstacle at head height. Its bottom edge is 25px above the
  // ground: a standing player (40px) hits it, a crouching player (20px)
  // fits underneath. (Jumping over it also works.)
  flying: () => [
    {
      type: 'flying',
      x: canvas.width,
      y: GROUND_Y - 25 - 25, // 25px tall, floating 25px above the ground
      width: randomBetween(40, 50),
      height: 25,
    },
  ],
};

const PATTERN_NAMES = Object.keys(PATTERNS);

function spawnPattern() {
  // During thunder, some patterns are lightning bolts instead (see lightning.js)
  if (weather.current === 'thunder' && Math.random() < LIGHTNING_CHANCE) {
    obstacles.push(createLightningBolt());
  } else {
    const name = pickRandom(PATTERN_NAMES);
    obstacles.push(...PATTERNS[name]());
  }

  // Choose a random gap before the next pattern so the rhythm isn't predictable.
  // We use the fastest possible speed (with wind) so the gap is always long
  // enough to land, even if the weather changes to wind.
  const fastestSpeed = game.speed * WIND_SPEED_MULTIPLIER;
  nextGap = fastestSpeed * (MIN_GAP_FRAMES + Math.random() * EXTRA_GAP_FRAMES);
}

function updateObstacles() {
  // --- Spawn a new pattern once the last obstacle is far enough away ---
  const last = obstacles[obstacles.length - 1];
  if (!last || last.x + last.width < canvas.width - nextGap) {
    spawnPattern();
  }

  // --- Move obstacles and check for hits ---
  const obstacleSpeed = getObstacleSpeed(); // depends on weather

  for (const obstacle of obstacles) {
    obstacle.x -= obstacleSpeed;

    if (isColliding(player, obstacle)) {
      game.isGameOver = true;
    }
  }

  // Remove obstacles that have scrolled off the left side
  obstacles = obstacles.filter((o) => o.x + o.width > 0);
}

function drawObstacles() {
  for (const obstacle of obstacles) {
    // In fog, skip obstacles that are still far away from the player
    const distance = obstacle.x - (player.x + player.width);
    if (weather.current === 'fog' && distance > FOG_VISIBLE_DISTANCE) {
      continue;
    }

    if (obstacle.type === 'lightning') {
      drawLightningBolt(obstacle);
    } else {
      // Flying obstacles get their own color so they're easy to spot
      ctx.fillStyle = obstacle.type === 'flying' ? '#9b59d0' : '#e5484d';
      ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    }
  }
}
