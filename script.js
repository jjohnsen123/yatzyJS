const diceImages = {
    1: "/images/1.png",
    2: "/images/2.png",
    3: "/images/3.png",
    4: "/images/4.png",
    5: "/images/5.png",
    6: "/images/6.png",
};

let turn = 0;
let rollsLeft = 3;
let diceValues = [1, 1, 1, 1, 1];
let heldDice = [false, false, false, false, false]
let totalScore = 0;
let sumTop = 0;
let sumBottom = 0;

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

function updateRollDisplay() {
    const turnDisplay = document.getElementById(`roll-count`);
    turnDisplay.textContent = `${rollsLeft}`
}

function rollDice() {
    if (rollsLeft > 0) {
        for (let i = 0; i < 5; i++) {
            if (!heldDice[i]) {
                diceValues[i] = Math.floor(Math.random() * 6) + 1;
            }
        }
        rollsLeft--;
        updateDiceDisplay();
        updateRollDisplay();
        inputArrUpdate();
        pressedOnOne = false;
    } else {
        // TODO
    }
}

function toggleHoldDie(index) {
    heldDice[index] = !heldDice[index];
    const diceElement = document.getElementById(`dice${index + 1}`);
    if (heldDice[index]) {
        diceElement.classList.add("hold");
    } else {
        diceElement.classList.remove("hold");
    }
}

for (let i = 0; i < 5; i++) {
    const diceElement = document.getElementById(`dice${i + 1}`);
    diceElement.addEventListener("click", () => {
        toggleHoldDie(i);
    });
}

function resetHoldDice() {
    heldDice = [false, false, false, false, false];
    
    for (let i = 0; i < 5; i++) {
        const diceElement = document.getElementById(`dice${i + 1}`);
        diceElement.classList.remove("hold");
    }
}

let ScoreUpdate = (score, section) => {
    if (section <= 5) {
        sumInput.value = parseInt(sumInput.value) + parseInt(score);
        checkForBonus();
    }
    totalInput.value = parseInt(totalInput.value) + parseInt(score);
}



const rollButton = document.getElementById("roll-button");
rollButton.addEventListener("click", () => {
    if (rollsLeft > 0) {
        rollDice();
    } else {
        // TODO
    }
});

updateDiceDisplay();
updateTurnDisplay();

nameArr = ["One's", "Two's", "Three's", "Four's", "Five's", "Six's", "One pair", "Two pairs", "Three of a kind", "Four of a kind", "Full house", "Small straight", "Large straight", "Chance", "Yatzy"];
let buttomDiv = document.querySelector("#bottom");

let pressedOnOne;
let getInput = (event) => {
    if (event.currentTarget.className != 'hold' && rollsLeft < 3 && event.currentTarget.value > 0 && !pressedOnOne) {
        event.currentTarget.className = 'hold';
        pressedOnOne = true;
        turn++;
        updateTurnDisplay();
        rollsLeft = 3;
        resetHoldDice();
        let number = event.currentTarget.parentNode.getAttribute('data-key-name');
        if (number <= 5) {
            ScoreUpdate(event.currentTarget.value, number);
        } else {
            ScoreUpdate(event.currentTarget.value, number);
        }
    }
}

inputArr = [];

let i = 0;
for (let e of nameArr) {
    let div = document.createElement("div");
    div.dataset.keyName = i++;
    let lbl = document.createElement("label");
    lbl.innerHTML = e;
    let input = document.createElement("input");
    input.readOnly = true;
    input.value = 0;
    input.addEventListener('click', getInput);
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
    let e = document.querySelector('[data-key-name="5"]').children;
    let n = document.querySelector('[data-key-name="14"]').children;

    // Sum
    sumLbl = document.createElement("label");
    sumLbl.innerHTML = "Sum:";
    sumLbl.id = "sumLblId";
    sumInput = document.createElement("input");
    sumInput.id = "sumInputId";
    sumInput.readOnly = true;
    sumInput.value = 0;
    document.querySelector('[data-key-name="5"]').insertBefore(sumLbl, e[1].nextSibling);
    document.querySelector('[data-key-name="5"]').insertBefore(sumInput, sumLbl.nextSibling);
    // Bonus
    bonusLbl = document.createElement("label");
    bonusLbl.innerHTML = "Bonus:";
    bonusLbl.id = "bonusLblId";
    bonusInput = document.createElement("input");
    bonusInput.id = "bonusInputId";
    bonusInput.readOnly = true;
    bonusInput.value = 0;
    document.querySelector('[data-key-name="5"]').insertBefore(bonusLbl, sumInput.nextSibling);
    document.querySelector('[data-key-name="5"]').insertBefore(bonusInput, bonusLbl.nextSibling);
    //Total
    totalLbl = document.createElement("label");
    totalLbl.innerHTML = "Total:";
    totalLbl.id = "totalLblId";
    totalInput = document.createElement("input");
    totalInput.id = "totalInputId";
    totalInput.readOnly = true;
    totalInput.value = 0;
    document.querySelector('[data-key-name="14"]').insertBefore(totalLbl, n[1].nextSibling);
    document.querySelector('[data-key-name="14"]').insertBefore(totalInput, totalLbl.nextSibling);
}

extraFieldFunc();

let inputArrUpdate = () => {
    oneToSixUpdate();
    onePairUpdate();
    twoPairUpdate();
    threeSameUpdate();
    fourSameUpdate();
    fullHouseUpdate();
    smallStraightUpdate();
    largeStraightUpdate();
    chanceUpdate();
    yatzyUpdate();
}

let gottenBonus = false;
let checkForBonus = () => {
    let sum = parseInt(sumInput.value);
    if (sum >= 63 && !gottenBonus) {
        bonusInput.value = 50;
        gottenBonus = true;
        totalInput.value = parseInt(totalInput.value) + parseInt(50);
    }
}

let calcCount = () => {
    let calcArr = [0, 0, 0, 0, 0, 0, 0];
    for (let i = 0; i < diceValues.length; i++) {
        calcArr[diceValues[i]]++;
    }
    return calcArr;
}

let oneToSixUpdate = () => {
    for (let i = 1; i <= 6; i++) {
        if (inputArr[i - 1].className != "hold") {
            let num = 0;
            for (let e of diceValues) {
                if(e == i) {
                    num += i;
                }
            }
            inputArr[i - 1].value = num;
        }
    }
}

let onePairUpdate = () => {
    if (inputArr[6].className != "hold") {
        let num = 0;
    let tempArr = calcCount();
    for (let i = 1; i < tempArr.length; i++) {
        if (tempArr[i] >= 2) {
            num = 2 * i;
        }
    }
    inputArr[6].value = num;
    }
}

let twoPairUpdate = () => {
    if (inputArr[7].className != "hold") {
        let num = 0;
    let tempArr = calcCount();
    let count = 0;
    for (let i = 1; i < tempArr.length; i++) {
        if (tempArr[i] >= 2) {
            num += 2 * i;
            count++;
        }
    }
    if (count < 2) {
        num = 0;
    }
    inputArr[7].value = num;
    }
}

let threeSameUpdate = () => {
    if (inputArr[8].className != "hold") {
        let num = 0;
        let tempArr = calcCount();
        for (let i = 1; i < tempArr.length; i++) {
            if (tempArr[i] >= 3) {
                num = 3 * i;
            }
        }
    inputArr[8].value = num;   
    }
}

let fourSameUpdate = () => {
    if (inputArr[9].className != "hold") {
        let num = 0;
        let tempArr = calcCount();
        for (let i = 1; i < tempArr.length; i++) {
            if (tempArr[i] >= 4) {
                num = 4 * i;
            }
        }
        inputArr[9].value = num;   
    }
}

let fullHouseUpdate = () => {
    if (inputArr[10].className != "hold") {
        let num = 0;
        let tempArr = calcCount();
        let threeSame, twoSame = false;
        for (let i = 1; i < tempArr.length; i++) {
            if (tempArr[i] == 3 && !threeSame) {
                num += 3 * i;
                threeSame = true;
            }
            if (tempArr[i] == 2 && !twoSame) {
                num += 2 * i;
                twoSame = true;
            }
        }
        if (!threeSame || !twoSame) {
            num = 0;
        }
        inputArr[10].value = num;   
    }
}

let smallStraightUpdate = () => {
    if (inputArr[11].className != "hold") {
        let num = 0;
        let tempArr = calcCount();
        if (tempArr[1] >= 1 && tempArr[2] >= 1 && tempArr[3] >= 1 && tempArr[4] >= 1 && tempArr[5] >= 1) {
            num = 15;
        }
        inputArr[11].value = num;   
    }
}

let largeStraightUpdate = () => {
    if (inputArr[12].className != "hold") {
        let num = 0;
        let tempArr = calcCount();
        if (tempArr[2] >= 1 && tempArr[3] >= 1 && tempArr[4] >= 1 && tempArr[5] >= 1 && tempArr[6] >= 1) {
            num = 20;
        }
        inputArr[12].value = num;   
    }
}

let chanceUpdate = () => {
    if (inputArr[13].className != "hold") {
        let num = 0;
        let tempArr = calcCount();
        for (let i = 1; i < tempArr.length; i++) {
            num += tempArr[i] * i;
        }
        inputArr[13].value = num;   
    }
}

let yatzyUpdate = () => {
    if (inputArr[14].className != "hold") {
        let num = 0;
        let tempArr = calcCount();
        for (let i = 1; i < tempArr.length; i++) {
            if (tempArr[i] >= 5) {
                num = 50;
                break;
            }
        }
        inputArr[14].value = num;   
    }
}