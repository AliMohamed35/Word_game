// Setting game name
let gameName = "Guess the Word";
document.title = gameName; // to use set game name to title in HTML
document.querySelector("h1").innerHTML = gameName;
document.querySelector("footer").innerHTML = `${gameName} created by Ali Mohamed`;

// Setting game options
let numbersOfTries = 6;
let numbersOfLetters = 6
let currentTry = 1; // created it to be able to disable and unable the try user is actually on now

function generateInput(){
    const inputsContainer = document.querySelector(".inputs");

    // Create Main Try Div
    for(let i = 1; i <= numbersOfTries; i++){
        const tryDiv = document.createElement("div");
        tryDiv.classList.add(`try-${i}`) // div class will be >> try-1
        tryDiv.innerHTML = `<span>Try ${i}</span>`; // number of tries on the left

        if(i !== 1) tryDiv.classList.add("disabled-inputs");

        // Create Inputs
        for(let j = 1; j <= numbersOfLetters; j++){
            const input = document.createElement("input");
            input.type = "text";
            input.id = `guess-${i}-letter-${j}`
            input.setAttribute("maxlength","1")
            tryDiv.appendChild(input);
        }

        inputsContainer.appendChild(tryDiv);
    }
    inputsContainer.children[0].children[1].focus(); // we used 1 because the 0 is the first child and we dont want to catch the span 
}

window.onload = function(){
    generateInput();
};