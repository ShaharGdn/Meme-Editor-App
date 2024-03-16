'use strict'

let gElCanvas
let gCtx

var gImgs = [
    { id: 1, url: '../assets/images/1.jpg', keywords: ['funny', 'trump'] },
    { id: 2, url: '../assets/images/2.jpg', keywords: ['dog', 'cute'] },
    { id: 3, url: '../assets/images/3.jpg', keywords: ['baby', 'cute'] },
]

var gTextSettings = {
    font: 'Arial',
    size: '30px',
    color: 'black',
    stroke: 'white',
    align: 'center'
}

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

function drawText(text, x, y) {
	gCtx.lineWidth = 0.5
	gCtx.strokeStyle = gTextSettings.stroke

	gCtx.fillStyle = gTextSettings.color

	gCtx.font = `${gTextSettings.size} ${gTextSettings.font}`
	gCtx.textAlign = gTextSettings.align
	// gCtx.textBaseline = 'middle'

	gCtx.fillText(text, x, y)
	gCtx.strokeText(text, x, y)
}

function getElImg() {
    const meme = getMeme()

    const elImg = document.querySelector(`.img${meme.selectedImgId}`)

    return elImg
}