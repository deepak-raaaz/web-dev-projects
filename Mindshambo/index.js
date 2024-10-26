const rockButtonEl = document.getElementById("rockButton");
const paperButtonEl = document.getElementById("paperButton");
const scissorsButtonEl = document.getElementById("scissorsButton");

const messageEl = document.getElementById("message");
const botAnswerEl = document.getElementById("botAnswer");

const restartButtonEl = document.getElementById("restartButton");

const currentScoreEl = document.getElementById("currentScore");
const highScoreEl = document.getElementById("highScore");
const totalCorrectsEl = document.getElementById("totalCorrects");

let currScore = 0;
let highScore = 0;
let totalCorrects = 0;

let currentCategory = "";
let currentResponse = "";

let playing = true;

function generateNumber() {
    return Math.floor(Math.random() * 100) + 1;
}

async function generateWord() {
    let response = await fetch("https://random-word-api.herokuapp.com/word");
    let data = await response.json();
    return data[0];
}

function generateColor() {
    let colors = ["red", "green", "blue"];
    return colors[Math.floor(Math.random() * colors.length)];
}

function handleNumberCondition(number) {
    console.log(number);
    switch (true) {
        case Number(number) % 2 === 0:
            return "rock";
        case Number(number) % 3 === 0:
            return "paper";
        default:
            return "scissors";
    }
}

function handleLengthCondition(word) {
    const length = word.length;
    switch (true) {
        case length > 0 && length <= 5:
            return "rock";
        case length > 5 && length <= 10:
            return "paper";
        case length > 10:
            return "scissors";
    }
}

function handleColorCondition(color) {
    switch (true) {
        case color === "red":
            return "rock";
        case color === "green":
            return "paper";
        case color === "blue":
            return "scissors";
    }
}

const categories = [
    {
        name: "number",
        answer: generateNumber,
        condition: (number) => handleNumberCondition(number),
    },
    {
        name: "length",
        answer: generateWord,
        condition: (word) => handleLengthCondition(word),
    },
    {
        name: "color",
        answer: generateColor,
        condition: (color) => handleColorCondition(color),
    },
];

function startMatch() {
    currScore = 0;
    startRound();
}

async function startRound() {
    messageEl.textContent = "The bot is thinking...";

    currentScoreEl.textContent = currScore;
    totalCorrectsEl.textContent = totalCorrects;

    const category = categories[Math.floor(Math.random() * categories.length)];

    currentCategory = category.name;
    currentResponse = await category.answer();

    messageEl.textContent = currentResponse;

    botAnswerEl.textContent = "???";

    playing = true;
}

startRound();

rockButtonEl.addEventListener("click", () => handleGuess("rock"));
paperButtonEl.addEventListener("click", () => handleGuess("paper"));
scissorsButtonEl.addEventListener("click", () => handleGuess("scissors"));
restartButtonEl.addEventListener("click", () => startMatch());

function handleWin(botAnswer) {
    playing = false;
    document.getElementsByTagName("body")[0].classList.add("win");
    setTimeout(() => {
        document.getElementsByTagName("body")[0].classList.remove("win");
    }, 500);
    botAnswerEl.textContent = `The bot chose: ${
        botAnswer[0].toUpperCase() + botAnswer.slice(1)
    }`;
    currScore++;
    currentScoreEl.textContent = currScore;

    totalCorrects++;
    totalCorrectsEl.textContent = totalCorrects;

    messageEl.textContent = "You got it!";
    setTimeout(() => {
        messageEl.textContent = "The bot is thinking...";
    }, 3000);

    setTimeout(() => {
        startRound();
    }, 3000);
}

function handleLoss(botAnswer) {
    playing = false;
    document.getElementsByTagName("body")[0].classList.add("lose");
    setTimeout(() => {
        document.getElementsByTagName("body")[0].classList.remove("lose");
    }, 500);
    botAnswerEl.textContent = `The bot chose: ${
        botAnswer[0].toUpperCase() + botAnswer.slice(1)
    }`;
    messageEl.textContent = "Aw man... ( You lose :( )";
    if (currScore > highScore) {
        highScore = currScore;
        highScoreEl.textContent = highScore;
    }
}

function handleDraw(botAnswer) {
    playing = false;
    document.getElementsByTagName("body")[0].classList.add("draw");
    setTimeout(() => {
        document.getElementsByTagName("body")[0].classList.remove("draw");
    }, 500);
    botAnswerEl.textContent = `The bot chose: ${
        botAnswer[0].toUpperCase() + botAnswer.slice(1)
    }`;
    messageEl.textContent = "Draw! The game continues!";
    setTimeout(() => {
        messageEl.textContent = "The bot is thinking...";
    }, 3000);

    setTimeout(() => {
        startRound();
    }, 3000);
}

function handleAnswer(playerAnswer, botAnswer) {
    if (playerAnswer === "rock") {
        if (botAnswer === "paper") {
            handleLoss(botAnswer);
        } else if (botAnswer === "scissors") {
            handleWin(botAnswer);
        } else {
            handleDraw(botAnswer);
        }
    } else if (playerAnswer === "paper") {
        if (botAnswer === "scissors") {
            handleLoss(botAnswer);
        } else if (botAnswer === "rock") {
            handleWin(botAnswer);
        } else {
            handleDraw(botAnswer);
        }
    } else if (playerAnswer === "scissors") {
        if (botAnswer === "rock") {
            handleLoss(botAnswer);
        } else if (botAnswer === "paper") {
            handleWin(botAnswer);
        } else {
            handleDraw(botAnswer);
        }
    }
}

function handleGuess(currAnswer) {
    if (playing) {
        const botAnswer =
            categories[
                categories.findIndex(
                    (category) => category.name === currentCategory
                )
            ].condition(currentResponse);
        handleAnswer(currAnswer, botAnswer);
    }
}
