// ============================================================
// PARTICLES
// Rain drops, snowflakes and wind streaks. These are only for looks.
// We make a fixed number once and reuse them: when one leaves the
// screen, we move it back to the start instead of making a new one.
// ============================================================

// Make `count` particles using the `create` function
function makeParticles(count, create) {
  const list = [];
  for (let i = 0; i < count; i++) list.push(create());
  return list;
}

const rainDrops = makeParticles(100, () => ({
  x: Math.random() * canvas.width,
  y: Math.random() * GROUND_Y,
  length: randomBetween(8, 14),
  fallSpeed: randomBetween(6, 10),
}));

const snowflakes = makeParticles(70, () => ({
  x: Math.random() * canvas.width,
  y: Math.random() * GROUND_Y,
  radius: randomBetween(1.5, 3.5),
  fallSpeed: randomBetween(0.6, 1.5),
  wobble: Math.random() * Math.PI * 2, // where in its side-to-side sway it is
}));

const windStreaks = makeParticles(20, () => ({
  x: Math.random() * canvas.width,
  y: Math.random() * (GROUND_Y - 20),
  length: randomBetween(30, 80),
  moveSpeed: randomBetween(10, 16),
}));

// Rain falls in both rain and thunderstorms
function isRaining() {
  return weather.current === 'rain' || weather.current === 'thunder';
}

function updateParticles() {
  if (isRaining()) {
    for (const drop of rainDrops) {
      drop.y += drop.fallSpeed;
      drop.x -= 1; // slight slant
      if (drop.y > GROUND_Y) {
        // Back to the top at a random spot
        drop.y = -drop.length;
        drop.x = Math.random() * (canvas.width + 50);
      }
    }
  }

  if (weather.current === 'snow') {
    for (const flake of snowflakes) {
      flake.y += flake.fallSpeed;
      flake.wobble += 0.05;
      flake.x += Math.sin(flake.wobble) * 0.5 - 0.5; // sway + drift left
      if (flake.y > GROUND_Y) {
        flake.y = -flake.radius;
        flake.x = Math.random() * (canvas.width + 50);
      }
    }
  }

  if (weather.current === 'wind') {
    for (const streak of windStreaks) {
      streak.x -= streak.moveSpeed;
      if (streak.x + streak.length < 0) {
        // Back to the right edge at a random height
        streak.x = canvas.width + Math.random() * 200;
        streak.y = Math.random() * (GROUND_Y - 20);
      }
    }
  }
}

function drawParticles() {
  if (isRaining()) {
    ctx.strokeStyle =
      weather.current === 'thunder'
        ? 'rgba(180, 200, 240, 0.5)' // lighter drops show up on the dark sky
        : 'rgba(40, 80, 160, 0.6)';
    ctx.lineWidth = 2;
    for (const drop of rainDrops) {
      ctx.beginPath();
      ctx.moveTo(drop.x, drop.y);
      ctx.lineTo(drop.x - 2, drop.y + drop.length);
      ctx.stroke();
    }
  }

  if (weather.current === 'snow') {
    ctx.fillStyle = '#ffffff';
    for (const flake of snowflakes) {
      ctx.beginPath();
      ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  if (weather.current === 'wind') {
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.lineWidth = 2;
    for (const streak of windStreaks) {
      ctx.beginPath();
      ctx.moveTo(streak.x, streak.y);
      ctx.lineTo(streak.x + streak.length, streak.y);
      ctx.stroke();
    }
  }
}
