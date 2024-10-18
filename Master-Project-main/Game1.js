// script.js
let images = [];
let names = {};
let correctCount = 0;
let wrongCount = 0;

fetch('names.txt')
    .then(response => response.text())
    .then(data => {
        const nameLines = data.split('\n');
        nameLines.forEach(line => {
            const [nameKey, nameValue] = line.split(':').map(item => item.trim());
            names[nameKey] = nameValue;
        });

        // Generate image URLs based on shuffled indices
        for (let i = 1; i <= 6; i++) {
            images.push(`images/face${i}.png`);
        }
        // Display the first image and associated shuffled names
        displayImage(0);
        const optionsContainer = document.getElementById('options');
        images.forEach((image, index) => {
            const nameKey = `name${index + 1}`;
            const name = names[nameKey];

            const button = document.createElement('button');
            button.textContent = name;
            button.addEventListener('click', () => checkAnswer(name));
            optionsContainer.appendChild(button);
        });
    })
    .catch(error => console.error(error));

function displayImage(index) {
    const imageElement = document.getElementById('image');
    imageElement.src = images[index];
}

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

function checkAnswer(selectedName) {
    const expectedName = names[`name${currentIndex + 1}`];

    console.log("Selected Name:", selectedName);
    console.log("Expected Name:", expectedName);

    if (selectedName === expectedName) {
        showPopup('Correct!');
        correctCount++;
    } else {
        showPopup('Wrong!');
        wrongCount++;
    }
    updateCountElements();
    setTimeout(hidePopup, 1000);

    currentIndex++;
    if (currentIndex < images.length) {
        displayImage(currentIndex);
    } else {
        showPopup('Game Over!');
    }
}
function updateCountElements() {
    const correctCountElement = document.getElementById('correctCount');
    const wrongCountElement = document.getElementById('wrongCount');

    correctCountElement.textContent = `Correct: ${correctCount}`;
    wrongCountElement.textContent = `Wrong: ${wrongCount}`;
}
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
function shuffleOptions() {
    const optionsContainer = document.getElementById("options");
    const options = Array.from(optionsContainer.children);
    shuffleArray(options);

    options.forEach(option => {
        optionsContainer.appendChild(option);
    });
}

window.onload = shuffleOptions;

let currentIndex = 0;

window.addEventListener('load', () => {
    currentIndex = 0;
});
window.onload = shuffleOptions;
