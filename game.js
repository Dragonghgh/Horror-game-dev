const map = [
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,1,1,1,0,1,1,1,1,1,0,1,1,0,1],
  [1,0,0,0,1,0,0,0,0,0,1,0,0,0,0,1],
  [1,1,1,0,1,1,1,1,0,1,1,1,1,0,1,1],
  [1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1],
  [1,0,1,1,1,1,0,1,1,1,1,1,1,1,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
];

const tileSize = 40;

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

let player = {
  x: 320,
  y: 240,
  size: 16,
  speed: 2
};

let keys = {};

document.addEventListener("keydown", e => keys[e.key] = true);
document.addEventListener("keyup", e => keys[e.key] = false);

function canMove(nx, ny) {
  let tileX = Math.floor(nx / tileSize);
  let tileY = Math.floor(ny / tileSize);
  return map[tileY][tileX] === 0;
}

function update() {
  let nextX = player.x;
  let nextY = player.y;

  if (keys["w"]) nextY -= player.speed;
  if (keys["s"]) nextY += player.speed;
  if (keys["a"]) nextX -= player.speed;
  if (keys["d"]) nextX += player.speed;

  if (canMove(nextX, nextY)) {
    player.x = nextX;
    player.y = nextY;
  }
}


function draw() {
  
  for (let y = 0; y < map.length; y++) {
  for (let x = 0; x < map[y].length; x++) {
    if (map[y][x] === 1) {
      ctx.fillStyle = "#222";
      ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
    }
  }
}

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // draw player
  ctx.fillStyle = "white";
  ctx.fillRect(player.x, player.y, player.size, player.size);

  // darkness overlay
  ctx.fillStyle = "rgba(0,0,0,0.95)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // flashlight hole
  ctx.globalCompositeOperation = "destination-out";
  ctx.beginPath();
  ctx.arc(
    player.x + player.size / 2,
    player.y + player.size / 2,
    80, // flashlight radius
    0,
    Math.PI * 2
  );
  ctx.fill();
  ctx.globalCompositeOperation = "source-over";
}

loop();
