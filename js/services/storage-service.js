'use strict'

//service functions for storage

function saveToStorage(key, value) {
    const valStr = JSON.stringify(value)
    localStorage.setItem(key, valStr)
}

function loadFromStorage(key) {
    const valStr = localStorage.getItem(key)
    return JSON.parse(valStr)
}

// function saveMeme() {
//     saveToStorage('meme', gMeme)
// }

function saveMeme() {
    const currMeme = getMeme()

    renderMeme()

    const dataUrl = gElCanvas.toDataURL()

    currMeme.imgUrl = dataUrl

    let savedMemes = loadFromStorage('memes') || []; // Load existing memes or initialize an empty array

    // Push the current meme (gMeme) into the array of saved memes
    savedMemes.push(currMeme);

    saveToStorage('memes', savedMemes); // Save the updated array back to local storage
}

function deleteMeme(index) {
    let savedMemes = loadFromStorage('memes') || []; // Load existing memes or initialize an empty array

    // Remove the meme at the specified index from the array
    savedMemes.splice(index, 1);

    saveToStorage('memes', savedMemes); // Save the updated array back to local storage
}
