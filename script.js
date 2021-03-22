//Wait for the DOM to finish loading before running the game
//Get the elements and add event listeners to them

document.addEventListener("DOMContentLoaded", function () {
    let buttons = document.getElementsByTagName("button");

    for (let button of buttons) {
        button.addEventListener("click", function () {
            if (this.getAttribute("data-type") === "submit") {
                checkAnswer();
            } else {
                let gameType = this.getAttribute("data-type");
                runGame(gameType)
            }
        });
    }

    runGame("addition");
});

// The main game "loop", called when the script is first loaded
// and after the user's answer has been processed

function runGame(gameType) {

    //Generate two random numbers between 1 and 25
    //Math.floor rounds down to a whole number
    //Math.random generates random numbers (+1 starts the number at 1 )
    let num1 = Math.floor(Math.random() * 25) + 1;
    let num2 = Math.floor(Math.random() * 25) + 1;

    if (gameType === "addition") {
        displayAdditionQuestion(num1, num2);
    } else {
        alert(`Unknown game type ${gameType}`)
        throw `Unknown game type ${gameType}, aborting!`;
    }

}

function checkAnswer() {

//Checks the answer against the first element in the calculateCorrectAnswer array

let userAnswer = parseInt(document.getElementById("answer-box").value)
let calculatedAnswer = calculateCorrectAnswer()
let isCorrect = userAnswer === calculatedAnswer[0];

if (isCorrect) {
    alert("Great job! you got it right!")
}else{
    alert(`Almost! you answered ${userAnswer} the correct answer is ${calculatedAnswer[0]}!`)
}

runGame(calculatedAnswer[1]);
}

function calculateCorrectAnswer() {

//Gets operands (numbers) and the operator (+ - * /)
//Directly from the DOM

let operand1 = parseInt(document.getElementById("operand1").innerText);
let operand2 = parseInt(document.getElementById("operand2").innerText);
let operator = document.getElementById("operator").innerText;

if (operator === "+") {
    return [operand1 + operand2, "addition"];
}
else {
    alert(`Unimplemented operator: ${operator}`);
    throw `Unimplemented operator ${operator}, aborting`;
}

}

function incrementScore() {

}

function incrementWrongAnswer() {

}

function displayAdditionQuestion(operand1, operand2) {

    document.getElementById("operand1").textContent = operand1;
    document.getElementById("operand2").textContent = operand2;
    document.getElementById("operator").textContent = "+";

}

function displaySubtractQuestion() {

}

function displayMultiplyQuestion() {

}

function displayDivisionQuestion() {

}