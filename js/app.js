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
let x_count = 0
let o_count = 0
let ties_count = 0
let whose_turn = 0

///////////////////// CACHED ELEMENT REFERENCES /////////////////////

const squares = Array.from(document.querySelectorAll("#board div"));
const message = document.querySelector("h2");

///////////////////// EVENT LISTENERS ///////////////////////////////

window.onload = init;

document.getElementById("board").onclick = takeTurn;
document.getElementById("reset-button").onclick = init;
document.getElementById("change").onclick = change_turn;

///////////////////// FUNCTIONS /////////////////////////////////////

function init() {
  board = ["", "", "", "", "", "", "", "", ""];

  if (whose_turn == 0) {
    turn = "X";
  }
  else if (whose_turn == 1) {
    turn = "O"
  }
  win = null;

  render();
}
function change_turn() {

  if (whose_turn == 0) {
    message.textContent = "Turn: O";
    whose_turn = 1;
    turn = turn === "X" ? "O" : "X"
  }
  else if (whose_turn == 1) {
    message.textContent = "Turn: X";
    whose_turn = 0;
    turn = turn === "O" ? "X" : "O"
  }

}
function render() {

  board.forEach(function(mark, index) {
    squares[index].textContent = mark;
  });
  if (win === "X") {
    x_count = x_count + 1
  }
  else if (win === "O") {
    o_count = o_count + 1
  }
  else if (win === "T") {
    ties_count = ties_count + 1
  }
  x_wins.innerHTML = x_count
  o_wins.innerHTML = o_count
  ties.innerHTML = ties_count
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
