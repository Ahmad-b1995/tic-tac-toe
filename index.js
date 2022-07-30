const PLAYER_X = "X";
const PLAYER_O = "O";
let turn = PLAYER_X;
const tiles = document.querySelectorAll(".tile");
tiles.forEach((tile) => tile.addEventListener("click", tileClick));

setHoverText();

function setHoverText() {
  tiles.forEach((tile) => {
    tile.classList.remove("x-hover");
    tile.classList.remove("o-hover");
  });

  const hoverClass = `${turn.toLowerCase()}-hover`;

  tiles.forEach((tile) => {
    console.log(tile.innerText)
    if(tile.innerText == ''){
      tile.classList.add(hoverClass);
    }
  });
}

function tileClick() {
  const tile = event.target;
  if (tile.innerText != '') return;
  if (turn === PLAYER_X) {
    tile.innerText = PLAYER_X;
    turn = PLAYER_O;
  } else {
    tile.innerText = PLAYER_O;
    turn = PLAYER_X;
  }
  setHoverText();
}
