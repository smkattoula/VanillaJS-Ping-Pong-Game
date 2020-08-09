const rulesBtn = document.getElementById("rules-btn");
const closeBtn = document.getElementById("close-btn");
const rules = document.getElementById("rules");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Init score
let score = 0;

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

// Create a function that draws everything
function draw() {
  drawBall();
  drawPlatform();
  drawScore();
}

draw();

// Event listeners
rulesBtn.addEventListener("click", () => {
  rules.classList.add("show");
});

closeBtn.addEventListener("click", () => {
  rules.classList.remove("show");
});
