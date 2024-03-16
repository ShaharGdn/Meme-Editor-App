'use strict'

let gElCanvas
let gCtx

var gImgs = [
    { id: 1, url: '../assets/images/1.jpg', keywords: ['funny', 'trump'] },
    { id: 2, url: '../assets/images/2.jpg', keywords: ['dog', 'cute'] },
    { id: 3, url: '../assets/images/3.jpg', keywords: ['baby', 'cute'] },
]

var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }

function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')

    renderImages()
}

function renderImages() {
    const elGallery = document.querySelector('.gallery-container')
    console.log('elGallery:', elGallery)

    var imageHTML = gImgs.map(image => {
        return `<img class='gallery-img img${image.id}' src='${image.url}' data-id='${image.id}' onclick=onImgSelect(this)>`
    })

    console.log('imageHTML:', imageHTML)
    elGallery.innerHTML = imageHTML.join('')
}

function onImgSelect(elImg) {
    const imgId = elImg.dataset.id
    setImg(imgId)

    // coverCanvasWithImg(elImg)
    renderMeme()
}

function renderMeme() {
    const meme = getMeme()
    const elImg = getElImg()
    
    coverCanvasWithImg(elImg)

    const {lines} = meme
    
    lines.forEach(line => {
        drawText(line.txt,200,50)
    })
}


function onTxtInput(input) {
    setLineTxt(input, 0)

    renderMeme()
}

function coverCanvasWithImg(elImg) {
    const elModal = document.querySelector('.editor-modal')

    gElCanvas.height = (elImg.naturalHeight / elImg.naturalWidth) * gElCanvas.width
    gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)

    elModal.showModal()
}

function getElImg() {
    const meme = getMeme()

    const elImg = document.querySelector(`.img${meme.selectedImgId}`)

    return elImg
}

function onDownloadCanvas(elLink) {
    const meme = getMeme()

	elLink.href = '#'
	const dataUrl = gElCanvas.toDataURL()

	elLink.href = dataUrl
	elLink.download = `meme${meme.selectedImgId}`
}

function onFillColorChange(color) {
    setFillColor(color)
    renderMeme()
}

function onStrokeColorChange(color) {
    setStrokeColor(color)
    renderMeme()
}

function onIncreaseFont(ev) {
    ev.preventDefault()
    increaseFontSize()
    renderMeme()
}
function onDecreaseFont(ev) {
    ev.preventDefault()
    decreaseFontSize()
    renderMeme()
}