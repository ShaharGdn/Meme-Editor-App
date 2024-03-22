'use strict'

let gElCanvas
let gCtx
let gStartPos

var gImgs = [
    { id: 1, url: 'assets/images/1.jpg', keywords: ['funny', 'trump'] },
    { id: 2, url: 'assets/images/2.jpg', keywords: ['dog', 'cute'] },
    { id: 3, url: 'assets/images/3.jpg', keywords: ['baby', 'cute'] },
    { id: 4, url: 'assets/images/4.jpg', keywords: ['baby', 'cute'] },
    { id: 5, url: 'assets/images/5.jpg', keywords: ['baby', 'cute'] },
    { id: 6, url: 'assets/images/6.jpg', keywords: ['baby', 'cute'] },
    { id: 7, url: 'assets/images/7.jpg', keywords: ['baby', 'cute'] },
    { id: 8, url: 'assets/images/8.jpg', keywords: ['baby', 'cute'] },
    { id: 9, url: 'assets/images/9.jpg', keywords: ['baby', 'cute'] },
    { id: 10, url: 'assets/images/10.jpg', keywords: ['baby', 'cute'] },
    { id: 11, url: 'assets/images/11.jpg', keywords: ['baby', 'cute'] },
    { id: 12, url: 'assets/images/12.jpg', keywords: ['baby', 'cute'] },
    { id: 13, url: 'assets/images/13.jpg', keywords: ['baby', 'cute'] },
    { id: 14, url: 'assets/images/14.jpg', keywords: ['baby', 'cute'] },
    { id: 15, url: 'assets/images/15.jpg', keywords: ['baby', 'cute'] },
    { id: 16, url: 'assets/images/16.jpg', keywords: ['baby', 'cute'] },
    { id: 17, url: 'assets/images/17.jpg', keywords: ['baby', 'cute'] },
    { id: 18, url: 'assets/images/18.jpg', keywords: ['baby', 'cute'] },
    { id: 19, url: 'assets/images/drevil.jpg', keywords: ['baby', 'cute'] },
]

const TOUCH_EVENTS = ['touchstart', 'touchmove', 'touchend']

var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }

function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')

    addListeners()

    resizeCanvas()
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

    window.addEventListener('resize', () => {
        resizeCanvas()
        renderMeme()
        drawFrame()
    })
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

function toggleMenu() {
    document.body.classList.toggle('menu-open');
}



// 'use strict'

// let gElCanvas
// let gCtx
// let gStartPos

// var gImgs = [
//     { id: 1, url: 'assets/images/1.jpg', keywords: ['funny', 'trump'] },
//     { id: 2, url: 'assets/images/2.jpg', keywords: ['dog', 'cute'] },
//     { id: 3, url: 'assets/images/3.jpg', keywords: ['baby', 'cute'] },
//     { id: 4, url: 'assets/images/4.jpg', keywords: ['baby', 'cute'] },
//     { id: 5, url: 'assets/images/5.jpg', keywords: ['baby', 'cute'] },
//     { id: 6, url: 'assets/images/6.jpg', keywords: ['baby', 'cute'] },
//     { id: 7, url: 'assets/images/7.jpg', keywords: ['baby', 'cute'] },
//     { id: 8, url: 'assets/images/8.jpg', keywords: ['baby', 'cute'] },
//     { id: 9, url: 'assets/images/9.jpg', keywords: ['baby', 'cute'] },
//     { id: 10, url: 'assets/images/10.jpg', keywords: ['baby', 'cute'] },
//     { id: 11, url: 'assets/images/11.jpg', keywords: ['baby', 'cute'] },
//     { id: 12, url: 'assets/images/12.jpg', keywords: ['baby', 'cute'] },
//     { id: 13, url: 'assets/images/13.jpg', keywords: ['baby', 'cute'] },
//     { id: 14, url: 'assets/images/14.jpg', keywords: ['baby', 'cute'] },
//     { id: 15, url: 'assets/images/15.jpg', keywords: ['baby', 'cute'] },
//     { id: 16, url: 'assets/images/16.jpg', keywords: ['baby', 'cute'] },
//     { id: 17, url: 'assets/images/17.jpg', keywords: ['baby', 'cute'] },
//     { id: 18, url: 'assets/images/18.jpg', keywords: ['baby', 'cute'] },
//     { id: 19, url: 'assets/images/drevil.jpg', keywords: ['baby', 'cute'] },
// ]

// const TOUCH_EVENTS = ['touchstart', 'touchmove', 'touchend']

// var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }

// function onInit() {
//     gElCanvas = document.querySelector('canvas')
//     gCtx = gElCanvas.getContext('2d')

//     addListeners()

//     resizeCanvas()
//     renderImages()
// }

// function renderImages() {
//     const elGallery = document.querySelector('.gallery-container')

//     var imageHTML = gImgs.map(image => {
//         return `<img class='gallery-img img${image.id}' src='${image.url}' data-id='${image.id}' onclick=onImgSelect(this)>`
//     })

//     elGallery.innerHTML = imageHTML.join('')
// }

// function onImgSelect(elImg) {
//     const imgId = elImg.dataset.id
//     const elBody = document.querySelector('body')
//     // setImg(imgId)

//     elBody.classList.remove('gallery')

//     createMeme(imgId)

//     renderMeme()
//     drawFrame()
// }

// function addListeners() {
//     addMouseListeners()
//     addTouchListeners()

//     window.addEventListener('resize', () => {
//         resizeCanvas()
//         renderMeme()
//         drawFrame()
//     })
// }

// function addMouseListeners() {
//     gElCanvas.addEventListener('mousedown', onDown)
//     gElCanvas.addEventListener('mousemove', onMove)
//     gElCanvas.addEventListener('mouseup', onUp)
// }

// function addTouchListeners() {
//     gElCanvas.addEventListener('touchstart', onDown)
//     gElCanvas.addEventListener('touchmove', onMove)
//     gElCanvas.addEventListener('touchend', onUp)
// }

// function toggleMenu() {
//     document.body.classList.toggle('menu-open');
// }