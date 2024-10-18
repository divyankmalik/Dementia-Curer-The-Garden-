// script for the butterfly to fly around 
function createButterfly() {
    const butterfly = document.createElement('div');
    butterfly.className = 'butterfly';
    document.querySelector('.butterflies-container').appendChild(butterfly);

    butterfly.style.left = `${Math.random() * window.innerWidth}px`;
    butterfly.style.top = `${Math.random() * window.innerHeight}px`;

    butterfly.addEventListener('animationiteration', () => {
        butterfly.style.left = `${Math.random() * window.innerWidth}px`;
        butterfly.style.top = `${Math.random() * window.innerHeight}px`;
    });
}

setInterval(createButterfly, 3000); // Create a butterfly every 3 seconds
// script for the firefly to work 
function createFirefly() {
    const fireflyContainer = document.querySelector('.firefly-container');
    const firefly = document.createElement('div');
    firefly.className = 'firefly';
    firefly.style.left = `${Math.random() * 100}vw`;
    firefly.style.top = `${Math.random() * 100}vh`;
    fireflyContainer.appendChild(firefly);

    firefly.addEventListener('animationiteration', () => {
        firefly.style.left = `${Math.random() * 100}vw`;
        firefly.style.top = `${Math.random() * 100}vh`;
    });
}

// Create fireflies at intervals (adjust the interval as needed)
setInterval(createFirefly, 2000);
