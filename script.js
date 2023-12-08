const words = ['Apple', 'Banana', 'Orange', 'Grapes', 'Mango', 'Pineapple'];
let gameBoard = document.getElementById('game-board');
let scoreDisplay = document.getElementById('score');
let resetButton = document.getElementById('reset-button');
let score = 0;

function initializeGame() {
    gameBoard.innerHTML = '';
    score = 0;
    updateScore();

    const allCards = [...words, ...words];
    allCards.sort(() => Math.random() - 0.5);

    allCards.forEach((word, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.index = index;
        card.textContent = word;
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
    });
}

function flipCard() {
    const clickedCard = this;

    if (clickedCard.classList.contains('matched') || clickedCard.classList.contains('flipped')) {
        return;
    }

    clickedCard.classList.add('flipped');

    const flippedCards = document.querySelectorAll('.flipped');
    if (flippedCards.length === 2) {
        setTimeout(checkForMatch, 500);
    }
}

function checkForMatch() {
    const flippedCards = document.querySelectorAll('.flipped');

    if (flippedCards.length === 2) {
        const [card1, card2] = flippedCards;

        if (card1.textContent === card2.textContent) {
            card1.classList.add('matched');
            card2.classList.add('matched');
            score += 10;
        } else {
            setTimeout(() => {
                card1.classList.remove('flipped');
                card2.classList.remove('flipped');
            }, 500);
        }

        updateScore();

        const matchedCards = document.querySelectorAll('.matched');
        if (matchedCards.length === words.length * 2) {
            announceVictory();
        }
    }

    flippedCards.forEach(card => card.classList.remove('flipped'));
}

function announceVictory() {
    alert(`🚀Congratulations! You completed the game with a score of ${score}. You're better at vocabulary!🚀`);
}

function updateScore() {
    scoreDisplay.textContent = score;
}

resetButton.addEventListener('click', initializeGame);

initializeGame();
