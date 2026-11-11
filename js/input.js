// ============================================================
// INPUT
// Space: jump / double jump, or restart on the game over screen.
// Down arrow: crouch while held.
// ============================================================

// Keys that are held down (rather than pressed once)
const input = {
  down: false,
};

document.addEventListener('keydown', function (event) {
  if (event.code === 'Space') {
    event.preventDefault(); // stop the page from scrolling down
    if (event.repeat) return; // ignore auto-repeat when the key is held down

    if (game.isGameOver) {
      resetGame();
    } else {
      jump();
    }
  }

  if (event.code === 'ArrowDown') {
    event.preventDefault();
    input.down = true;
  }
});

document.addEventListener('keyup', function (event) {
  if (event.code === 'ArrowDown') {
    input.down = false;
  }
});
