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

function update() {
  if (keys["w"]) player.y -= player.speed;
  if (keys["s"]) player.y += player.speed;
  if (keys["a"]) player.x -= player.speed;
  if (keys["d"]) player.x += player.speed;
}

function draw() {
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
