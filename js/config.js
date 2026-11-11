// ============================================================
// CONFIG
// The canvas, plus every number you can tweak to change how the
// game feels. Loaded first, so all other files can use these.
// ============================================================

// Grab the canvas and its 2D drawing "context" (ctx).
// Everything we draw goes through ctx.
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

// The game counts time in frames. The browser draws ~60 frames per second.
const FPS = 60;

// The y-position of the ground (the line the player stands on)
const GROUND_Y = canvas.height - 40;

// --- Player ---
const PLAYER_SIZE = 40; // width and normal height
const CROUCH_HEIGHT = 20; // height while crouching (half)

// --- Physics ---
const GRAVITY = 0.6; // how fast the player falls back down
const JUMP_POWER = -12; // first jump (negative = upward)
const DOUBLE_JUMP_POWER = -9; // second jump in the air, a bit weaker

// --- Speed ---
const START_SPEED = 5; // how fast obstacles move at the start
const SPEED_UP = 0.002; // how much faster the game gets each frame
const MAX_SPEED = 12; // the game never gets faster than this

// --- Gaps between obstacles, measured in frames of travel time ---
// A full jump keeps the player in the air for about 40 frames, so a
// minimum of 40 means you can always land before the next obstacle.
const MIN_GAP_FRAMES = 40;
const EXTRA_GAP_FRAMES = 70; // random extra gap on top of the minimum

// --- Weather timing ---
const WEATHER_MIN_SECONDS = 5;
const WEATHER_MAX_SECONDS = 10;
const WEATHER_WARNING_SECONDS = 2;

// --- Weather effects ---
const RAIN_JUMP_MULTIPLIER = 0.9; // rain: jumps 10% weaker
const WIND_SPEED_MULTIPLIER = 1.25; // wind: obstacles 25% faster
const SNOW_SPEED_MULTIPLIER = 0.8; // snow: obstacles 20% slower
const SNOW_GRAVITY_MULTIPLIER = 0.8; // snow: floatier jumps (weaker gravity)
const FOG_VISIBLE_DISTANCE = 320; // fog: obstacles appear this close to the player

// --- Thunder / lightning ---
const LIGHTNING_CHANCE = 0.4; // in thunder, 40% of patterns are lightning bolts
const LIGHTNING_WIDTH = 24; // width of a bolt's danger zone
const LIGHTNING_GROUND_GAP = 50; // bolts stop this far above the ground
