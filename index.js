'use strict';

let scores = [0, 0], currentScore = 0, activePlayer = 0;
const MAX_SCORE = 100;

const player1 = document.querySelector('.player0');
const player2 = document.querySelector('.player1');
const dice = document.querySelector('.dice');
const diceText = document.querySelector('.dice>span');
const totalScore1 = document.querySelector('.player0 .total-score');
const totalScore2 = document.querySelector('.player1 .total-score');
const currentScore1 = document.querySelector('.player0 .current-score');
const currentScore2 = document.querySelector('.player1 .current-score');
const rollDiceBtn = document.querySelector('.roll-dice');
const holdBtn = document.querySelector('.hold');
const newGameBtn = document.querySelector('.new-game');

holdBtn.addEventListener('click', function () {
    calculateTotalScore();
    updateTotalScores();
    currentScore = 0;
    updateCurrentScore();
    dice.classList.add('hidden');
    if (!checkWinner()) {
        flipActivePlayer();
    }
});

newGameBtn.addEventListener('click', function () {
    activePlayer = 0;
    scores = [0, 0];
    currentScore = 0;
    updateTotalScores();
    hideShowRollHoldButtons(true);
    dice.classList.add('hidden');
    player1.classList.remove('player-winner');
    player2.classList.remove('player-winner');
    player1.classList.add('player-active');
    player2.classList.remove('player-active');
});

rollDiceBtn.addEventListener('click', function () {
    let diceNumber = Math.trunc(Math.random() * 6) + 1;
    diceText.innerHTML = `&#x268${diceNumber - 1};`;
    dice.classList.remove('hidden');
    calculateAndUpdatePlayerCurrentScore(diceNumber);
    if (diceNumber === 1) {
        flipActivePlayer();
    }
});

function flipActivePlayer() {
    let passivePlayer = activePlayer === 0 ? 1 : 0;
    player1.classList.toggle('player-active');
    player2.classList.toggle('player-active');
    activePlayer = passivePlayer;
}

function calculateAndUpdatePlayerCurrentScore(score) {
    currentScore = score === 1 ? 0 : (currentScore + score);
    updateCurrentScore();
}

function calculateTotalScore() {
    scores[activePlayer] += currentScore;
}

function updateTotalScores() {
    totalScore1.textContent = scores[0];
    totalScore2.textContent = scores[1];
}

function updateCurrentScore() {
    if (activePlayer === 0) {
        currentScore1.textContent = currentScore;
    } else {
        currentScore2.textContent = currentScore;
    }
}

function checkWinner() {
    let winnerExists = scores[activePlayer] >= MAX_SCORE;
    if (winnerExists) {
        hideShowRollHoldButtons(false);
        document.querySelector(`.player${activePlayer}`).classList.add('player-winner');
    }
    return winnerExists;
}

function hideShowRollHoldButtons(visible) {
    if (visible) {
        rollDiceBtn.classList.remove('hidden');
        holdBtn.classList.remove('hidden');
    } else {
        rollDiceBtn.classList.add('hidden');
        holdBtn.classList.add('hidden');
    }
}
