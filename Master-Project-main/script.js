const wordText = document.querySelector(".word"),
hintText = document.querySelector(".hint span"),
timeText = document.querySelector(".time b"),
inputField = document.querySelector("input"),
refreshBtn = document.querySelector(".refresh-word"),
checkBtn = document.querySelector(".check-word");
scoreText = document.querySelector(".score b");

let correctWord, timer;
let score = 0;

const initTimer = maxTime => {
    clearInterval(timer);
    timer = setInterval(() => {
        if(maxTime > 0) {
            maxTime--;
            return timeText.innerText = maxTime;
        }
        alert(`Time off! ${correctWord.toUpperCase()} was the correct word`);
        initGame();
    }, 1000);
}

const initGame = () => {
    initTimer(30);
    let randomObj = words[Math.floor(Math.random() * words.length)];
    let wordArray = randomObj.word.split("");
    for (let i = wordArray.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
    }
    wordText.innerText = wordArray.join("");
    hintText.innerText = randomObj.hint;
    correctWord = randomObj.word.toLowerCase();;
    inputField.value = "";
    inputField.setAttribute("maxlength", correctWord.length);
    scoreText.innerText = score;
}
initGame();

function showPopup(message) {
    const popup = document.getElementById('popup');
    const popupText = document.getElementById('popup-text');
    popupText.textContent = message;
    popup.style.display = 'block';
}
function hidePopup() {
    const popup = document.getElementById('popup');
    popup.style.display = 'none';
}
const checkWord = () => {
    let userWord = inputField.value.toLowerCase();
    if (!userWord) {
      showPopup("Please enter the word to check!");
    } else if (userWord !== correctWord) {
      showPopup(`Oops! ${userWord} is not a correct word`);
    } else if (userWord === correctWord) {
      score++;
      scoreText.innerText = score;
      showPopup(
        `Congrats! ${correctWord.toUpperCase()} is the correct word.`
      );
    }
    setTimeout(hidePopup, 2000);
    initGame();
  };

refreshBtn.addEventListener("click", initGame);
checkBtn.addEventListener("click", checkWord);