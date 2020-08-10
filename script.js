const rulesBtn = document.getElementById("rules-btn");
const closeBtn = document.getElementById("close-btn");
const rules = document.getElementById("rules");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Init score
let score = 0;

const brickRowCount = 9;
const brickColumnCount = 5;

// Create ball properties
const ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  size: 10,
  speed: 4,
  dx: 4,
  dy: -4,
};

// Create platform properties
const platform = {
  x: canvas.width / 2 - 40,
  y: canvas.height - 20,
  w: 80,
  h: 10,
  speed: 8,
  dx: 0,
};

// Create brick properties
const brickInfo = {
  w: 70,
  h: 20,
  padding: 10,
  offsetX: 45,
  offsetY: 60,
  visible: true,
};

// Create a function that creates the bricks
const bricks = [];
for (let i = 0; i < brickRowCount; i++) {
  bricks[i] = [];
  for (let j = 0; j < brickColumnCount; j++) {
    const x = i * (brickInfo.w + brickInfo.padding) + brickInfo.offsetX;
    const y = j * (brickInfo.h + brickInfo.padding) + brickInfo.offsetY;
    bricks[i][j] = { x, y, ...brickInfo };
  }
}

// Create a function that draws the bricks on canvas
function drawBricks() {
  bricks.forEach((column) => {
    column.forEach((brick) => {
      ctx.beginPath();
      ctx.rect(brick.x, brick.y, brick.w, brick.h);
      ctx.fillStyle = brick.visible ? "#0095dd" : "transparent";
      ctx.fill();
      ctx.closePath();
    });
  });
}

// Create a function that draws a ball on the canvas
function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
  ctx.fillStyle = "#0095dd";
  ctx.fill();
  ctx.closePath();
}

// Create a function that drawws a paddle on the canvas
function drawPlatform() {
  ctx.beginPath();
  ctx.rect(platform.x, platform.y, platform.w, platform.h);
  ctx.fillStyle = "#0095dd";
  ctx.fill();
  ctx.closePath();
}

// Create a function that draws the score on canvas
function drawScore() {
  (ctx.font = "20px Arial"),
    ctx.fillText(`Score: ${score}`, canvas.width - 100, 30);
}

// Create a function that moves the paddle on canvas
function movePlatform() {
  platform.x += platform.dx;

  // Wall detection
  if (platform.x + platform.w > canvas.width) {
    platform.x = canvas.width - platform.w;
  }

  if (platform.x < 0) {
    platform.x = 0;
  }
}

// Create a function that draws everything
function draw() {
  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawBricks();
  drawBall();
  drawPlatform();
  drawScore();
}

// Create a function that updates canvas drawing and animation
function update() {
  movePlatform();

  // Draw everything
  draw();

  requestAnimationFrame(update);
}

update();

// Keydown/keyup events
function keyDown(e) {
  if (e.key === "Right" || e.key === "ArrowRight") {
    platform.dx = platform.speed;
  } else if (e.key === "Left" || e.key === "ArrowLeft") {
    platform.dx = -platform.speed;
  }
  console.log(e);
}

function keyUp(e) {
  if (
    e.key === "Right" ||
    e.key === "ArrowRight" ||
    e.key === "Left" ||
    e.key === "ArrowLeft"
  ) {
    platform.dx = 0;
  }
}

// Event listeners
rulesBtn.addEventListener("click", () => {
  rules.classList.add("show");
});

closeBtn.addEventListener("click", () => {
  rules.classList.remove("show");
});

document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);
