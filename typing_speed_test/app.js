//. buttons
const buttons = document.querySelectorAll('button')

buttons.forEach( button => {
    button.addEventListener('click',  e => {
        let fileName = e.target.id;
        let file = new Audio(`./assets/sound/${fileName}.wav`)
        file.play();
    });
})
