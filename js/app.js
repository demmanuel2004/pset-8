///////////////////// CONSTANTS /////////////////////////////////////

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

///////////////////// APP STATE (VARIABLES) /////////////////////////

let board;
let turn;
let win;

///////////////////// CACHED ELEMENT REFERENCES /////////////////////

const squares = Array.from(document.querySelectorAll("#board div"));
const message = document.querySelector("h2");

///////////////////// EVENT LISTENERS ///////////////////////////////

window.onload = init;

document.getElementById("board").onclick = takeTurn;
document.getElementById("reset-button").onclick = init;

///////////////////// FUNCTIONS /////////////////////////////////////


function init() {

  board = ["", "", "", "", "", "", "", "", ""];
  turn = "X";
  win = null;

  render();
}

function render() {

  board.forEach(function(mark, index) {
    squares[index].textContent = mark;
  });

  function computerTurn() {
      var strategies = [];
      if (option('random')) strategies.push(strategyRandom);
      for (var i=0; i<strategies.length; i++) {
        var turn = strategies[i]();
        if (!turn) continue;
        val(turn[0], turn[1], computer);
        break;
      }
    }


    function strategyRandom() {

      var blanks = [];
      for (var x=0; x<3; x++) {
        for (var y=0; y<3; y++) {
          if (val(x,y)=='') blanks.push([x,y]);
        }
      }

      if (blanks.length>0) {
        var r = Math.floor((Math.random()*blanks.length));
        return blanks[r];
      }
      else return false;
    }


  message.textContent =
    win === "T" ? "It's a tie!" : win ? `${win} wins!` : `Turn: ${turn}`;
}

function takeTurn(e) {
  if (!win) {
    let index = squares.findIndex(function(square) {
      return square === e.target;
    });



    if (board[index] === "") {
      board[index] = turn;
      turn = turn === "X" ? "O" : "X";
      win = getWinner();

      render();
    }
  }
}


function getWinner() {
  let winner = null;


  winningConditions.forEach(function(condition, index) {
    if (
      board[condition[0]] &&
      board[condition[0]] === board[condition[1]] &&
      board[condition[1]] === board[condition[2]]
    ) {

      winner = board[condition[0]];
    }
  });


  return winner ? winner : board.includes("") ? null : "T";

}
