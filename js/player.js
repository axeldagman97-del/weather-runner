// ============================================================
// PLAYER
// The blue square: jumping, double jumping, crouching and gravity.
// ============================================================

let player;

function resetPlayer() {
  player = {
    x: 80,
    y: GROUND_Y - PLAYER_SIZE, // top of the square, so it sits on the ground
    width: PLAYER_SIZE,
    height: PLAYER_SIZE,
    velocityY: 0, // current vertical speed
    onGround: true,
    jumpsUsed: 0, // 0 on the ground, 1 after first jump, 2 after double jump
    isCrouching: false,
  };
}

function jump() {
  // The weather can make jumps weaker (see weather.js)
  const multiplier = getJumpMultiplier();

  if (player.onGround) {
    // First jump from the ground
    player.velocityY = JUMP_POWER * multiplier;
    player.onGround = false;
    player.jumpsUsed = 1;
  } else if (player.jumpsUsed < 2) {
    // Double jump: one extra, weaker jump while in the air
    player.velocityY = DOUBLE_JUMP_POWER * multiplier;
    player.jumpsUsed = 2;
  }
}

function updatePlayer() {
  // --- Gravity and movement ---
  player.velocityY += getGravity(); // gravity pulls down a bit more each frame
  player.y += player.velocityY; // move by the current speed

  // --- Landing ---
  // player.y is the TOP of the player, so the feet are at y + height
  if (player.y + player.height >= GROUND_Y) {
    player.y = GROUND_Y - player.height;
    player.velocityY = 0;
    player.onGround = true;
    player.jumpsUsed = 0; // landing gives the double jump back
  }

  // --- Crouching ---
  // You can only crouch on the ground. Holding down in the air does
  // nothing until you land.
  player.isCrouching = input.down && player.onGround;
  player.height = player.isCrouching ? CROUCH_HEIGHT : PLAYER_SIZE;

  // Keep the feet on the ground when the height changes
  if (player.onGround) {
    player.y = GROUND_Y - player.height;
  }
}

function drawPlayer() {
  ctx.fillStyle = '#4f7cff';
  ctx.fillRect(player.x, player.y, player.width, player.height);
}
