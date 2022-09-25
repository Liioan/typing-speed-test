const buttons = document.querySelectorAll('.section')
let currentWrapper;
let currentSection;
let currentCloseBtn;

buttons.forEach(button => {
    button.addEventListener('click', e => {
        let id = e.target.id;
            currentWrapper  = document.querySelector(`.${id}-wrapper`);
            currentSection = document.querySelector(`.${id}`);
            currentCloseBtn = document.querySelector(`.close-${id}`);
            showCurrentSection();
    })
});

const showCurrentSection = () => {
    currentWrapper.classList.remove('hidden');
    for(let i = 0; i < 100; i+=10){
        setTimeout(() => {
            currentWrapper.style.opacity = i;
        }, i * 5);
    }
    setTimeout(() => {
        currentSection.classList.remove('animation');
    }, 100);

    // currentWrapper.addEventListener('click', closePopup);
    currentCloseBtn.addEventListener('click', closePopup);
};

const closePopup = () =>{
    currentSection.classList.add('animation');
    for(let i = 0; i < 100; i+=10){
        setTimeout(() => {
            currentWrapper.style.opacity = -i;
        }, i * 5);
    }
    setTimeout(() => {
        currentWrapper.classList.add('hidden');
    }, 500)
};

