const settingsForm = document.querySelector('.settings-desc');
const resetSettings = document.querySelector('.reset-settings');
const punctuation = document.querySelector('.punctiation');
const fontWeight = document.querySelector('#font-weight')

let userText;
let userCorrect;
let userIncorrect;
let userActive;
let userBackground;

let userSettings =[];
let punctuationSetting = 0; 
let fontWeightSetting = 0;

class Setting{
    constructor(settingName, value){
        this.settingName = settingName;
        this.value = value;
    }
}

const saveUserSettings = () => {
    localStorage.setItem('userSettings', JSON.stringify(userSettings));
};

const setHTMLvalues = () =>{
    settingsForm.markerColor.value = userSettings[0].value;
    settingsForm.textColor.value = userSettings[1].value;
    settingsForm.backgroundColor.value = userSettings[2].value;
    settingsForm.correctColor.value = userSettings[3].value;
    settingsForm.incorrectColor.value = userSettings[4].value;
    settingsForm.sectionOne.value = userSettings[5].value;
    settingsForm.sectionTwo.value = userSettings[6].value;
};


//- event listners

settingsForm.addEventListener('input', () => {
    userSettings = [];
    const settings = settingsForm.querySelectorAll('input');
    settings.forEach(setting => {
        userSettings.push(new Setting(setting.name, setting.value))
    })
    
    saveUserSettings();
    
    document.documentElement.style.setProperty('--marker', userSettings[0].value);
    document.documentElement.style.setProperty('--text', userSettings[1].value);
    document.documentElement.style.setProperty('--background', userSettings[2].value);    
    document.documentElement.style.setProperty('--correct', userSettings[3].value);
    document.documentElement.style.setProperty('--incorrect', userSettings[4].value);
    document.documentElement.style.setProperty('--section1', userSettings[5].value);
    document.documentElement.style.setProperty('--section2', userSettings[6].value);
})

punctuation.addEventListener('click', e => {
    if(e.target.tagName === 'BUTTON'){
        let  target = punctuation.querySelector(`#${e.target.id}`);
        if(target.id === 'On'){
            punctuationSetting = 1;
            target.classList.add('selected');
            punctuation.lastElementChild.classList.remove('selected');
        } else if(target.id === 'Off'){
            punctuationSetting = 0;
            target.classList.add('selected');
            punctuation.firstElementChild.classList.remove('selected');
        }
        localStorage.setItem('punctuation', punctuationSetting);
        location.reload();
    }
});

settingsForm.addEventListener('submit', e => {
    e.preventDefault();
});

fontWeight.addEventListener('input', () => {
    fontWeightSetting = fontWeight.value;
    document.documentElement.style.setProperty('--weight', fontWeightSetting);
    localStorage.setItem("fontWeight", fontWeightSetting);
});

//- local storage

if(localStorage.getItem('userSettings')){
    userSettings = JSON.parse(localStorage.getItem('userSettings'));
    setHTMLvalues();
    
    document.documentElement.style.setProperty('--marker', userSettings[0].value);
    document.documentElement.style.setProperty('--text', userSettings[1].value);
    document.documentElement.style.setProperty('--background', userSettings[2].value);    
    document.documentElement.style.setProperty('--correct', userSettings[3].value);
    document.documentElement.style.setProperty('--incorrect', userSettings[4].value);
    document.documentElement.style.setProperty('--section1', userSettings[5].value);
    document.documentElement.style.setProperty('--section2', userSettings[6].value);
}

if(localStorage.getItem('punctuation')){
    punctuationSetting = Number(localStorage.getItem('punctuation'));
    if(Number(punctuationSetting) === 1){
        punctuation.firstElementChild.classList.add('selected');
        punctuation.lastElementChild.classList.remove('selected');
    }
}

if(localStorage.getItem('fontWeight')){
    fontWeightSetting = localStorage.getItem('fontWeight');
    document.documentElement.style.setProperty('--weight', fontWeightSetting);
    fontWeight.value = fontWeightSetting;
}

resetSettings.addEventListener('click', () => {
    localStorage.removeItem('userSettings');
    location.reload()
});
