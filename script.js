"use strict";

//roll dice button:
//     1. Generates random number (1-6), displays that number with the corresponding dice image.
//     2. If the dice is 1, it resets the current score to 0 and switches the active player.
//     3. If not, it adds the score to the current score of the active player.

//His solution

//Selecting elements
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.querySelector("#score--0");
//This is a bit faster, could be useful when working on big projects.
const score1El = document.getElementById("score--1");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

//first, declare variables.
let total, scores, currentScore, activePlayer, playing;

//starting conditions
const initRound = function () {
  //then, give the variables values...
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add("hidden");
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
};

const initGame = function () {
  initRound();
  total0El.textContent = 0;
  total1El.textContent = 0;
};

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

initRound();

//Rolling dice functionality
btnRoll.addEventListener("click", function () {
  if (playing) {
    //Generate a random dice roll
    let dice = Math.trunc(Math.random() * 6) + 1;
    //Display dice
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`;
    //Check for rolled 1
    if (dice !== 1) {
      //Add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //Switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    // add current score to active player's score
    scores[activePlayer] += currentScore;
    //scores[1] = scores[1] + currentScore
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // Check if player's score is >= 100
    if (scores[activePlayer] >= 100) {
      //Finish the game
      playing = false;
      diceEl.classList.add("hidden");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
      currentScore = 0;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      //Add 1 to the current player's total.
      document.getElementById(`total--${activePlayer}`).textContent =
        Number(document.getElementById(`total--${activePlayer}`).textContent) +
        1;
    } else {
      // Switch to next player.
      switchPlayer();
    }
  }
});

btnNew.addEventListener("click", initGame);

//My additions
const names = document.querySelector(".playerNames");
const namesBckgrnd = document.querySelector(".playerNames-background");
const namesClose = document.querySelector(".playerNames-close");
const rules = document.querySelector(".rules");
const rulesBckgrnd = document.querySelector(".rules-background");
const rulesClose = document.querySelector(".rules-close");
const btnRules = document.querySelector(".btn--rules");
const namesBtn = document.querySelector(".player-name-btn");
const btnNames = document.querySelector(".btn--names");
const input0 = document.getElementById("player-name-input--0");
const input1 = document.getElementById("player-name-input--1");
const name0 = document.getElementById("name--0");
const name1 = document.getElementById("name--1");
const btnNewRound = document.querySelector(".btn--round");
const total0El = document.getElementById("total--0");
const total1El = document.getElementById("total--1");

//opening and closing the names Modal
const openNames = function () {
  names.classList.remove("hidden");
  namesBckgrnd.classList.remove("hidden");
};

const closeNames = function () {
  names.classList.add("hidden");
  namesBckgrnd.classList.add("hidden");
};

const openRules = function () {
  rules.classList.remove("hidden");
  rulesBckgrnd.classList.remove("hidden");
};

const closeRules = function () {
  rules.classList.add("hidden");
  rulesBckgrnd.classList.add("hidden");
};

btnNames.addEventListener("click", openNames);
namesClose.addEventListener("click", closeNames);
namesBckgrnd.addEventListener("click", closeNames);
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !names.classList.contains("hidden")) {
    closeNames();
  }
});

btnRules.addEventListener("click", openRules);
rulesClose.addEventListener("click", closeRules);
rulesBckgrnd.addEventListener("click", closeRules);
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !rules.classList.contains("hidden")) {
    closeRules();
  }
});

//changing the names.
namesBtn.addEventListener("click", function () {
  if (input0.value.trim() === "" || input1.value.trim() === "") {
    closeNames();
    return;
  }

  name0.textContent = input0.value;
  name1.textContent = input1.value;
  closeNames();
});

document.addEventListener("keydown", function (e) {
  if (e.key === "Enter" && !names.classList.contains("hidden")) {
    if (input0.value.trim() === "" || input1.value.trim() === "") {
      closeNames();
      return;
    }

    name0.textContent = input0.value;
    name1.textContent = input1.value;
    closeNames();
  }
});

btnNewRound.addEventListener("click", initRound);
