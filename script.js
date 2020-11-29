// list of words that are used to guess
var list = [
	"python",
	"javascript",
	"mongodb",
	"json",
	"java",
	"html",
	"css",
	"c",
	"csharp",
	"golang",
	"kotlin",
	"php",
	"sql",
  "ruby",
  "srikanth",
  "application",
  "programming",
  "hyderabad",
  "chennai",
  "banglore",
  "delhi",
  "mohali",
  "sydney",
  "adelaide",
  "capetown",
  "newyork",
  "london",
  "brazil",
  "melbourne",
  "texas",
  "newzealand",
  "england",
  "southafrica",
  "pakistan",
  "india",
  "australia",
  "westindies",
  "bangladesh",
  "afghanistan",
  "china",
  "japan"

]
// the following elements are created to display our game
var div1=document.createElement("div")
    div1.classList.add("container")
var h1=document.createElement("h1")
    h1.classList.add("text-center")
    h1.innerHTML="Hangman"
div1.append(h1)
var div2=document.createElement("div")
    div2.classList.add("float-right")
    div2.innerHTML="Wrong Guesses: <span id='mistakes'>0</span> of <span id='maxWrong'></span></div>"
div1.append(div2)
var div3=document.createElement("div")
    div3.classList.add("text-center")
var img1=document.createElement("img")
    img1.src="0.jpg"
    img1.id="hangmanPic"
div3.append(img1)
var p1=document.createElement("p")
    p1.innerHTML="Guess the word:"
div3.append(p1)
var p2=document.createElement("p")
    p2.id="wordSpotlight"
    p2.innerHTML="The word to be guessed goes here"
div3.append(p2)
var div4=document.createElement("div")
    div4.id="keyboard"
div3.append(div4)
var but1=document.createElement("button")
    but1.classList.add("btn-info")
    but1.innerHTML="Reset"
    but1.style.outline="none"
div3.append(but1)
div1.append(div3)
document.body.append(div1)
let answer = '';
let maxWrong = 6;
let mistakes = 0;
let guessed = [];
let wordStatus = null;
// function to generate a random word from our list
function randomWord() {
  answer = list[Math.floor(Math.random() * list.length)];
}
// function to generate buttons from a-z to guessthe word
function generateButtons() {
  let buttonsHTML = 'abcdefghijklmnopqrstuvwxyz'.split('').map(letter =>
    `
      <button
        class="btn btn-lg btn-dark m-2"
        id='` + letter + `'
        onClick="handleGuess('` + letter + `')"
      >
        ` + letter + `
      </button>
    `).join('');

  document.getElementById('keyboard').innerHTML = buttonsHTML;
}
// function to decide what to do of the choosen letter
function handleGuess(chosenLetter) {
  guessed.indexOf(chosenLetter) === -1 ? guessed.push(chosenLetter) : null;
  document.getElementById(chosenLetter).setAttribute('disabled', true);

  if (answer.indexOf(chosenLetter) >= 0) {
    guessedWord();
    checkIfGameWon();
  } else if (answer.indexOf(chosenLetter) === -1) {
    mistakes++;
    updateMistakes();
    checkIfGameLost();
    updateHangmanPicture();
  }
}
// function to update the picture every time a mistake has happen
function updateHangmanPicture() {
  document.getElementById('hangmanPic').src =  mistakes + '.jpg';
}
// function to check game has won
function checkIfGameWon() {
  if (wordStatus === answer) {
    document.getElementById('keyboard').innerHTML = 'You Won!!!';
  }
}
// function to check game has lost
function checkIfGameLost() {
  if (mistakes === maxWrong) {
    document.getElementById('wordSpotlight').innerHTML = 'The answer was: ' + answer;
    document.getElementById('keyboard').innerHTML = 'You Lost!!!';
  }
}
// function to display the guessed word
function guessedWord() {
  wordStatus = answer.split('').map(letter => (guessed.indexOf(letter) >= 0 ? letter : " _ ")).join('');

  document.getElementById('wordSpotlight').innerHTML = wordStatus;
}
// function to update the mistakes
function updateMistakes() {
  document.getElementById('mistakes').innerHTML = mistakes;
}
// below function is used to reset the game when the but1 is clicked
but1.onclick= function()  {
  mistakes = 0;
  guessed = [];
  document.getElementById('hangmanPic').src = '0.jpg';

  randomWord();
  guessedWord();
  updateMistakes();
  generateButtons();
}

document.getElementById('maxWrong').innerHTML = maxWrong;

randomWord();
generateButtons();
guessedWord();
