const userSongsWrapper = document.querySelector('.custom-desc');
const addNewSongWrapper = document.querySelector('.add-song-form-wrapper');
const addButton = document.querySelector('.add-song');
const cancelBtn = document.querySelector('.cancel');
const addForm = document.querySelector('.add-form');
const userSongsList = document.querySelector('.user-songs');
const deleteAllSongsBtn = document.querySelector('.delete-all-songs');
let userSongs = [];

//.creates new song object
class Song {
    constructor(songName, artist, lyrics){
        this.songName = songName;
        this.artist = artist;
        this.lyrics = lyrics;
    }
};

//.writes user songs to list 
const showUserSongs = () => {
    if(userSongs.length){
        userSongsList.innerHTML = ``;
        let index = 0;
        userSongs.forEach(song => {
            userSongsList.innerHTML += `
                <li id="${index}">
                    <p class="song-name">${song.songName}</p>
                    <button class="delete-song">X</button>
                </li>
            `
            index++
        })
    } else {
        userSongsList.innerHTML = `<p class="no-songs">no custom songs</p>`
    }
};

//.saves user songs to local storage
const saveUserSongs = () => {
    localStorage.setItem('savedSongs', JSON.stringify(userSongs));
};

//.saves new song to array
const saveNewSong = (songName, songArtist, songLyrics) => {
    let newSong = new Song(songName, songArtist, songLyrics);
    userSongs.push(newSong);    
    showUserSongs();
    saveUserSongs();
};

addForm.addEventListener('submit', e => {
    e.preventDefault();
    if(e.submitter.tagName === 'INPUT'){
        const newSongName = addForm.newSongName.value;
        const newSongArtist = addForm.newSongArtist.value;
        const newSongLyrics = addForm.newSongLyrics.value;
        saveNewSong(newSongName, newSongArtist, newSongLyrics)
        addForm.reset()
        userSongsWrapper.classList.remove('hidden')
        addNewSongWrapper.classList.add('hidden');
    }
});

addButton.addEventListener('click', () => {
    userSongsWrapper.classList.add('hidden')
    addNewSongWrapper.classList.remove('hidden');
});

cancelBtn.addEventListener('click', () => {
    userSongsWrapper.classList.remove('hidden')
    addNewSongWrapper.classList.add('hidden');
});

if(localStorage.getItem('savedSongs')){
    userSongs = JSON.parse(localStorage.getItem('savedSongs'));
    showUserSongs();
}

deleteAllSongsBtn.addEventListener('click', () => {
    localStorage.removeItem('savedSongs');
    userSongs = [];
    showUserSongs();
});

const loadCustomSong = (id) => {
    songText.innerHTML = '';
    userSongs[id].lyrics.split("").forEach(char => {
        songText.innerHTML += `<span>${char}</span>`;
    });
    titleBand.textContent = `"${userSongs[id].songName}" - ${userSongs[id].artist}`;
    songText.querySelectorAll('span')[0].classList.add('active', "user-active");
    songText.addEventListener("click", () => input.focus());
    closePopup();
};

userSongsList.addEventListener('click', e => {
    if(e.target.tagName === "LI"){
        let customSongId = e.target.id;
        loadCustomSong(customSongId);
        input.focus();
    } else if(e.target.tagName === "BUTTON"){
        let customSongId = e.target.parentElement.id;
        userSongs.splice(customSongId);
        showUserSongs();
        saveUserSongs();
    }
})