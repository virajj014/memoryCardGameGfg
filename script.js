const board = document.getElementById('game-board');
const statusText = document.getElementById('status');
const restartButton = document.getElementById('restart-button');
restartButton.addEventListener('click', restartGame);

const symbols = ['🍎', '🍌', '🍇', '🍒', '🍓', '🍎', '🍌', '🍇', '🍒'];
let shuffledSymbols = symbols.sort(() => Math.random() - 0.5);

// console.log(shuffledSymbols);


let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchedPairs = 0;


shuffledSymbols.forEach((symbol) => {
    const card = document.createElement('div');
    card.classList.add('card');

    card.innerHTML = `
    <div class="card-inner">
                <div class="card-front"></div>
                <div class="card-back">${symbol}</div>
            </div>
    `

    card.addEventListener("click", () => flipCard(card));
    board.appendChild(card);
})

function flipCard(card) {
    if (lockBoard || card == firstCard) return;

    card.classList.add('flip');

    if (!firstCard) {
        firstCard = card;
    }
    else {
        secondCard = card;
        checkMatch();
    }
}

function checkMatch() {
    const isMatch = firstCard.querySelector('.card-back').textContent ===
        secondCard.querySelector('.card-back').textContent;


    if (isMatch) {
        disableCards();
        matchedPairs++;


        let maxScore = parseInt(symbols.length / 2);
        if (maxScore == matchedPairs) {
            statusText.textContent == 'You found all pairs! 🎉';
            restartButton.style.display = 'inline-block'
        }

    }

    else {
        unflipCards();
    }


}

function disableCards() {
    firstCard.removeEventListener("click", () => flipCard(card));
    secondCard.removeEventListener("click", () => flipCard(card));
    resetBoard();
}
function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 1000)
}
function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}


function restartGame() {
    board.innerHTML = '';
    restartButton.style.display = 'none';


    shuffledSymbols = symbols.sort(() => Math.random() - 0.5);

    firstCard = null;
    secondCard = null;
    lockBoard = false;
    matchedPairs = 0;
    statusText.textContent == 'Find all matching pairs!';

    shuffledSymbols.forEach((symbol) => {
        const card = document.createElement('div');
        card.classList.add('card');

        card.innerHTML = `
    <div class="card-inner">
                <div class="card-front"></div>
                <div class="card-back">${symbol}</div>
            </div>
    `

        card.addEventListener("click", () => flipCard(card));
        board.appendChild(card);
    })
}