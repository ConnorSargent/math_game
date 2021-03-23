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

    document.getElementById("answer-box").addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            checkAnswer();
        }
    })

    runGame("addition");
});

// The main game "loop", called when the script is first loaded
// and after the user's answer has been processed

function runGame(gameType) {

    //Generate two random numbers between 1 and 25
    //Math.floor rounds down to a whole number
    //Math.random generates random numbers (+1 starts the number at 1 )


    document.getElementById("answer-box").value = ""; // Clears old answer from answer box
    document.getElementById("answer-box").focus(); //Cursor on answer box ready to type answer

    let num1 = Math.floor(Math.random() * 25) + 1;
    let num2 = Math.floor(Math.random() * 25) + 1;

    if (gameType === "addition") {
        displayAdditionQuestion(num1, num2);
    } else if (gameType === "multiply") {
        displayMultiplyQuestion(num1, num2);
    } else if (gameType === "subtract") {
        displaySubtractQuestion(num1, num2);
    } else if (gameType === "division"){
        displayDivisionQuestion(num1, num2);
    }else {
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
        incrementScore();
    } else {
        alert(`Almost! you answered ${userAnswer} the correct answer is ${calculatedAnswer[0]}!`)
        incrementWrongAnswer();
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
    } else if (operator === "x") {
        return [operand1 * operand2, "multiply"];
    } else if (operator === "-") {
        return [operand1 - operand2, "subtract"];
    } else if (operator === "/"){
        return [operand1 / operand2, "division"];
    }else {
        alert(`Unimplemented operator: ${operator}`);
        throw `Unimplemented operator ${operator}, aborting`;
    }

}

function incrementScore() {

    //gets current score form DOM adds 1

    let oldScore = parseInt(document.getElementById("score").innerText);
    document.getElementById("score").innerText = ++oldScore;

}

function incrementWrongAnswer() {

    let oldScore = parseInt(document.getElementById("incorrect").innerText);
    document.getElementById("incorrect").innerText = ++oldScore;

}

function displayAdditionQuestion(operand1, operand2) {

    document.getElementById("operand1").textContent = operand1;
    document.getElementById("operand2").textContent = operand2;
    document.getElementById("operator").textContent = "+";

}

function displaySubtractQuestion(operand1, operand2) {

    document.getElementById("operand1").textContent = operand1 > operand2 ? operand1 : operand2;
    document.getElementById("operand2").textContent = operand1 < operand2 ? operand1 : operand2;
    document.getElementById("operator").textContent = "-";

}

function displayMultiplyQuestion(operand1, operand2) {

    document.getElementById("operand1").textContent = operand1;
    document.getElementById("operand2").textContent = operand2;
    document.getElementById("operator").textContent = "x";

}

function displayDivisionQuestion(operand1, operand2) {
    
    document.getElementById("operand1").textContent = operand1 * operand2;
    document.getElementById("operand2").textContent = operand1 > operand2 ? operand1 : operand2;
    document.getElementById("operator").textContent = "/";

}