document.addEventListener('DOMContentLoaded', function () {
    const container = document.querySelector('.container');
    const target = document.querySelector('.target');
    const colorShapes = document.querySelectorAll('.color-shape');
    const colorNameTargets = document.querySelectorAll('.color-name-target');
    const message = document.getElementById('message');
    const popup = document.getElementById('popup');
    const popupMessage = document.getElementById('popup-message');
    const popupTime = document.getElementById('popup-time');
    const closePopupButton = document.getElementById('close-popup');
    const timerDisplay = document.getElementById('timer');
    let startTime = 0;
    let intervalId;
    let draggedShape;

    function startTimer() {
      startTime = Date.now();
      intervalId = setInterval(updateTimer, 1000);
    }
  
    function stopTimer() {
      if (intervalId) {
        clearInterval(intervalId);
      }
    }
  
    function updateTimer() {
      const currentTime = Date.now();
      const elapsedTime = Math.floor((currentTime - startTime) / 1000);
      timerDisplay.textContent = `Time: ${elapsedTime} seconds`;
    }
  
    function calculateElapsedTime() {
      const currentTime = Date.now();
      return Math.floor(currentTime - startTime) / 1000;
    }
  
    function shuffleElements() {
      const colorShapesArray = Array.from(colorShapes);
      const colorNameTargetsArray = Array.from(colorNameTargets);
  
      colorShapesArray.sort(() => Math.random() - 0.5);
      colorNameTargetsArray.sort(() => Math.random() - 0.5);
      container.innerHTML = '';
      target.innerHTML = '';
      colorShapesArray.forEach(colorShape => container.appendChild(colorShape));
      colorNameTargetsArray.forEach(colorNameTarget => target.appendChild(colorNameTarget));
    }
  
    function dragStart() {
      draggedShape = this;
      setTimeout(() => (this.style.display = 'none'), 0);
    }
  
    function dragEnd() {
      draggedShape.style.display = 'block';
      draggedShape = null;
    }
  
    function dragOver(e) {
      e.preventDefault();
    }
  
    function dragEnter(e) {
      e.preventDefault();
      this.classList.add('hovered');
    }
  
    function dragLeave() {
      this.classList.remove('hovered');
    }
  
    function showMessage(txt) {
      var elapsedTime = calculateElapsedTime();
      popupTime.textContent = `Elapsed Time: ${elapsedTime} seconds`;
      popup.style.display = 'block';
      popupMessage.textContent = txt;
      closePopupButton.addEventListener('click', () => {
        const popup = document.getElementById('popup');
        popup.style.display = 'none';
        const popupMessage = document.getElementById('popup-message');
        popupMessage.textContent = '';
        });
    }
  
    function dragDrop() {
      this.classList.remove('hovered');
      if (draggedShape.dataset.color === this.dataset.color) {
        this.style.background = draggedShape.style.background;
        draggedShape.style.visibility = 'hidden';
        this.classList.add('correct-match');
        playCorrectSound(); 
        checkGameEnd();
      }
    }
    function resetBackgroundColor() {
      colorNameTargets.forEach(target => {
          target.style.background = ''; 
          target.classList.remove('correct-match');
      });
  }
    function checkGameEnd() {
        const allTargets = document.querySelectorAll('.color-name-target');
        const matchedTargets = document.querySelectorAll('.color-name-target[style*="background"]');
        const hiddenShapes = document.querySelectorAll('.color-shape[style*="visibility: hidden;"]');
      
        // Debugging output
        console.log('Matched Targets:', matchedTargets.length);
        console.log('All Targets:', allTargets.length);
        console.log('Hidden Shapes:', hiddenShapes.length);
        if (hiddenShapes.length === allTargets.length) {
            showMessage('Game Over! All shapes are correctly matched.');
            stopTimer();
            var audio = document.getElementById('audio');
            audio.play('audio');
            restartButton.style.display = 'block';
            resetBackgroundColor();
      }
    }
    function playCorrectSound() {
      const correctSound = document.getElementById("correctSound");
     correctSound.volume = 0.5;
      correctSound.play();
    }
    
    window.onload = () => {
      shuffleElements();
      startTimer();
    };
  
    colorShapes.forEach(colorShape => {
      colorShape.addEventListener('dragstart', dragStart);
      colorShape.addEventListener('dragend', dragEnd);
    });
  
    colorNameTargets.forEach(colorNameTarget => {
      colorNameTarget.addEventListener('dragover', dragOver);
      colorNameTarget.addEventListener('dragenter', dragEnter);
      colorNameTarget.addEventListener('dragleave', dragLeave);
      colorNameTarget.addEventListener('drop', dragDrop);
    });  
  });
  
