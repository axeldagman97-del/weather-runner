// ============================================================
// UTILS
// Small helper functions used by several files.
// ============================================================

// A random number between min and max
function randomBetween(min, max) {
  return min + Math.random() * (max - min);
}

// A random item from a list
function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

// Returns true if two rectangles overlap ("AABB" collision check).
// Each rectangle needs x, y, width and height.
function isColliding(a, b) {
  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  );
}
