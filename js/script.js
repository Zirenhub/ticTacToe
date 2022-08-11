let ticTacToe = (function () {
  //object
  let game = {
    //property
    gameboard: [],
    template: document.querySelector('.ttt-container'),

    //function
    init: function () {
      this.createArray();
      this.bindEvents();
    },

    createArray: function () {
      for (let i = 1; i <= 9; i++) {
        let box = document.createElement('div');
        box.classList.add('ttt-box');
        this.gameboard.push(box);
        this.template.appendChild(box);
      }
    },

    bindEvents: function () {
      for (let i = 0; i < this.gameboard.length; i++) {
        this.gameboard[i].addEventListener('click', (e) => {
          let box = e.target;
          box.classList.add('active');
        });
      }
    },
  };
  game.init();

  let players = {};
})();
