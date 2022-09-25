const settingsForm = document.querySelector('.settings-desc');
let userText;
let userCorrect;
let userIncorrect;
let userActive;
let userBackground;

settingsForm.textColor.addEventListener('input', () => {
    userText = settingsForm.textColor.value;
    document.documentElement.style.setProperty('--text', userText);
});

settingsForm.correctColor.addEventListener('input', () => {
    userCorrect = settingsForm.correctColor.value;
    document.documentElement.style.setProperty('--correct', userCorrect);
});

settingsForm.incorrectColor.addEventListener('input', () => {
    userIncorrect = settingsForm.incorrectColor.value;
    document.documentElement.style.setProperty('--incorrect', userIncorrect);
});

settingsForm.markerColor.addEventListener('input', () => {
    userActive = settingsForm.markerColor.value;
    document.documentElement.style.setProperty('--marker', userActive);
});

settingsForm.backgroundColor.addEventListener('input', () => {
    userBackground = settingsForm.backgroundColor.value;
    dummyBackground = document.querySelectorAll('.user-background');
    document.body.style.backgroundColor = userBackground;
    dummyBackground.forEach(dummy => {
        dummy.style.backgroundColor = userBackground;
    })
});

