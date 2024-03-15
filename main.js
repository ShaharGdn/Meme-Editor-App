'use strict'

var gImgs = [
    { id: 1, url: '../assets/images/1.jpg', keywords: ['funny', 'trump'] },
    { id: 2, url: '../assets/images/2.jpg', keywords: ['dog', 'cute'] },
    { id: 3, url: '../assets/images/3.jpg', keywords: ['baby', 'cute'] },
]
var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [{ txt: 'I sometimes eat Falafel', size: 20, color: 'red' }]
}
var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }

function onInit() {
    console.log('hi')
    renderImages()
}

function renderImages() {
    const elGallery = document.querySelector('.gallery-container')
    console.log('elGallery:', elGallery)

    var imageHTML = gImgs.map(image => {
        return `<img class='gallery-img ${image.id}' src='${image.url}'>`
    })

    console.log('imageHTML:', imageHTML)
    elGallery.innerHTML = imageHTML.join('')
}