const PLAYER_X = "X";
const PLAYER_O = "O";
let turn = PLAYER_X;

const tiles = document.querySelectorAll(".tile");
const boardState = Array(tiles.length);
const strike = document.getElementById("strike");
const gameoverArea = document.getElementById("gameover-area");

boardState.fill(null);
tiles.forEach((tile) => tile.addEventListener("click", tileClick));

setHoverText();

function setHoverText() {
  tiles.forEach((tile) => {
    tile.classList.remove("x-hover");
    tile.classList.remove("o-hover");
  });

  const hoverClass = `${turn.toLowerCase()}-hover`;

  tiles.forEach((tile) => {
    if (tile.innerText == "") {
      tile.classList.add(hoverClass);
    }
  });
}

function tileClick() {
  if (gameoverArea.innerText != "") return;
  const tile = event.target;
  const tileNumber = tile.dataset.index;
  if (tile.innerText != "") return;
  if (turn === PLAYER_X) {
    tile.innerText = PLAYER_X;
    turn = PLAYER_O;
    boardState[tileNumber - 1] = PLAYER_X;
  } else {
    tile.innerText = PLAYER_O;
    boardState[tileNumber - 1] = PLAYER_O;
    turn = PLAYER_X;
  }
  checkWinner();
  setHoverText();
}

function checkWinner() {
  //Check for a winner
  for (const winningCombination of winningCombinations) {
    const { combo, strikeClass } = winningCombination;
    const tileValue1 = boardState[combo[0] - 1];
    const tileValue2 = boardState[combo[1] - 1];
    const tileValue3 = boardState[combo[2] - 1];
    const condition =
      tileValue1 != null &&
      tileValue1 === tileValue2 &&
      tileValue1 === tileValue3;
    console.log(tileValue1, tileValue2, tileValue3);
    if (condition) {
      strike.classList.add(strikeClass);
      gemeoverScreen(tileValue1);
    }
  }
  const allTilesFilledIn = boardState.every((tile) => tile != null);
  if (allTilesFilledIn) gemeoverScreen();
}

function gemeoverScreen(winner) {
  if (winner) {
    gameoverArea.classList = "visible";
    gameoverArea.innerText = `player ${winner} won`;
  } else {
    gameoverArea.classList = "visible";
    gameoverArea.innerText = `it's a tie`;
  }
}

const winningCombinations = [
  { combo: [1, 2, 3], strikeClass: "strike-row-1" },
  { combo: [4, 5, 6], strikeClass: "strike-row-2" },
  { combo: [7, 8, 9], strikeClass: "strike-row-3" },
  { combo: [1, 4, 7], strikeClass: "strike-column-1" },
  { combo: [2, 5, 8], strikeClass: "strike-column-2" },
  { combo: [3, 6, 9], strikeClass: "strike-column-3" },
  { combo: [1, 5, 9], strikeClass: "strike-diagonal-1" },
  { combo: [3, 5, 7], strikeClass: "strike-diagonal-2" },
];
