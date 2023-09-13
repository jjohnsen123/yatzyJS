nameArr = ["One's", "Two's", "Three's", "Four's", "Five's", "Six's", "One pair", "Two pairs", "Three of a kind", "Four of a kind", "Full house", "Small straight", "Large straight", "Chance", "Yatzy"];

for (let e of nameArr) {
    let lbl = document.createElement("label");
    let txtField = document.createElement("textfield");
    lbl.innerHTML = e;
}