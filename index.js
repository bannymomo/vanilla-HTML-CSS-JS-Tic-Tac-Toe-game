const game = {
  gameSize: 3,
  gameboard: document.getElementById("gameboard"),
  player1Array: [],
  player2Array: [],
  winCondition: [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ],
  flag: false,
  gameWin: false
};

const buttonNumber = game.gameSize * game.gameSize;
game.gameboard.style["grid-template-columns"] = `repeat(${game.gameSize}, 1fr)`;

for (let i = 0; i < buttonNumber; i++) {
  const button = document.createElement("button");
  game.gameboard.appendChild(button);
  button.id = i;
  button.classList.add("button");
  button.onclick = function(event) {
    buttonClick(button, event);
  };
}

function buttonClick(button, event) {
  if (game.flag === false) {
    event.target.innerHTML = "X";
    event.target.data = "Player1";
    game.flag = true;
    nextPlayer.innerHTML = "Next Player: O";
    game.player1Array.push(event.target.id);
    console.log(game.player1Array);
    checkWin(game.player1Array, event.target.data);
    checkDraw();
  } else {
    event.target.innerHTML = "O";
    event.target.data = "Player2";
    game.flag = false;
    nextPlayer.innerHTML = "Next Player: X";
    game.player2Array.push(event.target.id);
    console.log(game.player2Array);
    checkWin(game.player2Array, event.target.data);
  }
  button.onclick = null;
}

function checkWin(playerarray, winner) {
  for (let i = 0; i < game.winCondition.length; i++) {
    if (isContained(playerarray, game.winCondition[i])) {
      const buttons = document.getElementsByClassName("button");
      for (let j = 0; j < buttons.length; j++) {
        buttons[j].onclick = null;
      }
      nextPlayer.innerHTML = `Winner is ${winner}`;
      setTimeout(() => alert(`${winner} win`), 100);
      game.gameWin = true;
      break;
    }
  }
}

function checkDraw() {
  if (game.gameWin === true) {
    return;
  }
  if (game.player1Array.length === 5) {
    nextPlayer.innerHTML = `Draw`;
    setTimeout(() => alert(`Draw`), 100);
  }
}

function isContained(a, b) {
  if (!(a instanceof Array) || !(b instanceof Array)) return false;
  if (a.length < b.length) return false;
  var aStr = a.toString();
  for (var i = 0; i < b.length; i++) {
    if (aStr.indexOf(b[i]) == -1) return false;
  }
  return true;
}
