// Player function factory
const Player = (name, id, mark) => {
  let turn = false;
  return {name, id, mark, turn};
};

// Tile function factory
const Tile = (tileNumber, div) => {
  let state = "empty";
  return {tileNumber, div, state};
};

// Game logic module
const gameLogic = (() => {
  let player1 = Player('', 'player1', 'O');
  let player2 = Player('', 'player2', 'X');

  const playerStart = () => { // Decides who starts first
    let num = Math.floor(Math.random() * 2)
    num === 1 ? player1.turn = true : player2.turn = true;
    return player1.turn === true ? player1.name : player2.name;
  };
  const changeTurn = () => {
    if (player1.turn === true) {
      player1.turn = false;
      player2.turn = true;
    }else {
      player1.turn = true;
      player2.turn = false;
    }
  };

  const gameFlow = () => {
    gameboard.tiles.forEach(tile => {
      tile.div.addEventListener("click", () => {
        if (player1.turn === true) {
          tile.div.innerText = 'O';
          changeTurn();
          gameboard.showTurn();
        }else {
          tile.div.innerText = 'X';
          changeTurn();
          gameboard.showTurn();
        }
      });
    })
  };

  return {
    playerStart,
    gameFlow,
    player1,
    player2,
  };
})();

// Gameboard module
const gameboard = (() => {
  const gameboard = document.querySelectorAll(".gameboard-tile");
  const _gameboardInfo = document.querySelector(".gameboard-info");
  const tiles = [];
  for (let i = 0; i < 9; i++) {
    tiles.push(Tile(i, gameboard[i]));
  }

  const showInitialTurn = () => {
    let playerTurn = document.createElement("p");
    playerTurn.classList.add("player-turn");
    playerTurn.textContent = `It is now ${gameLogic.playerStart()}'s turn`;
    _gameboardInfo.appendChild(playerTurn);
  }

  const showTurn = () => {
    let playerTurn = document.createElement("p");
    playerTurn.classList.add("player-turn");
    if (gameLogic.player1.turn === true) {
      playerTurn.textContent = `It is now ${gameLogic.player1.name}'s turn`;
    }else {
      playerTurn.textContent = `It is now ${gameLogic.player2.name}'s turn`;
    };

    _gameboardInfo.removeChild(document.getElementsByClassName("player-turn")[0]);
    _gameboardInfo.appendChild(playerTurn);
  }

  return { 
    gameboard,
    showInitialTurn,
    tiles,
    showTurn,
  };
})();

// Button module
const button = (() => {
  const _contentWrap = document.querySelector("#content-wrap");
  const _newGameButton = document.querySelector("#new-game-button");
  const _newGameForm = document.querySelector(".new-game-form")
  const _gameType = document.querySelector(".game-type");
  const _vsPlayerButton = document.querySelector("#vs-player-button");
  const _vsPlayer = document.querySelector(".vs-player");
  const _vsPlayerConfirmButton = document.querySelector("#vs-player-confirm-button");
  const _vsPlayerForm = document.querySelector(".vs-player-form-wrap");

  _newGameButton.addEventListener("click", newGameForm);
  _vsPlayerButton.addEventListener("click", vsPlayer);
  _vsPlayerConfirmButton.addEventListener("click", startPlayerGame);
  _vsPlayerConfirmButton.addEventListener("click", gameLogic.gameFlow);

  function newGameForm() {
    _newGameForm.classList.remove("inactive");
    _gameType.classList.remove("inactive");
    _contentWrap.style.filter = "blur(5px)"
  };
  
  function vsPlayer() {
    _gameType.classList.add("inactive");
    _vsPlayer.classList.remove("inactive");
  };

  function startPlayerGame() {
    event.preventDefault();
    
    if (checkForm() === false) { return null };
    gameboard.showInitialTurn();
    _vsPlayer.classList.add("inactive");
    _contentWrap.style.filter = "";
  };

  function checkForm() {
    const textFields = document.querySelectorAll(".input-text");
    const radioFields = document.querySelectorAll(".input-radio");
    let emptyField = false;
    let checkedRadio = false;

    textFields.forEach(field => {
      if (field.value === "") { emptyField = true };
      if (field.name === "player1" && field.value !== "") {
        gameLogic.player1.name = `${field.value}`;
      }else if (field.name === "player2" && field.value !== "") {
        gameLogic.player2.name = `${field.value}`;
      };
    });

    radioFields.forEach(field => {
      if (field.checked === true) { checkedRadio = true };
    });

    if (emptyField === true | checkedRadio !== true) {
      return false;
    }else {
      return true;
    }
  };

  return {

  };
})();