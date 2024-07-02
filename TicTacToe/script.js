const board = document.querySelector(".board");
let currentPlayer = "X";
let winner = null;
const cells = Array.from({ length: 9 }).fill(null);

function checkWinner() {
  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < winningConditions.length; i++) {
    const [a, b, c] = winningConditions[i];
    if (
      cells[a] &&
      cells[a] === cells[b] &&
      cells[a] === cells[c] &&
      cells[a] !== null
    ) {
      return cells[a];
    }
  }

  return null;
}

function handleCellClick({ target }) {
  const index = Array.from(target.parentNode.children).indexOf(target);
  if (winner || cells[index] || !target.classList.contains("cell")) return;

  cells[index] = currentPlayer;
  target.textContent = currentPlayer;
  currentPlayer = currentPlayer === "X" ? "O" : "X";

  winner = checkWinner();

  if (winner) {
    alert(`Player ${winner} wins!`);
    resetGame();
    return;
  }

  if (!cells.includes(null)) {
    alert(`It's a tie!`);
    resetGame();
    return;
  }
}

function render() {
  const fragment = document.createDocumentFragment();
  cells.forEach((value, index) => {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.textContent = value || "";
    cell.addEventListener("click", handleCellClick);
    fragment.appendChild(cell);
  });
  board.textContent = "";
  board.appendChild(fragment);
}

function resetGame() {
  cells.length = 0;
  Array.prototype.push.apply(cells, Array(9).fill(null));
  currentPlayer = "X";
  winner = null;
  render();
}

render();
