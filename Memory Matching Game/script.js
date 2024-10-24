const cardImages = ['🍎', '🍌', '🍇', '🍉', '🍓', '🍍', '🍒', '🍊'];
const cards = [...cardImages, ...cardImages]; // Duplicate for pairs
let flippedCards = [];
let matchedCards = 0;
let moves = 0;
let timer;
let time = 0;

const gameBoard = document.getElementById('gameBoard');
const movesDisplay = document.getElementById('moves');
const timeDisplay = document.getElementById('time');
const restartButton = document.getElementById('restartButton');

function shuffleCards() {
    cards.sort(() => Math.random() - 0.5);
}

function createCardElement(value) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.value = value;
    card.innerText = '?';
    card.addEventListener('click', flipCard);
    return card;
}

function flipCard() {
    if (flippedCards.length < 2 && !this.classList.contains('flipped')) {
        this.classList.add('flipped');
        this.innerText = this.dataset.value;
        flippedCards.push(this);
        
        if (flippedCards.length === 2) {
            moves++;
            movesDisplay.innerText = moves;
            checkMatch();
        }
    }
}

function checkMatch() {
    const [firstCard, secondCard] = flippedCards;

    if (firstCard.dataset.value === secondCard.dataset.value) {
        matchedCards++;
        flippedCards = [];
        
        if (matchedCards === cardImages.length) {
            clearInterval(timer);
            alert(`Congratulations! You won in ${moves} moves and ${time} seconds!`);
        }
    } else {
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            firstCard.innerText = '?';
            secondCard.classList.remove('flipped');
            secondCard.innerText = '?';
            flippedCards = [];
        }, 1000);
    }
}

function startGame() {
    shuffleCards();
    gameBoard.innerHTML = '';
    moves = 0;
    matchedCards = 0;
    time = 0;
    movesDisplay.innerText = moves;
    timeDisplay.innerText = time;
    
    cards.forEach(cardValue => {
        const card = createCardElement(cardValue);
        gameBoard.appendChild(card);
    });

    timer = setInterval(() => {
        time++;
        timeDisplay.innerText = time;
    }, 1000);
}

restartButton.addEventListener('click', startGame);
startGame();
