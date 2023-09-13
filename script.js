nameArr = ["One's", "Two's", "Three's", "Four's", "Five's", "Six's", "One pair", "Two pairs", "Three of a kind", "Four of a kind", "Full house", "Small straight", "Large straight", "Chance", "Yatzy"];

for (let e of nameArr) {
    let lbl = document.createElement("label");
    let txtField = document.createElement("textfield");
    lbl.innerHTML = e;
}

const diceImages = {
    1: "/images/1.png",
    2: "/images/2.png",
    3: "/images/3.png",
    4: "/images/4.png",
    5: "/images/5.png",
    6: "/images/6.png",
};

let turn = 0;
let rollNumber = 0;
let diceValues = [1, 1, 1, 1, 1];

function updateDiceDisplay() {
    for (let i = 0; i < 5; i++) {
        const diceElement = document.getElementById(`dice${i + 1}`);
        const diceValue = diceValues[i];

        diceElement.querySelector("img").src = diceImages[diceValue];
        diceElement.querySelector("img").alt = `Dice ${diceValue}`;
    }
}

function updateTurnDisplay() {
    const turnDisplay = document.querySelector("#top p");
    turnDisplay.textContent = `Turn: ${turn}`
}

function rollDice() {
    for (let i = 0; i < 5; i++) {
        diceValues[i] = Math.floor(Math.random() * 6) + 1;

    }
    rollNumber++;
    turn++;
    updateDiceDisplay();
    updateTurnDisplay();
}

const rollButton = document.getElementById("roll-button");
rollButton.addEventListener("click", rollDice);
updateDiceDisplay();
updateTurnDisplay();