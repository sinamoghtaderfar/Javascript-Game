// Get elements
const playBoard = document.querySelector(".play-board");
const scoreEl = document.querySelector(".score");
const highScoreEl = document.querySelector(".hight-score");
const countdownElement = document.getElementById('countdown');

let foodX, foodY;
let snakeX = 7,snakeY = 10;

let velocityX = 0,velocityY = 0;

let snakBody = [];
let gameOver = false;
let setIntervalId;
let score = 0;
let foodCreatedTime = 0; 
let foodExists = false;
let countdown;
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

  foodCreatedTime = Date.now(); // Record the time the food was created
  foodExists = true;
};

const initGame = () => {
  gameOver ? handleGameOver() : undefined;
//   if (gameOver) return handleGameOver();
  let currentTime = Date.now(); // Get the current time
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
    
    htmlMarkup += `<div class="head" style="grid-area: ${snakBody[i][1]} / ${snakBody[i][0]}"></div>`;
    if(i !== 0 && snakBody[0][1] === snakBody[i][1] && snakBody[0][0] === snakBody[i][0]) gameOver = true;
  }

  if (foodExists && currentTime - foodCreatedTime > 5000) {
    foodExists = false; 
  }

  // If food doesn't exist, or it has disappeared, generate new food
  if (!foodExists) {
    changeFoodPosition();
  }

  playBoard.innerHTML = htmlMarkup;
  countdownElement.textContent = countdown;
  
  if (countdown > 0) {
    // Decrement the countdown if it's greater than 0
    countdown--;
  } else {
    // If countdown reaches 0, generate new food
    changeFoodPosition();
    countdown = 30; // Reset the countdown timer
  }
  // Set a timeout to remove the food after 10 seconds
  foodTimeout = setTimeout(() => {
    foodElement.remove();
    clearInterval(countdownInterval); // Clear the interval if the food disappears
    countdown = 30; // Reset the countdown timer
    changeFoodPosition(); // Generate new food after 10 seconds
  }, 30000);
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
  // countdownElement.textContent = countdown;

};

changeFoodPosition();

setIntervalId = setInterval(initGame, 125);

document.addEventListener("keydown", changeDirection);
