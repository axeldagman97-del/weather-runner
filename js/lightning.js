// ============================================================
// LIGHTNING
// During thunder, lightning bolts scroll in like obstacles.
// A bolt reaches from the top of the screen down to just above the
// player's head, so you're safe on the ground but get hit if you
// jump into it. That's what makes jumping dangerous in a storm.
// Also: random white flashes across the sky.
// ============================================================

// Create one bolt. Its hitbox is a tall thin rectangle; the zigzag
// shape is only for looks and stays inside the rectangle.
function createLightningBolt() {
  const height = GROUND_Y - LIGHTNING_GROUND_GAP;

  // Zigzag points from top to bottom. dx is the offset from the bolt's left edge.
  const points = [];
  const steps = 8;
  for (let i = 0; i <= steps; i++) {
    points.push({
      dx: randomBetween(0, LIGHTNING_WIDTH),
      y: (height / steps) * i,
    });
  }

  return {
    type: 'lightning',
    x: canvas.width,
    y: 0,
    width: LIGHTNING_WIDTH,
    height: height,
    points: points,
  };
}

// Trace the zigzag as a path, ready to be stroked
function traceBoltPath(bolt) {
  ctx.beginPath();
  bolt.points.forEach((point, i) => {
    const x = bolt.x + point.dx;
    if (i === 0) ctx.moveTo(x, point.y);
    else ctx.lineTo(x, point.y);
  });
}

function drawLightningBolt(bolt) {
  ctx.save();
  // Random brightness each frame makes the bolt flicker
  ctx.globalAlpha = randomBetween(0.6, 1);

  // Wide, see-through yellow line = glow
  traceBoltPath(bolt);
  ctx.strokeStyle = 'rgba(255, 230, 90, 0.4)';
  ctx.lineWidth = 12;
  ctx.stroke();

  // Thin, bright line on top = the bolt itself
  traceBoltPath(bolt);
  ctx.strokeStyle = '#fffbe0';
  ctx.lineWidth = 3;
  ctx.stroke();

  ctx.restore();
}

// ------------------------------------------------------------
// Sky flashes (only visual - they don't hurt you)
// ------------------------------------------------------------
let flashFrames = 0; // frames left of the current flash
const FLASH_LENGTH = 10;

function updateThunderFlash() {
  if (flashFrames > 0) {
    flashFrames--;
  } else if (weather.current === 'thunder' && Math.random() < 1 / 120) {
    // On average one flash every 2 seconds
    flashFrames = FLASH_LENGTH;
  }
}

function drawThunderFlash() {
  if (flashFrames <= 0) return;
  // Starts bright and fades out
  const alpha = (flashFrames / FLASH_LENGTH) * 0.5;
  ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}
