const container = document.querySelector(".buttons-container");

for (let index = 0; index < 9; index++) {
  const Btn = document.createElement("button");
  Btn.classList.add("btn");
  container.appendChild(Btn);
}

const overlay = document.querySelector(".overlay");
const resultText = document.querySelector(".result-text");
const popupReset = document.querySelector(".popup-reset");

const showResult = (message) => {
  resultText.textContent = message;
  overlay.style.display = "flex";
};

const correctCases = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [3, 4, 5],
  [6, 7, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
];

let player1 = [];
let player2 = [];

const disableAllBtns = () => {
  return btns.forEach((btn) => (btn.disabled = true));
};

popupReset.addEventListener("click", () => {
  overlay.style.display = "none";
  // reset();
});

const checkWinner = (player) => {
  for (let i = 0; i < correctCases.length; i++) {
    if (correctCases[i].every((index) => player.includes(index))) {
      return true;
    }
  }
  return false;
};

const btns = document.querySelectorAll(".btn");

let turn = true;

btns.forEach((btn, ndx) =>
  btn.addEventListener("click", (e) => {
    if (turn) {
      btn.textContent = "X";
      btn.classList.add("red");
      player1.push(ndx);
      btn.disabled = true;

      if (checkWinner(player1)) {
        showResult("Player 1 won 🎉");

        disableAllBtns();
        return;
      }
    } else {
      btn.textContent = "O";
      btn.classList.add("green");
      player2.push(ndx);
      btn.disabled = true;

      if (checkWinner(player2)) {
        showResult("Player 2 won 🎉");

        disableAllBtns();
        return;
      }
    }
    turn = !turn;

    if (player1.length + player2.length === 9) {
      showResult("draw 🤜🏼🤛🏼");
    }
  })
);

function reset() {
  btns.forEach((el) => {
    el.classList.remove("green");
    el.classList.remove("red");

    el.disabled = false;
    el.textContent = "";

    player1 = [];
    player2 = [];
    turn = true;
  });
}

document.querySelector(".reset").addEventListener("click", () => {
  reset();
});
