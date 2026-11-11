// ============================================================
// HUD (heads-up display)
// Text drawn on top of the game: weather, score, warnings and the
// game over screen.
// ============================================================

function drawHud() {
  // Text color depends on the weather (light text on the dark storm sky)
  ctx.fillStyle = WEATHER_TYPES[weather.current].text;
  ctx.font = '20px Arial';

  // Weather in the top-left corner
  ctx.textAlign = 'left';
  ctx.fillText('Weather: ' + WEATHER_TYPES[weather.current].name, 20, 35);

  // Score in the top-right corner
  ctx.textAlign = 'right';
  ctx.fillText('Score: ' + Math.floor(game.score / 10), canvas.width - 20, 35);

  // Warning in the top center, 2 seconds before the weather changes
  if (isWeatherWarningVisible() && !game.isGameOver) {
    ctx.fillStyle = weather.current === 'thunder' ? '#ffb4a8' : '#c0392b';
    ctx.font = 'bold 22px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(WEATHER_TYPES[weather.next].warning, canvas.width / 2, 35);
  }
}

function drawGameOver() {
  // Semi-transparent dark box over the whole game
  ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = '#fff';
  ctx.textAlign = 'center';
  ctx.font = '40px Arial';
  ctx.fillText('Game Over', canvas.width / 2, canvas.height / 2 - 10);
  ctx.font = '20px Arial';
  ctx.fillText(
    'Press space to restart',
    canvas.width / 2,
    canvas.height / 2 + 30
  );
}
