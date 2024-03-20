'use strict'

let gElCanvas
let gCtx
let gStartPos

var gImgs = [
    { id: 1, url: 'assets/images/1.jpg', keywords: ['funny', 'trump'] },
    { id: 2, url: 'assets/images/2.jpg', keywords: ['dog', 'cute'] },
    { id: 3, url: 'assets/images/3.jpg', keywords: ['baby', 'cute'] },
]

const TOUCH_EVENTS = ['touchstart', 'touchmove', 'touchend']

var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }

function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')

    addListeners()

    renderImages()
}

function renderImages() {
    const elGallery = document.querySelector('.gallery-container')

    var imageHTML = gImgs.map(image => {
        return `<img class='gallery-img img${image.id}' src='${image.url}' data-id='${image.id}' onclick=onImgSelect(this)>`
    })

    elGallery.innerHTML = imageHTML.join('')
}

function onImgSelect(elImg) {
    const imgId = elImg.dataset.id
    const elBody = document.querySelector('body')
    // setImg(imgId)

    elBody.classList.remove('gallery')

    createMeme(imgId)

    renderMeme()
    drawFrame()
}

function addListeners() {
    addMouseListeners()
    addTouchListeners()

    // window.addEventListener('resize', () => {
    //     resizeCanvas()

    //     const center = { x: gElCanvas.width / 2, y: gElCanvas.height / 2 }

    //     renderMeme()
    // })
}

function addMouseListeners() {
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchend', onUp)
}