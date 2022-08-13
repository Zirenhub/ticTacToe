let ticTacToe = (function () {
  //object
  let game = {
    //property
    gameboard: [],
    template: document.querySelector('.ttt-container'),
    turnDisplay: document.querySelector('#playerTurn'),
    parentDiv: document.querySelector('.main-container'),

    //function
    init: function () {
      this.createArray();
      this.playerNameSelect();
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

    playerNameSet: function (playerInput) {
      let selectedPlayer = document.getElementById(playerInput.id);

      selectedPlayer.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          console.log(`name set! ${playerInput.id}`);
        }
      });
    },

    playerNameChange: function (player) {
      let playerInput = document.createElement('input');
      playerInput.setAttribute('type', 'text');
      if (player.textContent === 'Player 1') {
        player.replaceWith(playerInput);
        playerInput.setAttribute('id', 'playerOneInput');
      } else {
        player.replaceWith(playerInput);
        playerInput.setAttribute('id', 'playerTwoInput');
      }
      this.playerNameSet(playerInput);
    },

    playerNameSelect: function () {
      let playersName = document.querySelectorAll('.playerSpan');

      playersName.forEach((player) => {
        player.addEventListener('click', () =>
          this.playerNameChange(player)
        );
      });
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
      let winnerDiv = document.createElement('div');
      winnerDiv.classList.add('winner-display');
      let winnerText = document.createElement('p');
      winnerDiv.appendChild(winnerText);
      if (winner === 'Player 1') {
        winnerDiv.style.color = '#ed331a';
        winnerText.textContent = 'Player 1 Wins!';
      } else if (winner === 'Player 2') {
        winnerDiv.style.color = '#6868ff';
        winnerText.textContent = 'Player 2 Wins!';
      } else {
        winnerText.textContent = "It's a tie!";
        winnerDiv.style.color = '#75975e';
      }
      this.parentDiv.appendChild(winnerDiv);
    },

    restartButton: function () {
      let buttonDiv = document.createElement('div');
      buttonDiv.classList.add('button-div');
      let button = document.createElement('button');
      button.innerHTML = 'Restart ?';
      button.classList.add('restart-button');
      button.setAttribute('onclick', 'window.location.reload();');
      buttonDiv.appendChild(button);
      this.parentDiv.appendChild(buttonDiv);
    },

    checkWin: function () {
      const combos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 4, 8], //24
        [2, 4, 6],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
      ];
      let totalCounter = 0;
      combos.some((row) => {
        let oCounter = 0;
        let xCounter = 0;
        row.some((elem) => {
          if (this.gameboard[elem].classList.contains('active-X')) {
            totalCounter++;
            xCounter++;
            if (xCounter === 3) {
              this.announceWinner('Player 1');
            }
          }
          if (this.gameboard[elem].classList.contains('active-O')) {
            totalCounter++;
            oCounter++;
            if (oCounter === 3) {
              this.announceWinner('Player 2');
            }
          }
        });
        // break out of loop
        if (oCounter === 3 || xCounter === 3) {
          this.restartButton();
          return true;
        } else if (totalCounter === 24) {
          //if every element has been accounted for and there is no winner
          this.announceWinner('Tie');
          this.restartButton();
        }
      });
    },

    bindEvents: function (currentPlayer) {
      for (let i = 0; i < this.gameboard.length; i++) {
        this.gameboard[i].addEventListener('click', (e) => {
          let box = e.target;
          if (this.isSpaceOccupied(box) === true) {
            return;
          } else {
            currentPlayer = this.turn(currentPlayer);
            box.classList.add('active-' + currentPlayer);
            this.checkWin();
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
