// Globala variabler

const wordList = ["fotboll", "basket", "handboll", "hockey", "boxning", "innebandy","badminton", "tennis", "karate", "curling", "rugby", "cricket", "baseboll"];      // Array: med spelets alla ord
let selectedWord = wordList[Math.floor(Math.random() * wordList.length)];    // Sträng: ett av orden valt av en slumpgenerator från arrayen ovan
let numberOfHangman = 6;
let resetHangman = "images/h0.png"
let guesses = 0;     // Number: håller antalet gissningar som gjorts
let hangmanImg;      // Sträng: sökväg till bild som kommer visas (och ändras) fel svar. t.ex. `/images/h1.png`
let point;           // antalet rätt gissningar 
let msgHolderEl = document.getElementById("msg");     // DOM-nod: Ger meddelande när spelet är över
let startGameBtnEl = document.querySelector("#startGameBtn");  // DOM-nod: knappen som du startar spelet med
let letterButtonEls = document.querySelectorAll("#letterButtons > li > button"); // Array av DOM-noder: Knapparna för bokstäverna
let letterBoxEls;    // Array av DOM-noder: Rutorna där bokstäverna ska stå

// Funktion som startar spelet vid knapptryckning, och då tillkallas andra funktioner

activateButtons(false); // Alla knappar ska vara avstängda tills det att vi trycker på "Starta Spelet" 
startGameBtnEl.addEventListener("click", startGame)

function startGame(){
    guesses = 0;
    startGameBtnEl.textContent = "Spela Igen"
    point = 0;
    hangmanImg = document.querySelector("#hangman");
    hangmanImg.src = resetHangman;
    generateRandomWords();
    createLetterBoxes();
    activateButtons(true);
    msgHolderEl.textContent = "NU KÖR VI!";
    document.getElementById("infoPTag").innerHTML = "";
}

// Funktion som slumpar fram ett ord
function generateRandomWords() {
    selectedWord = wordList[Math.floor(Math.random() * wordList.length)];
    console.log(selectedWord);
}

// Funktion som tar fram bokstävernas rutor, antal rutor beror på vilket ord slumptas fram
function createLetterBoxes() {
    letterBoxEls = document.querySelector("#ulBlocks")
    letterBoxEls.innerHTML = "";
    for (let i = 0; i < selectedWord.length; i++) {
        const emptyBlock = document.createElement("li");
        emptyBlock.innerHTML = '<input type="text" disabled value=""  />';
        letterBoxEls.appendChild(emptyBlock);
    }
}



// Funktion som körs när du trycker på bokstäverna och gissar bokstav

letterButtonEls.forEach((button) =>{
    button.addEventListener("click", clickOnButton)
})

function clickOnButton(e) {
    let status = false;
    let letter = e.target;
    console.log(letter.value)
    for (let letterIndex = 0; letterIndex < selectedWord.length; letterIndex++) {
        letter.disabled = true;
        if (selectedWord.charAt(letterIndex) === letter.value.toLowerCase()) {
            console.log("good job")
            status = true;
            console.log(status);
        }
    }
    if (status) {
        console.log(status);
        winFunction(letter);
    } else {
        loseFunction();
        console.log(status)
    }

}

// Funktion som ropas vid vinst eller förlust, gör olika saker beroende tillståndet

// Påväg mot vinst / Vinst

function winFunction(letter) {
    for (let letterIndex = 0; letterIndex < selectedWord.length; letterIndex++) {
        if (selectedWord.charAt(letterIndex) === letter.value.toLowerCase()) {
            letterBoxEls.children[letterIndex].innerHTML = `<li><input type="text" disabled value="${letter.value}" /></li>`;
            console.log("good job");
            msgHolderEl.textContent = "Bra fortsätt så :) !!"
            point++;
        }
    }
    if (point === selectedWord.length) {
        msgHolderEl.textContent = "Grattis du vann!! Spela igen?"
        activateButtons(false);
    }
}

function loseFunction() {
    console.log("fel")
    guesses++;
    msgHolderEl.textContent = "Ajj :( !!"
    updateHangman();
    if (guesses === 6) {
        msgHolderEl.textContent = "Du förlorade, försök igen!!"
        activateButtons(false);
    }
}

// Funktion för att uppdaterar hangman
function updateHangman() {
    hangmanImg = document.querySelector("#hangman");
    hangmanImg.src = "images/" + "h" + guesses + ".png"; // i det här fallet så har våra img samma namn men med olika nummer, dessa nummer kan man koppla till antalet guesses
}

// Funktion som inaktiverar/aktiverar bokstavsknapparna beroende på vilken del av spelet du är på
function activateButtons(arg) {
    if (arg === true) {
        for (let letterIndex = 0; letterIndex < letterButtonEls.length; letterIndex++) {
            letterButtonEls[letterIndex].disabled = false;
        }
    }
    if (arg === false) {
        for (let letterIndex = 0; letterIndex < letterButtonEls.length; letterIndex++) {
            letterButtonEls[letterIndex].disabled = true;
        }
    }
}

