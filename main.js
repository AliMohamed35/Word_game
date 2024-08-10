// Setting game name
let gameName = "Guess the Word";
document.title = gameName; // to use set game name to title in HTML
document.querySelector("h1").innerHTML = gameName;
document.querySelector("footer").innerHTML = `${gameName} created by Ali Mohamed`;

// Setting game options
let numbersOfTries = 6;
let numbersOfLetters = 6
let currentTry = 1; // created it to be able to disable and unable the try user is actually on now
let numberOfHints = 2;

// Manage hints
document.querySelector(".hint span").innerHTML = numberOfHints;
const getHintButton = document.querySelector(".hint");

getHintButton.addEventListener("click", getHint);

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

    } else { // this to disable the wrong try
        document.querySelector(`.try-${currentTry}`).classList.add("disabled-inputs");
        const currentTryInputs = document.querySelectorAll(`.try-${currentTry} input`);
        currentTryInputs.forEach((input) => (input.disabled = true));

        currentTry++;


        const nextTryInputs = document.querySelectorAll(`.try-${currentTry} input`);
        nextTryInputs.forEach((input) => (input.disabled = false));
    }

    let el = document.querySelector(`.try-${currentTry}`);

    if (el) {
        document.querySelector(`.try-${currentTry}`).classList.remove("disabled-inputs"); // if element is found remove the class from next
        el.children[1].focus(); // 1 because the first el which is 0 is a span 
    } else {
        guessButton.disabled = true;
        messageArea.innerHTML = `You lose the word is <span>${wordToGuess}</span>`;
    }
}

function getHint() {
    if (numberOfHints > 0) {
        numberOfHints--;
        document.querySelector(".hint span").innerHTML = numberOfHints;
    }
    if (numberOfHints === 0) {
        getHintButton.disabled = true;
    }

    const enabledInputs = document.querySelectorAll("input:not([disabled])"); // to get only enabled inputs
    // console.log(enabledInputs); for test
    const emptyEnabledInputs = Array.from(enabledInputs).filter((input) => input.value === "");
    // console.log(emptyEnabledInputs); for test

    if (emptyEnabledInputs.length > 0) { // that means if only there is 1 empty field
        const randomIndex = Math.floor(Math.random() * emptyEnabledInputs.length);
        const randomInput = emptyEnabledInputs[randomIndex];
        const indexToFill = Array.from(enabledInputs).indexOf(randomInput);

        // console.log(randomIndex);
        // console.log(randomInput);
        // console.log(indexToFill);
        if(indexToFill !== -1){
            randomInput.value = wordToGuess[indexToFill].toUpperCase();
        }
    }
}


window.onload = function () {
    generateInput();
};