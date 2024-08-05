// Setting game name
let gameName = "Guess the Word";
document.title = gameName; // to use set game name to title in HTML
document.querySelector("h1").innerHTML = gameName;
document.querySelector("footer").innerHTML = `${gameName} created by Ali Mohamed`;

// Setting game options
let numbersOfTries = 6;
let numbersOfLetters = 6
let currentTry = 1; // created it to be able to disable and unable the try user is actually on now

// Manage Words
let wordToGuess = "";
const words = ["Create", "Update", "Delete", "Master", "Branch", "Mainly", "Elzero", "School"];
wordToGuess = words[Math.floor(Math.random() * words.length)].toLowerCase(); // this will generate random number from the array >> words[1] for ex.
let messageArea = document.querySelector(".message");

function generateInput() {
    const inputsContainer = document.querySelector(".inputs");

    // Create Main Try Div
    for (let i = 1; i <= numbersOfTries; i++) {
        const tryDiv = document.createElement("div");
        tryDiv.classList.add(`try-${i}`) // div class will be >> try-1
        tryDiv.innerHTML = `<span>Try ${i}</span>`; // number of tries on the left

        if (i !== 1) tryDiv.classList.add("disabled-inputs");

        // Create Inputs
        for (let j = 1; j <= numbersOfLetters; j++) {
            const input = document.createElement("input");
            input.type = "text";
            input.id = `guess-${i}-letter-${j}`
            input.setAttribute("maxlength", "1")
            tryDiv.appendChild(input);
        }

        inputsContainer.appendChild(tryDiv);
    }
    inputsContainer.children[0].children[1].focus(); // we used 1 because the 0 is the first child and we dont want to catch the span 

    // Disable all inputs except first one
    const inputsInDisabledDiv = document.querySelectorAll(".disabled-inputs input") // here I caught all inputs located inside disabled-inputs class
    inputsInDisabledDiv.forEach((input) => (input.disabled = true));

    // Navigation step
    const inputs = document.querySelectorAll("input");
    inputs.forEach((input, index) => {
        input.addEventListener("input", function () {
            this.value = this.value.toUpperCase(); // the value that is entered will be converted to upper case.
            // console.log(index);
            const nextInput = inputs[index + 1];
            if (nextInput) nextInput.focus();
        }); // this is one way to navigate and get index

        input.addEventListener("keydown", function (event) {
            // console.log(event);
            const currentIndex = Array.from(inputs).indexOf(event.target); // or we may use this keyword
            // console.log(currentIndex);

            if (event.key === "ArrowRight") {
                const nextInput = currentIndex + 1;
                if (nextInput < inputs.length) inputs[nextInput].focus();
            }
            if (event.key === "ArrowLeft") {
                const prevInput = currentIndex - 1;
                if (prevInput >= 0) inputs[prevInput].focus();
            }
            // this is another way to navigate and get index
        });
    });
}

const guessButton = document.querySelector(".check");
guessButton.addEventListener("click", handleGuesses);

console.log(wordToGuess);

function handleGuesses() {
    let successGuess = true;
    for (let i = 1; i <= numbersOfLetters; i++) {
        const inputField = document.querySelector(`#guess-${currentTry}-letter-${i}`); // we use here # because its an id
        const letter = inputField.value.toLowerCase();
        const actualLetter = wordToGuess[i - 1]; // because here we start from 0 so this will return 0 cuz in the loop i = 1

        // Game Logic
        if (letter === actualLetter) {
            inputField.classList.add("yes-in-place");
        } else if (wordToGuess.includes(letter) && letter !== "") {
            inputField.classList.add("not-in-place")
            successGuess = false;
        } else {
            inputField.classList.add("no")
            successGuess = false;
        }
    }


    // check if user win or lose
    if (successGuess) {
        messageArea.innerHTML = `You win the word is <span>${wordToGuess}</span>`;

        let allTries = document.querySelectorAll(".inputs > div");
        allTries.forEach((tryDiv) => tryDiv.classList.add("disabled-inputs"));

        //Disable submit button
        guessButton.disabled = true;

    } else {
        messageArea.innerHTML = `You lost the word is <span>${wordToGuess}</span>`;
    }
}

window.onload = function () {
    generateInput();
};