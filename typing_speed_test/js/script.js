//- typing game
const input = document.querySelector('#user-text');
const songText = document.querySelector('.lyrics p');
const textWrapper = document.querySelector('.text-wrapper');
const titleBand = document.querySelector('.title-band');
const restartBtn = document.querySelector('.restart-btn');
const customBtn = document.querySelector('.custom-btn')

let timer;
let time = 30;
let timeLeft = time;
let charIndex = 0;
let isTyping = 0;
let mistakes = 0;
let currWpm = 0;

//. loads random lyrics, song name and the band name
const loadLyrics = () => {
    const randomSong = Math.floor(Math.random() * songs.length);
    // console.log(randomSong);
    songText.innerHTML = '';
    songs[randomSong].lyrics.split("").forEach(char => {
        if(punctuationSetting === 0){
            if(char === "-"){
                char = '&nbsp'
            }
            if(!(char === "'" || char ==='?' || char === ',' || char === '"' || char === '(' || char === ')')){
                songText.innerHTML += `<span>${char.toLowerCase()}</span>`;
            }
        } else {
            songText.innerHTML += `<span>${char.toLowerCase()}</span>`;
        }
    });
    titleBand.textContent = `"${songs[randomSong].songName}" - ${songs[randomSong].artist}`;
    songText.querySelectorAll('span')[0].classList.add('active');
    titleBand.setAttribute('href', songs[randomSong].link);
    // document.addEventListener("keydown", () => input.focus());
    songText.addEventListener("click", () => input.focus());
};

//. timer
const startTimer = () => {
    if(timeLeft > 0) {
        timeLeft--;
        wpm = Math.round(((charIndex - mistakes)  / 5) / (time - timeLeft) * 60);
        currWpm = wpm
     } else{
        clearInterval(timer);
    }
};

//. saves new wpm to localstorage
const saveWpm = (wpm) =>{
    localStorage.setItem('lastWpm', JSON.stringify(wpm));
}

//.shows end screen
const showEndScreen = wpm => {
    input.style.display = 'none'
    let finalTime = 30;
    if(timeLeft > 0){
        finalTime = time - timeLeft;
    }
    if(localStorage.getItem('lastWpm')){
        let lastWpm = JSON.parse(localStorage.getItem('lastWpm'));
        songText.innerHTML = `
        <h2 class='score'>last wpm: ${JSON.parse(localStorage.getItem('lastWpm'))}</h2>
        <h2 class='score'>wpm: ${wpm}, time: ${finalTime}s, errors: ${mistakes}</h2>
        `;
        if(lastWpm < wpm){
            songText.innerHTML += `
            <h2 class='better-score'>Your speed improved by ${wpm - lastWpm} words per minute</h2>
            <h2 class='better-score'>Keep it up!</h2>
            `
        } else if(wpm < lastWpm){
            songText.innerHTML += `
            <h2 class='worse-score'>Your speed decreased by ${lastWpm - wpm} words per minute</h2>
            <h2 class='worse-score'>Don't worry! Try again!</h2>
            `
        }
    } else {
        songText.innerHTML = `
        <h2 class='score'>wpm: ${wpm}, time: ${finalTime}s, errors: ${mistakes}</h2>
        `;
    }
    customBtn.classList.add('hidden');
    saveWpm(wpm);
}

//. game 
const typingGame = () => {
    let allChars = songText.querySelectorAll("span");
    let typedChar = input.value.split("")[charIndex];
    let wpm;
    if(charIndex < allChars.length - 1 && timeLeft > 0) {
        if(!isTyping) {
            timer = setInterval(startTimer, 1000);
            isTyping = true;
        }
        if(typedChar == null) {
            if(charIndex > 0) {
                charIndex--;
                if(allChars[charIndex].classList.contains("incorrect")) {
                    mistakes--;
                }
                allChars[charIndex].classList.remove("correct", "incorrect",);
            }
        } else {
            if(allChars[charIndex].innerText == typedChar) {
                allChars[charIndex].classList.add("correct");
            } else {
                mistakes++;
                allChars[charIndex].classList.add("incorrect");
            }
            charIndex++;
        }
        allChars.forEach(span => span.classList.remove("active"));
        allChars[charIndex].classList.add("active");

        wpm = Math.round(((charIndex - mistakes)  / 5) / (time - timeLeft) * 60);
        wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;        
    } else {
        clearInterval(timer);
        input.value = "";
        showEndScreen(currWpm);
    }   

    if(!customBtn.classList.contains('hidden')){
        customBtn.classList.add('hidden');
    }
};

//. restarts the game
restartBtn.addEventListener('click', () => {
    location.reload();
});

loadLyrics();
input.addEventListener('input', typingGame);
input.focus();