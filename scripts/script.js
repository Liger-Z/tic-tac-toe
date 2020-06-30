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
  let _drawCounter = 0;
  const _gameboard = document.querySelectorAll(".gameboard-tile");
  const _tiles = [];

  for (let i = 0; i < 9; i++) {
    _tiles.push(Tile(i, _gameboard[i]));
  }

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

  const _gameWin = () => {
    const x = [0,3,6];
    const y = [0,1,2];
    let win = false;
    
    for (const i of x) {
      if (_tiles[i].state !== "empty" && _tiles[i].state === _tiles[i+1].state && _tiles[i].state === _tiles[i+2].state) {
        win = true;
      }
    }
    
    for (const i of y) {
      if (_tiles[i].state !== "empty" && _tiles[i].state === _tiles[i+3].state && _tiles[i].state === _tiles[i+6].state) {
        win = true;
      }
    }
    
    if (_tiles[0].state !== "empty" && _tiles[0].state === _tiles[4].state && _tiles[0].state === _tiles[8].state) {
      win = true;
    }
    
    if (_tiles[2].state !== "empty" && _tiles[2].state === _tiles[4].state  && _tiles[2].state === _tiles[6].state) {
      win = true;
    }
    
    if (win === true && player1.turn === true) {
      display.showResult("win", player2);
      for (tile of _tiles) {
        tile.state = "gameover";
      }
    }else if (win === true) {
      display.showResult("win", player1);
      for (tile of _tiles) {
        tile.state = "gameover";
      }
    }
  }

  const checkDraw = () => {
    if (_drawCounter === 9) {
      display.showResult("draw");
    }
  }

  const resetGame = () => {
    _tiles.forEach((tile) => {
      tile.state = "empty";
      tile.div.innerText = '';
    })

    _drawCounter = 0;
  }

  const gameFlow = () => {
    _tiles.forEach(tile => {
      tile.div.addEventListener("click", () => {
        if (player1.turn === true && tile.state === "empty") {
          tile.div.innerText = 'O';
          tile.state = 'O';
          changeTurn();
          display.showTurn();
          _gameWin();
          _drawCounter += 1;
          checkDraw();
        }else if (tile.state === "empty") {
          tile.div.innerText = 'X';
          tile.state = 'X';
          changeTurn();
          display.showTurn();
          _gameWin();
          _drawCounter += 1;
          checkDraw()
        }
      });
    })
  };

  return {
    playerStart,
    _gameWin,
    gameFlow,
    player1,
    player2,
    resetGame,
    _tiles
  };
})();

// Display module
const display = (() => {
  const _gameboardInfo = document.querySelector(".gameboard-info");

  const showInitialTurn = () => {
    const playerTurn = document.createElement("p");
    playerTurn.classList.add("player-turn");
    playerTurn.textContent = `It is now ${gameLogic.playerStart()}'s turn`;
    if (_gameboardInfo.hasChildNodes()) {
      _gameboardInfo.removeChild(_gameboardInfo.firstChild);
    }

    _gameboardInfo.appendChild(playerTurn);
  }

  const showTurn = () => {
    const playerTurn = document.createElement("p");
    playerTurn.classList.add("player-turn");
    if (gameLogic.player1.turn === true) {
      playerTurn.textContent = `It is now ${gameLogic.player1.name}'s turn`;
    }else {
      playerTurn.textContent = `It is now ${gameLogic.player2.name}'s turn`;
    };

    _gameboardInfo.removeChild(_gameboardInfo.firstChild);
    
    _gameboardInfo.appendChild(playerTurn);
  }

  const showResult = (result, player=null ) => {
    const resultPara = document.createElement("p");
    resultPara.classList.add("result");
    
    if (result === "win") {
      resultPara.textContent = `${player.name} is the winner!`;
      _gameboardInfo.removeChild(_gameboardInfo.firstChild)
      _gameboardInfo.appendChild(resultPara);
    }else if (result === "draw") {
     resultPara.textContent = "The game is a draw !";
     _gameboardInfo.removeChild(_gameboardInfo.firstChild)
     _gameboardInfo.appendChild(resultPara);
    }
  }

  return { 
    showInitialTurn,
    showTurn,
    showResult,
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
  const _resetButton = document.querySelector("#reset-game-button");
  
  const _newGameFormActive = () => {
    _newGameForm.classList.remove("inactive");
    _gameType.classList.remove("inactive");
    _contentWrap.style.filter = "blur(5px)"
  };
  
  const  _vsPlayerActive = () => {
    _gameType.classList.add("inactive");
    _vsPlayer.classList.remove("inactive");
  };
  
  const _startPlayerGame = () => {
    event.preventDefault();
    
    if (_checkForm() === false) { return null };
    display.showInitialTurn();
    _vsPlayer.classList.add("inactive");
    _contentWrap.style.filter = "";
    gameLogic.resetGame();
  };
  
  const _checkForm = () => {
    const textFields = document.querySelectorAll(".input-text");
    let emptyField = false;
    
    textFields.forEach(field => {
      if (field.value === "") { emptyField = true };
      if (field.name === "player1" && field.value !== "") {
        gameLogic.player1.name = `${field.value}`;
      }else if (field.name === "player2" && field.value !== "") {
        gameLogic.player2.name = `${field.value}`;
      };
    });
    
    
    if (emptyField === true) {
      return false;
    }else {
      return true;
    }
  };
  
  _newGameButton.addEventListener("click", _newGameFormActive);
  _vsPlayerButton.addEventListener("click", _vsPlayerActive);
  _vsPlayerConfirmButton.addEventListener("click", _startPlayerGame);
  _vsPlayerConfirmButton.addEventListener("click", gameLogic.gameFlow);
  _resetButton.addEventListener("click", _startPlayerGame); 
  return {
  };
})();