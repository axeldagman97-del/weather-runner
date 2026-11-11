// ============================================================
// WEATHER
// Which weather it is, when it changes, how it affects gameplay,
// and the sky/ground/fog drawing. Particles (rain, snow, wind) are
// in particles.js and lightning is in lightning.js.
// ============================================================

// Everything about each weather type in one place
const WEATHER_TYPES = {
  sunny: {
    name: 'Sunny',
    warning: 'Sun coming out!',
    sky: '#d6efff', // lighter, bright sky
    text: '#333',
  },
  rain: {
    name: 'Rain',
    warning: 'Rain incoming!',
    sky: '#b8c2cc',
    text: '#333',
  },
  wind: {
    name: 'Wind',
    warning: 'Wind incoming!',
    sky: '#dde3e8',
    text: '#333',
  },
  fog: {
    name: 'Fog',
    warning: 'Fog incoming!',
    sky: '#cfd3d6',
    text: '#333',
  },
  snow: {
    name: 'Snow',
    warning: 'Snow incoming!',
    sky: '#e6edf5',
    text: '#333',
  },
  thunder: {
    name: 'Thunder',
    warning: 'Thunderstorm incoming!',
    sky: '#4a5160', // dark stormy sky
    text: '#f0f0f0', // light text so it's readable on the dark sky
  },
};

const weather = {
  current: 'sunny', // the weather right now
  next: 'rain', // what it will change to (picked early so we can warn)
  timer: 0, // frames left until it changes
};

function resetWeather() {
  startWeather('sunny');
}

function startWeather(type) {
  weather.current = type;
  weather.timer = Math.floor(
    randomBetween(WEATHER_MIN_SECONDS, WEATHER_MAX_SECONDS) * FPS
  );

  // Pick a different weather for next time
  const options = Object.keys(WEATHER_TYPES).filter((w) => w !== type);
  weather.next = pickRandom(options);
}

function updateWeather() {
  weather.timer--;
  if (weather.timer <= 0) {
    startWeather(weather.next);
  }
}

function isWeatherWarningVisible() {
  return weather.timer <= WEATHER_WARNING_SECONDS * FPS;
}

// ------------------------------------------------------------
// Gameplay effects - other files ask these instead of checking
// the weather themselves.
// ------------------------------------------------------------
function getJumpMultiplier() {
  return weather.current === 'rain' ? RAIN_JUMP_MULTIPLIER : 1;
}

function getGravity() {
  return weather.current === 'snow' ? GRAVITY * SNOW_GRAVITY_MULTIPLIER : GRAVITY;
}

function getObstacleSpeed() {
  if (weather.current === 'wind') return game.speed * WIND_SPEED_MULTIPLIER;
  if (weather.current === 'snow') return game.speed * SNOW_SPEED_MULTIPLIER;
  return game.speed;
}

// ------------------------------------------------------------
// Drawing
// ------------------------------------------------------------
function drawSky() {
  ctx.fillStyle = WEATHER_TYPES[weather.current].sky;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // A sun when it's sunny
  if (weather.current === 'sunny') {
    ctx.fillStyle = '#ffd84d';
    ctx.beginPath();
    ctx.arc(canvas.width / 2 + 150, 70, 28, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawGround() {
  if (weather.current === 'snow') {
    // A layer of snow on the ground
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, GROUND_Y, canvas.width, canvas.height - GROUND_Y);
  }
  ctx.fillStyle = weather.current === 'thunder' ? '#aaa' : '#555';
  ctx.fillRect(0, GROUND_Y, canvas.width, 2);
}

function drawFog() {
  if (weather.current !== 'fog') return;
  // A semi-transparent grey layer over the whole scene
  ctx.fillStyle = 'rgba(220, 222, 225, 0.55)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}
