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
      if (currentPlayer === playerOne) {
        this.turnDisplay.textContent = currentPlayer.value;
        this.turnDisplay.style.color = '#ff5454';
        currentPlayer = playerTwo;
        return currentPlayer;
      } else if (currentPlayer === playerTwo) {
        this.turnDisplay.textContent = currentPlayer.value;
        this.turnDisplay.style.color = '#6868ff';
        currentPlayer = playerOne;
        return currentPlayer;
      }
    },

    playerNameSet: function (playerInput) {
      let selectedPlayer = document.getElementById(playerInput.id);

      selectedPlayer.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          console.log(`name set! ${selectedPlayer.id}`);
          let newName = selectedPlayer.value;
          if (selectedPlayer.id === 'playerOne') {
            playerOne.name = newName;
          } else if (selectedPlayer.id === 'playerTwo') {
            playerTwo.name = newName;
          }
          let restoreSpan = document.createElement('span');
          restoreSpan.classList.add('player-span');
          restoreSpan.setAttribute('id', selectedPlayer.id);
          restoreSpan.textContent = newName;
          selectedPlayer.replaceWith(restoreSpan);
          this.playerNameSelect();
        }
      });
    },

    playerNameChange: function (player) {
      let selectedPlayer = document.getElementById(player.id);
      let playerInput = document.createElement('input');
      playerInput.setAttribute('type', 'text');
      if (selectedPlayer.id === 'playerOne') {
        playerInput.setAttribute('id', 'playerOne');
      } else if (selectedPlayer.id === 'playerTwo') {
        playerInput.setAttribute('id', 'playerTwo');
      }
      selectedPlayer.replaceWith(playerInput);
      document.querySelector(`#${playerInput.id}`).focus();
      this.playerNameSet(playerInput);
    },

    playerNameSelect: function () {
      let playersName = document.querySelectorAll('.player-span');

      playersName.forEach((player) => {
        player.addEventListener('click', () => {
          this.playerNameChange(player);
        });
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

    announceWinner: function (currentPlayer) {
      let winnerDiv = document.createElement('div');
      winnerDiv.classList.add('winner-display');
      let winnerText = document.createElement('p');
      winnerDiv.appendChild(winnerText);
      if (currentPlayer === playerOne) {
        winnerDiv.style.color = '#ed331a';
        winnerText.textContent = `${currentPlayer.name} wins!`;
      } else if (currentPlayer === playerTwo) {
        winnerDiv.style.color = '#6868ff';
        winnerText.textContent = `${currentPlayer.name} wins!`;
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

    checkWin: function (currentPlayer) {
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
              this.announceWinner(currentPlayer);
            }
          }
          if (this.gameboard[elem].classList.contains('active-O')) {
            totalCounter++;
            oCounter++;
            if (oCounter === 3) {
              this.announceWinner(currentPlayer);
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
            box.classList.add('active-' + currentPlayer.value);
            this.checkWin(currentPlayer);
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

  function createPlayer(value, name) {
    let player = Object.create(players);
    player.value = value;
    player.name = name;
    return player;
  }

  let playerOne = createPlayer('X', 'Player 1');
  let playerTwo = createPlayer('O', 'Player 2');
  let currentPlayer = playerTwo;
  currentPlayer.playerMove(currentPlayer);
})();
