function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

document
  .querySelector('[data-start]')
  .addEventListener('click', startColorChange);
document
  .querySelector('[data-stop]')
  .addEventListener('click', stopColorChange);
let currentColor;

const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');

function startColorChange() {
  startButton.disabled = true;
  stopButton.disabled = false;

  currentColor = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function stopColorChange() {
  startButton.disabled = false;
  stopButton.disabled = true;

  clearInterval(currentColor);
}
