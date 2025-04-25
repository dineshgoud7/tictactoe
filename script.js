// Retrieve score from localStorage or initialize if not present
let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  tie: 0
};

// Update the score display on page load
updateScore();

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameOver = false;

// Add event listeners to the cells
const cells = document.querySelectorAll('.cell');
cells.forEach(cell => {
cell.addEventListener('click', handleCellClick);
});

// Handle cell click
function handleCellClick(event) {
if (gameOver) return;

const cellIndex = event.target.id.split('-')[1];
if (gameBoard[cellIndex] !== '') return;

gameBoard[cellIndex] = currentPlayer;
event.target.textContent = currentPlayer;
event.target.classList.add(currentPlayer.toLowerCase());

// Check for a winner or a tie
if (checkWinner()) {
  document.getElementById('message').textContent = `${currentPlayer} wins!`;
  if (currentPlayer === 'X') {
    score.wins += 1;
    document.body.classList.add('page-x-win');  // Trigger X animation
  } else {
    score.losses += 1;
    document.body.classList.add('page-o-win');  // Trigger O animation
  }
  gameOver = true;
} else if (gameBoard.every(cell => cell !== '')) {
  document.getElementById('message').textContent = "It's a tie!";
  score.tie += 1;
  gameOver = true;
} else {
  // Switch players
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

// Save updated score to localStorage
localStorage.setItem('score', JSON.stringify(score));
updateScore();
}

// Check for winner
function checkWinner() {
const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

for (let pattern of winPatterns) {
  const [a, b, c] = pattern;
  if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
    return true;
  }
}
return false;
}

// Update score display
function updateScore() {
document.querySelector('.js-score').textContent = `X - Wins: ${score.wins} | O - Wins: ${score.losses} | Ties: ${score.tie}`;
}

// Reset the game
document.getElementById('resetBtn').addEventListener('click', resetGame);

function resetGame() {
currentPlayer = 'X';
gameBoard = ['', '', '', '', '', '', '', '', ''];
gameOver = false;
document.getElementById('message').textContent = '';
document.body.classList.remove('page-x-win', 'page-o-win');  // Remove animations when reset

cells.forEach(cell => {
  cell.textContent = '';
  cell.classList.remove('x', 'o');
});
}
