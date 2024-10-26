"use strict";

// Player 1
const player1Container = document.querySelector(".player1");
const randomNumber1El = document.getElementById("randomNumber1");
const number1Input = document.getElementById("number1");
const guess1Button = document.getElementById("guess1");
const statusText1 = document.getElementById("statusText1");
const guessesText1 = document.getElementById("guessesText1");

// Player 2
const player2Container = document.querySelector(".player2");
const randomNumber2El = document.getElementById("randomNumber2");
const number2Input = document.getElementById("number2");
const guess2Button = document.getElementById("guess2");
const statusText2 = document.getElementById("statusText2");
const guessesText2 = document.getElementById("guessesText2");

const restartButton = document.getElementById("restartButton");

// Range Setting
const setRange = document.getElementById("setRange");
const modalEl = document.querySelector(".modal");
const overlayEl = document.querySelector(".overlay");

const rangeMin = document.getElementById("rangeMin");
const rangeMax = document.getElementById("rangeMax");
const rangeSubmit = document.getElementById("rangeSubmit");

const minEl = document.getElementById("min");
const maxEl = document.getElementById("max");

const closeModalEl = document.querySelector(".close-modal");
// Game Logic

let randomNumbers = [0, 0];
let guesses = [0, 0];

let currentPlayer = 0;

let playing = true;

let min = 1;
let max = 100;

restartButton.addEventListener("click", startGame);

function startGame() {
  randomNumbers[0] = generateRandomNumber();
  randomNumbers[1] = generateRandomNumber();

  guesses[0] = 0;
  guesses[1] = 0;

  number1Input.value = "";
  number2Input.value = "";

  statusText1.textContent = "?";
  statusText2.textContent = "?";

  guessesText1.textContent = 0;
  guessesText2.textContent = 0;

  randomNumber1El.textContent = "?";
  randomNumber2El.textContent = "?";

  player2Container.classList.add("inactive");
  player1Container.classList.remove("inactive");

  player2Container.classList.remove("winner");
  player1Container.classList.remove("winner");

  randomNumber1El.style.padding = "0.1rem 5rem";
  randomNumber2El.style.padding = "0.1rem 5rem";

  minEl.textContent = min;
  maxEl.textContent = max;

  playing = true;
  currentPlayer = 0;
}

startGame();

function generateRandomNumber() {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function switchPlayer() {
  player1Container.classList.toggle("inactive");
  player2Container.classList.toggle("inactive");
}
function handleWin(container, status) {
  playing = false;
  container.classList.add("winner");
  status.textContent = "You got it!";
  currentPlayer === 0
    ? (statusText2.textContent = "Yikes!")
    : (statusText1.textContent = "Yikes!");

  currentPlayer === 0
    ? (randomNumber1El.style.padding = "0.1rem 10rem")
    : (randomNumber2El.style.padding = "0.1rem 10rem");
  randomNumber1El.textContent = randomNumbers[0];
  randomNumber2El.textContent = randomNumbers[1];
}
function handleGuess(container, input, button, status, guessText) {
  if (playing) {
    const guess = Number(input.value);
    if (!guess || guess < min || guess > max) {
      button.style.background = "red";
      setTimeout(() => {
        button.style.background = "white";
      }, 500);
      return;
    }
    guesses[currentPlayer]++;
    guessText.textContent = guesses[currentPlayer];
    if (guess === randomNumbers[currentPlayer]) {
      handleWin(container, status);
      return;
    } else {
      if (guess > randomNumbers[currentPlayer]) {
        status.textContent = "Too High!";
        container.classList.add("tooHigh");
        setTimeout(() => {
          container.classList.remove("tooHigh");
        }, 1000);
      } else if (guess < randomNumbers[currentPlayer]) {
        status.textContent = "Too Low!";
        container.classList.add("tooLow");
        setTimeout(() => {
          container.classList.remove("tooLow");
        }, 1000);
      }
      currentPlayer = currentPlayer === 0 ? 1 : 0;
      switchPlayer();
    }
  }
}

guess1Button.addEventListener("click", function () {
  handleGuess(
    player1Container,
    number1Input,
    guess1Button,
    statusText1,
    guessesText1
  );
});

guess2Button.addEventListener("click", function () {
  handleGuess(
    player2Container,
    number2Input,
    guess2Button,
    statusText2,
    guessesText2
  );
});

// Handle Modal

rangeSubmit.addEventListener("click", function (e) {
  e.preventDefault();
  const minValue = Number(rangeMin.value);
  const maxValue = Number(rangeMax.value);
  if (minValue && maxValue && minValue < maxValue && maxValue > minValue) {
    min = minValue;
    max = maxValue;
    startGame();
    closeModal();
  }
});

setRange.addEventListener("click", openModal);
closeModalEl.addEventListener("click", closeModal);

function openModal() {
  modalEl.classList.remove("hidden");
  overlayEl.classList.remove("hidden");
}

function closeModal() {
  modalEl.classList.add("hidden");
  overlayEl.classList.add("hidden");
}
