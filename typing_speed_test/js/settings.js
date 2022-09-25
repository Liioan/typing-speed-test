const settingsForm = document.querySelector('.settings-desc');
const resetSettings = document.querySelector('.reset-settings');

let userText;
let userCorrect;
let userIncorrect;
let userActive;
let userBackground;

let userSettings =[]

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

settingsForm.addEventListener('submit', e => {
    e.preventDefault();
})

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

resetSettings.addEventListener('click', () => {
    localStorage.removeItem('userSettings');
    location.reload()
});
