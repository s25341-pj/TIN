const playerX = document.getElementById("player-x");
const playerO = document.getElementById("player-o");
const boardSize = document.getElementById("board-size");
const firstPlayer = document.getElementById("first-player");
const board = document.getElementById("board");
const startButton = document.getElementById("start-button");
const undoButton = document.getElementById("undo-button");
const timeCount = document.getElementById("time-count");
const pauseButton = document.getElementById("pause-button");
const resumeButton = document.getElementById("resume-button");
const playerXWinsCount = document.getElementById("player-x-wins-count");
const playerOWinsCount = document.getElementById("player-o-wins-count");
const tiesCount = document.getElementById("ties-count");
let cells = [];
let currentPlayer;
let moves = [];
let timer;
let time = 0;
let playerXWins = 0;
let playerOWins = 0;
let ties = 0;


pauseButton.addEventListener("click", function () {
    clearInterval(timer);
});

resumeButton.addEventListener("click", function () {
    timer = setInterval(updateTime, 1000);
});

function updateTime() {
    time++;
    timeCount.textContent = time;
}

function resetTime() {
    clearInterval(timer);
    time = 0;
    timeCount.textContent = time;
}

startButton.addEventListener("click", function () {
    if (playerX.value === "" || playerO.value === "") {
        alert("Please enter names for both players.");
    } else {
        createBoard();
        resetTime();
        timer = setInterval(updateTime, 1000);
    }
});

firstPlayer.addEventListener("change", function () {
    currentPlayer = firstPlayer.value;
});

undoButton.addEventListener("click", function () {
    if (moves.length > 0) {
        let lastMove = moves.pop();
        lastMove.cell.textContent = "";
        currentPlayer = lastMove.player;
    }
});

function updateStats(result) {
    if (result === "X") {
        playerXWins++;
        playerXWinsCount.textContent = playerXWins;
    } else if (result === "O") {
        playerOWins++;
        playerOWinsCount.textContent = playerOWins;
    } else if (result === "tie") {
        ties++;
        tiesCount.textContent = ties;
    }
}

function createBoard() {
// clear board
    board.innerHTML = "";
    cells = [];
    moves = [];
    currentPlayer = firstPlayer.value;

    // create board
    let boardSizeValue = boardSize.value;
    for (let row = 0; row < boardSizeValue; row++) {
        let tr = document.createElement("tr");
        for (let col = 0; col < boardSizeValue; col++) {
            let td = document.createElement("td");
            td.addEventListener("click", function () {
                if (this.textContent === "") {
                    this.textContent = currentPlayer;
                    moves.push({player: currentPlayer, cell: this});
                    if (checkWin()) {
                        alert(`Player ${currentPlayer} wins!`);
                        resetTime();
                        updateStats(currentPlayer);
                        reset();
                    } else if (checkDraw()) {
                        alert("Draw!");
                        resetTime();
                        updateStats("tie");
                        reset();
                    } else {
                        currentPlayer = currentPlayer === "X" ? "O" : "X";
                    }
                }
            });
            tr.appendChild(td);
            cells.push(td);
        }
        board.appendChild(tr);
    }
}

function checkWin() {
    // check for win
    let boardSizeValue = boardSize.value;
    let player = currentPlayer;
    for (let row = 0; row < boardSizeValue; row++) {
        for (let col = 0; col < boardSizeValue; col++) {
            if (cells[row * boardSizeValue + col].textContent === player) {
                if (
                    // check row
                    cells[row * boardSizeValue + (col + 1) % boardSizeValue].textContent === player &&
                    cells[row * boardSizeValue + (col + 2) % boardSizeValue].textContent === player
                ) {
                    return true;
                }
                if (
                    // check column
                    cells[(row + 1) * boardSizeValue + col].textContent === player &&
                    cells[(row + 2) * boardSizeValue + col].textContent === player
                ) {
                    return true;
                }
                if (
                    // check diagonal
                    row === col &&
                    cells[(row + 1) * boardSizeValue + col + 1].textContent === player &&
                    cells[(row + 2) * boardSizeValue + col + 2].textContent === player
                ) {
                    return true;
                }
                if (
                    // check other diagonal
                    row + col === boardSizeValue - 1 &&
                    cells[(row + 1) * boardSizeValue + col - 1].textContent === player &&
                    cells[(row + 2) * boardSizeValue + col - 2].textContent === player
                ) {
                    return true;
                }
            }
        }
    }
    return false;
}

function checkDraw() {
    // check for draw
    for (let i = 0; i < cells.length; i++) {
        if (cells[i].textContent === "") {
            return false;
        }
    }
    return true;
}

function reset() {
// reset game
    for (let i = 0; i < cells.length; i++) {
        cells[i].textContent = "";
    }
    currentPlayer = firstPlayer.value;
    moves = [];
}

var backgroundMusic = document.getElementById("background-music");
backgroundMusic.volume = 100;

function muteBackgroundMusic() {
    if (backgroundMusic.muted) {
        backgroundMusic.muted = false;
        document.getElementById("mute-button").innerHTML = "Mute";
    } else {
        backgroundMusic.muted = true;
        document.getElementById("mute-button").innerHTML = "Unmute";
    }
}