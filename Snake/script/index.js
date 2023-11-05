const playBoard = document.querySelector(".play-board");
const scoreEl = document.querySelector(".score");
const highScoreEl = document.querySelector(".hight-score");

let foodX, foodY;
let snakeX = 7,snakeY = 10;

let velocityX = 0,velocityY = 0;

let snakBody = [];
let gameOver = false;
let setIntervalId;
let score = 0;


// getting high score from the local storage;
let highScore = localStorage.getItem("high-score") || 0;
highScoreEl.innerHTML = `High Score : ${highScore}`;


const handleGameOver = () => {
  clearInterval(setIntervalId);
  alert("Game Over");
  location.reload();
};

const changeFoodPosition = () => {
  foodX = Math.floor(Math.random() * 30) + 1;
  foodY = Math.floor(Math.random() * 30) + 1;
};

const initGame = () => {
  gameOver ? handleGameOver() : undefined;
//   if (gameOver) return handleGameOver();

  let htmlMarkup = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;

  // checking if the snake hit the food
  if (snakeX === foodX && snakeY === foodY) {
    changeFoodPosition();
    snakBody.push([foodX, foodY]);
    score++;

    highScore = score >= highScore ? score : highScore;
    localStorage.setItem("high-score", highScore);

    scoreEl.innerHTML = `Score : ${score}`;
    highScore.innerHTML = `High Score : ${highScore}`;
  }

  for (let i = snakBody.length - 1; i > 0; i--) {
    snakBody[i] = snakBody[i - 1];
  }

  snakBody[0] = [snakeX, snakeY];

  snakeX += velocityX;
  snakeY += velocityY;

  if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
    gameOver = true;
  }

  for (let i = 0; i < snakBody.length; i++) {
    //  adding a div
    htmlMarkup += `<div class="head" style="grid-area: ${snakBody[i][1]} / ${snakBody[i][0]}"></div>`;
    if(i !== 0 && snakBody[0][1] === snakBody[i][1] && snakBody[0][0] === snakBody[i][0]) gameOver = true;
  }

  playBoard.innerHTML = htmlMarkup;
};

const changeDirection = (e) => {
  // change velocity value based on key press
  if (e.key === "ArrowUp" && velocityY != 1) {
    velocityX = 0;
    velocityY = -1;
  } else if (e.key === "ArrowDown" && velocityY != -1) {
    velocityX = 0;
    velocityY = 1;
  } else if (e.key === "ArrowLeft" && velocityX != 1) {
    velocityX = -1;
    velocityY = 0;
  } else if (e.key === "ArrowRight" && velocityX != -1) {
    velocityX = 1;
    velocityY = 0;
  }
  // initGame();
};

changeFoodPosition();

setIntervalId = setInterval(initGame, 125);

document.addEventListener("keydown", changeDirection);
