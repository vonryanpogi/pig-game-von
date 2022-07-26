'use strict';

// Selected Elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const score0 = document.querySelector('#score--0');
const score1 = document.querySelector('#score--1');

const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

const h1 = document.querySelector('.h1Class');

let score, currentScore, activePlayer, playing;

// Starting Conditions
const init = function () {
  score = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  // Reset all the numbers
  score0.textContent = currentScore;
  score1.textContent = currentScore;
  current0El.textContent = currentScore;
  current1El.textContent = currentScore;

  // Reset all the styles
  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  player0El.classList.remove('player--losser');
  player1El.classList.remove('player--losser');
  h1.textContent = 'Race to 100 🏆';
};

init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;

  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//Rolling dice functionality
btnRoll.addEventListener('click', function () {
  // Generating a random dice roll
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;

    // Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // Check for rolled 1: if true, switch to next player

    if (dice != 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  // Add current score to active player's score
  if (playing) {
    score[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];

    // Check if the score is >= 100
    if (score[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add('hidden');
      // Finish the game
      h1.textContent = `Player ${activePlayer + 1} Wins 🎉`;

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      activePlayer = activePlayer === 0 ? 1 : 0;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--losser');
    } else {
      // Switch to the next player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', function () {
  init();
});

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    init();
  }
});
