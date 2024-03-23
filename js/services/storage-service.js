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

function saveMeme() {
    const currMeme = getMeme()

    renderMeme()

    const dataUrl = gElCanvas.toDataURL()

    currMeme.imgUrl = dataUrl

    let savedMemes = loadFromStorage('memes') || []

    savedMemes.push(currMeme);

    saveToStorage('memes', savedMemes)
}

function deleteMeme(index) {
    let savedMemes = loadFromStorage('memes') || []

    savedMemes.splice(index, 1)

    saveToStorage('memes', savedMemes)
}
