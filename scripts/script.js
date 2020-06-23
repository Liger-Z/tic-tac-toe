// Player function factory
const Player = (name, id) => {
  return {name, id};
};

// Tile function factory
const Tile = (tileNumber) => {
  let state = "empty";

  return {tileNumber, state};
};

// Game logic module
const gameLogic = (() => {
  const playerStart = () => { // Decides who starts first
    let num = Math.floor(Math.random() * 2)
    return num === 1 ? "player1.name" : "player2.name";
  };

  return {
    playerStart,
  };
})();

// Gameboard module
const gameboard = (() => {
  const _gameboard = document.querySelectorAll(".gameboard-tile");
  const _gameboardInfo = document.querySelector(".gameboard-info");
  const _tiles = [];
  for (let i = 0; i < 9; i++) {
    _tiles.push(Tile(i));
  }

  let playerTurn = document.createElement("p");
  playerTurn.classList.add("player-turn");
  playerTurn.textContent = `It is now ${gameLogic.playerStart()}'s turn`;
  _gameboardInfo.appendChild(playerTurn);

  return { 
  };
})();

const newGameButton = (() => {
  const _contentWrap = document.querySelector("#content-wrap");
  const _newGameButton = document.querySelector("#new-game-button");
  const _newGameForm = document.querySelector("#new-game-form")
  const _gameType = document.querySelector("#game-type");

  _newGameButton.addEventListener("click", newGameForm);

  function newGameForm () {
    _newGameForm.style.display = "flex";
    _contentWrap.style.filter = "blur(3px)"
  };
  
  return {

  };
})();