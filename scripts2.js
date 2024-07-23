const cells = document.querySelectorAll('[data-cell]');
const board = document.getElementById('game-board');
const restartButton = document.getElementById('restartButton');
const messageElement = document.getElementById('message');

let isXNext = true;
let gameState = Array(9).fill(null);

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleClick(event) {
    const cell = event.target;
    const cellIndex = Array.from(cells).indexOf(cell);

    if (gameState[cellIndex] || checkWinner()) return;

    gameState[cellIndex] = isXNext ? 'X' : 'O';
    cell.innerText = isXNext ? 'X' : 'O';
    isXNext = !isXNext;

    if (checkWinner()) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    }
}

function checkWinner() {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return gameState[index] && gameState[index] === gameState[combination[0]];
        });
    });
}

function isDraw() {
    return gameState.every(cell => cell);
}

function endGame(draw) {
    if (draw) {
        messageElement.innerText = 'Draw!';
    } else {
        messageElement.innerText = `${isXNext ? 'O' : 'X'} Wins!`;
    }
    cells.forEach(cell => cell.removeEventListener('click', handleClick));
}

function restartGame() {
    gameState.fill(null);
    cells.forEach(cell => {
        cell.innerText = '';
        cell.addEventListener('click', handleClick, { once: true });
    });
    isXNext = true;
    messageElement.innerText = '';
}

cells.forEach(cell => cell.addEventListener('click', handleClick, { once: true }));
restartButton.addEventListener('click', restartGame);
