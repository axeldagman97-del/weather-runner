// ============================================================
// GAME
// The main file: game-wide state, reset, and the game loop that
// ties all the other files together. Loaded last.
// ============================================================

// State for the whole game (player, obstacles and weather keep their own)
const game = {
  speed: START_SPEED,
  score: 0,
  isGameOver: false,
};

// Put everything back to the start
function resetGame() {
  game.speed = START_SPEED;
  game.score = 0;
  game.isGameOver = false;

  resetPlayer();
  resetObstacles();
  resetWeather();
}

// ------------------------------------------------------------
// UPDATE - moves everything forward by one frame (~60 times a second)
// ------------------------------------------------------------
function update() {
  if (game.isGameOver) return; // freeze everything on the game over screen

  updatePlayer();
  updateWeather();
  updateObstacles();
  updateParticles();
  updateThunderFlash();

  // Score and difficulty
  game.score++; // one point per frame survived
  game.speed = Math.min(game.speed + SPEED_UP, MAX_SPEED); // slowly faster, up to a limit
}

// ------------------------------------------------------------
// DRAW - paints the current frame, back to front.
// Later calls are drawn on top of earlier ones.
// ------------------------------------------------------------
function draw() {
  drawSky(); // filling the sky also wipes the previous frame
  drawGround();
  drawPlayer();
  drawObstacles();
  drawParticles();
  drawFog();
  drawThunderFlash();
  drawHud();

  if (game.isGameOver) {
    drawGameOver();
  }
}

// ------------------------------------------------------------
// GAME LOOP
// requestAnimationFrame asks the browser to call gameLoop again
// before the next screen repaint, giving us a smooth loop.
// ------------------------------------------------------------
function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

// Start the game!
resetGame();
gameLoop();
