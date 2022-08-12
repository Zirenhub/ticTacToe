let ticTacToe = (function () {
  //object
  let game = {
    //property
    gameboard: [],
    template: document.querySelector('.ttt-container'),
    turnDisplay: document.querySelector('#playerTurn'),

    //function
    init: function () {
      this.createArray();
    },

    createArray: function () {
      for (let i = 1; i <= 9; i++) {
        let box = document.createElement('div');
        box.classList.add('ttt-box');
        this.gameboard.push(box);
        this.template.appendChild(box);
      }
    },

    turn: function (currentPlayer) {
      if (currentPlayer === 'O') {
        currentPlayer = playerOne.value;
        this.turnDisplay.textContent = playerTwo.value;
        this.turnDisplay.style.color = '#6868ff';
        return currentPlayer;
      } else {
        currentPlayer = playerTwo.value;
        this.turnDisplay.textContent = playerOne.value;
        this.turnDisplay.style.color = '#ff5454';
        return currentPlayer;
      }
    },

    isSpaceOccupied: function (box) {
      if (
        box.classList.contains('active-X') ||
        box.classList.contains('active-O')
      ) {
        console.log('that tile is busy');
        return true;
      } else {
        return false;
      }
    },

    announceWinner: function (winner) {
      this.template.disabled;
      let winnerDiv = document.createElement('div');
      let winnerText = document.createElement('p');
      winnerDiv.appendChild(winnerText);
      winnerText.textContent = `${winner} Wins!`;
      winnerDiv.classList.add('winner-display');
      if (winner === 'Player 1') {
        winnerDiv.style.color = '#ed331a';
      } else {
        winnerDiv.style.color = '#6868ff';
      }
      let parentDiv = document.querySelector('.main-container');
      parentDiv.appendChild(winnerDiv);
    },

    checkWin: function () {
      const combos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 4, 8],
        [2, 4, 6],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
      ];
      combos.some((row) => {
        let oCounter = 0;
        let xCounter = 0;
        row.some((elem) => {
          if (this.gameboard[elem].classList.contains('active-X')) {
            xCounter++;
            if (xCounter === 3) {
              this.announceWinner('Player 1');
            }
          }
          if (this.gameboard[elem].classList.contains('active-O')) {
            oCounter++;
            if (oCounter === 3) {
              this.announceWinner('Player 2');
            }
          }
        });
        // break out of loop
        if (oCounter === 3 || xCounter === 3) {
          return true;
        }
      });
    },

    bindEvents: function (currentPlayer) {
      let tieCounter = 0;
      for (let i = 0; i < this.gameboard.length; i++) {
        this.gameboard[i].addEventListener('click', (e) => {
          let box = e.target;
          if (this.isSpaceOccupied(box) === true) {
            return;
          } else {
            currentPlayer = this.turn(currentPlayer);
            box.classList.add('active-' + currentPlayer);
            tieCounter++;
            if (tieCounter === 8) {
              if (this.checkWin() === false) {
                this.announceWinner('Tie');
              }
            } else {
              this.checkWin();
            }
          }
        });
      }
    },
  };
  game.init();

  let players = {
    playerMove(currentPlayer) {
      game.bindEvents(currentPlayer);
    },
  };

  function createPlayer(value) {
    let player = Object.create(players);
    player.value = value;
    return player;
  }

  let playerOne = createPlayer('X');
  let playerTwo = createPlayer('O');
  let currentPlayer = playerTwo;
  currentPlayer.playerMove(currentPlayer.value);
})();
