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
    inputArrUpdate();
}

const rollButton = document.getElementById("roll-button");
rollButton.addEventListener("click", rollDice);
updateDiceDisplay();
updateTurnDisplay();

nameArr = ["One's", "Two's", "Three's", "Four's", "Five's", "Six's", "One pair", "Two pairs", "Three of a kind", "Four of a kind", "Full house", "Small straight", "Large straight", "Chance", "Yatzy"];
let buttomDiv = document.querySelector("#buttom");

inputArr = [];

let i = 0;
for (let e of nameArr) {
    let div = document.createElement("div");
    div.id = "div" + i++;
    let lbl = document.createElement("label");
    lbl.innerHTML = e;
    let input = document.createElement("input");
    input.disabled = true;
    inputArr.push(input);
    buttomDiv.append(div);
    div.append(lbl);
    div.append(input);
}

let sumLbl;
let sumInput;
let bonusLbl;
let bonusInput;
let totalLbl;
let totalInput;

let extraFieldFunc = () => {
    let e = document.querySelector("#div5").children;
    let n = document.querySelector("#div14").children;

    // Sum
    sumLbl = document.createElement("label");
    sumLbl.innerHTML = "Sum:";
    sumLbl.id = "sumLblId";
    sumInput = document.createElement("input");
    sumInput.id = "sumInputId";
    sumInput.disabled = true;
    document.querySelector("#div5").insertBefore(sumLbl, e[1].nextSibling);
    document.querySelector("#div5").insertBefore(sumInput, sumLbl.nextSibling);
    // Bonus
    bonusLbl = document.createElement("label");
    bonusLbl.innerHTML = "Bonus:";
    bonusLbl.id = "bonusLblId";
    bonusInput = document.createElement("input");
    bonusInput.id = "bonusInputId";
    bonusInput.disabled = true;
    document.querySelector("#div5").insertBefore(bonusLbl, sumInput.nextSibling);
    document.querySelector("#div5").insertBefore(bonusInput, bonusLbl.nextSibling);
    //Total
    totalLbl = document.createElement("label");
    totalLbl.innerHTML = "Total:";
    totalLbl.id = "totalLblId";
    totalInput = document.createElement("input");
    totalInput.id = "totalInputId";
    totalInput.disabled = true;
    document.querySelector("#div14").insertBefore(totalLbl, n[1].nextSibling);
    document.querySelector("#div14").insertBefore(totalInput, totalLbl.nextSibling);
}

extraFieldFunc();

let inputArrUpdate = () => {
    calcCount();
    oneToSixUpdate();
    onePairUpdate();
}

let calcArr = [];
let calcCount = () => {
    calcArr = [];
    for (let i = 0; i < diceValues.length; i++) {
        calcArr[diceValues[i]]++;
    }
}

let oneToSixUpdate = () => {
    for (let i = 1; i <= 6; i++) {
    let num = 0;
    for (let e of diceValues) {
        if(e == i) {
            num += i;
        }
    }
    inputArr[i-1].value = num;
    }
}

let onePairUpdate = () => {
    let num = 0;
    for (let i = 1; i < calcArr.length; i++) {
        if (calcArr[i] >= 2) {
            num = 2 * i;
        }
    }
    inputArr[6].value = num;
}