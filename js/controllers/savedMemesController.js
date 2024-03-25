'use strict'

var gSavedMemes = loadFromStorage('memes')

function onSaveMeme() {
    saveMeme()
    location.reload()
}

function showSavedMemes() {
    const elEditor = document.querySelector('.meme-editor')
    const elGallery = document.querySelector('.gallery-view')
    const elSavedMemes = document.querySelector('.saved-memes')
    const elAboutSec = document.querySelector('.about-view')

    elAboutSec.classList.add('hide')
    elGallery.classList.add('hide')
    elEditor.classList.add('hide')
    elSavedMemes.classList.remove('hide')

    const elBody = document.querySelector('body')

    elBody.classList.remove('gallery')
    elBody.classList.remove('about')
    elBody.classList.add('saved')

    renderSavedMemes()
    toggleMenu()
}

function showAbout() {
    const elEditor = document.querySelector('.meme-editor')
    const elGallery = document.querySelector('.gallery-view')
    const elSavedMemes = document.querySelector('.saved-memes')
    const elAboutSec = document.querySelector('.about-view')

    elGallery.classList.add('hide')
    elEditor.classList.add('hide')
    elSavedMemes.classList.add('hide')
    elAboutSec.classList.remove('hide')

    const elBody = document.querySelector('body')

    elBody.classList.remove('gallery')
    elBody.classList.remove('saved')
    elBody.classList.add('about')

    toggleMenu()
}

function renderSavedMemes() {
    const elSavedGallery = document.querySelector('.saved-memes-container')

    if (!gSavedMemes) {
        gSavedMemes = gDemoData
    }
    
    var imageHTML = gSavedMemes.map(meme => {
        const stringifyMeme = JSON.stringify(meme)
        return `<img class='gallery-img img${meme.imgUrl}' src='${meme.imgUrl}' data-meme='${stringifyMeme}' onclick=onRenderSavedMeme(this)>`
    })
    
    elSavedGallery.innerHTML = imageHTML.join('')
}

function onRenderSavedMeme(elImg) {
    const meme = elImg.dataset.meme

    const parsedMeme = JSON.parse(meme)

    const elBody = document.querySelector('body')

    elBody.classList.remove('gallery')


    gMeme = parsedMeme

    renderMeme()
    drawFrame()
}

