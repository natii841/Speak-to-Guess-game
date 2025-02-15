const msgEl = document.getElementById('msg');

const randomNum = getRandomNumber();

console.log('Number:', randomNum);  

window.SpeechRecognition =  
window.SpeechRecognition || window.webkitSpeechRecognition; 

let recognition = new window.SpeechRecognition();

// start recognition

recognition.start();

// capture user speak

function onspeak(event){
const msg =event.results [0] [0].transcript;
console.log('recognized speech = ',msg);
writeMessage(msg);
checkNumber(msg);
}
// write what user speaks

function writeMessage(msg){
    msgEl.innerHTML =  
    `<div>You said: </div>
    <span class="box">${msg}</span>`;

}

// check msg against number

function checkNumber(msg){
      const num = +msg;

         if (Number.isNaN(num)){
            msgEl.innerHTML = '<div>That is not a valid number!</div>';
         return;
         }
         if(num > 100 || num < 1){
            msgEl.innerHTML = `<div>Number must be between 1 and 100</div>`;
           return;
         }
         
         if (num === randomNum){
            document.body.innerHTML = `
            <h2>Congrats! You have guessed the number! <br><br>
            <h2>It was ${num}</h2>
            <button class="play-btn" id="play-again">Play Again</button>
            `;
         } else if(num > randomNum){
            msgEl.innerHTML += '<div>Go Lower</div>';
         } else {
            msgEl.innerHTML += '<div>Go Higher</div>';
         }
}


function getRandomNumber() {
    return Math.floor(Math.random() *100) + 1;
}
// speak result
 
recognition.addEventListener('result', onspeak);

// End SR service

recognition.addEventListener('end', () => recognition.start());

document.body.addEventListener('click', (e) => {
    if (e.target.id == 'play-again') {
        window.location.reload();
    }
});