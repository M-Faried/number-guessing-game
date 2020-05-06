const msgElement = document.getElementById('msg');

const randomNumber = getRandomNumber();
let solved = false;

console.log(randomNumber);

window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new window.SpeechRecognition();
recognition.start();
recognition.addEventListener('result', onSpeak);
recognition.addEventListener('end', () => recognition.start());
document.body.addEventListener('click', (e) => {
  if (e.target.id === 'play-again') window.location.reload();
});

///////////////////////////////////////////////////////Helper Functions

function onSpeak(e) {
  const msg = e.results[0][0].transcript;

  if (solved && isPlayAgainMessage(msg)) window.location.reload();
  else {
    writeMessage(msg);
    checkNumber(msg);
  }
}

function writeMessage(msg) {
  msgElement.innerHTML = `
    <div>You said: </div>
    <span class="box">${msg}</span>`;
}

function checkNumber(msg) {
  const number = +msg;

  if (Number.isNaN(number)) {
    msgElement.innerHTML += '<div>That is not a valid number</div>';
    return;
  }

  if (number < 1 || number > 100) {
    msgElement.innerHTML += '<div>The number must be between 1 and 100</div>';
    return;
  }

  if (number > randomNumber) msgElement.innerHTML += '<div>GO LOWER</div>';
  else if (number < randomNumber)
    msgElement.innerHTML += '<div>GO HIGHER</div>';
  else {
    solved = true;
    document.body.innerHTML = `<h2>Congrats! You have guessed the number!<br>
        <br> It was ${number}</h2>
        <button class="replay-btn" id="play-again">Play Again</button>
        `;
  }
}

function getRandomNumber() {
  return Math.floor(Math.random() * 100) + 1;
}

function isPlayAgainMessage(msg) {
  return (
    msg.includes('go') > -1 || msg.includes('again') || msg.includes('play')
  );
}
