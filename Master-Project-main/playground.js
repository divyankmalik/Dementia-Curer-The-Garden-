const shape = document.querySelector('.shape');
let x = 0;
let y = 0;
let xDirection = 1;
let yDirection = 1;
const speed = 2;

function moveShape() {
    x += xDirection * speed;
    y += yDirection * speed;

    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    // Check for collisions with the screen edges
    if (x + shape.clientWidth > screenWidth || x < 0) {
        xDirection *= -1;
    }

    if (y + shape.clientHeight > screenHeight || y < 0) {
        yDirection *= -1;
    }

    shape.style.transform = `translate(${x}px, ${y}px)`;

    requestAnimationFrame(moveShape);
}

moveShape();
