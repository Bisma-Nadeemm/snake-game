const gameBoard = document.getElementById("game-board");
const gridSize = 20;
const snakeSpeed = 100;
const foodSpeed = 3000;

let snake = [{ x: 10, y: 10 }];
let direction = "right";
let food = { x: 15, y: 15 };
let intervalId;

function createSnake() {
    snake.forEach(segment => {
        const div = document.createElement("div");
        div.className = "snake";
        div.style.left = segment.x * gridSize + "px";
        div.style.top = segment.y * gridSize + "px";
        gameBoard.appendChild(div);
    });
}

function createFood() {
    const div = document.createElement("div");
    div.className = "food";
    div.style.left = food.x * gridSize + "px";
    div.style.top = food.y * gridSize + "px";
    gameBoard.appendChild(div);
}

function moveSnake() {
    const head = { ...snake[0] };

    switch (direction) {
        case "right":
            head.x++;
            break;
        case "left":
            head.x--;
            break;
        case "up":
            head.y--;
            break;
        case "down":
            head.y++;
            break;
    }

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        createFood();
    } else {
        snake.pop();
    }

    updateGameBoard();
}

function updateGameBoard() {
    while (gameBoard.firstChild) {
        gameBoard.removeChild(gameBoard.firstChild);
    }

    createSnake();
    createFood();

    checkCollision();
}

function checkCollision() {
    const head = snake[0];

    if (
        head.x < 0 ||
        head.x >= gridSize ||
        head.y < 0 ||
        head.y >= gridSize
    ) {
        clearInterval(intervalId);
        alert("Game Over! Refresh the page to play again.");
        return;
    }

    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            clearInterval(intervalId);
            alert("Game Over! Refresh the page to play again.");
            return;
        }
    }
}

document.addEventListener("keydown", (e) => {
    switch (e.key) {
        case "ArrowUp":
            if (direction !== "down") direction = "up";
            break;
        case "ArrowDown":
            if (direction !== "up") direction = "down";
            break;
        case "ArrowLeft":
            if (direction !== "right") direction = "left";
            break;
        case "ArrowRight":
            if (direction !== "left") direction = "right";
            break;
    }
});

createSnake();
createFood();
intervalId = setInterval(moveSnake, snakeSpeed);
setInterval(() => {
    food = {
        x: Math.floor(Math.random() * gridSize),
        y: Math.floor(Math.random() * gridSize),
    };
}, foodSpeed);
