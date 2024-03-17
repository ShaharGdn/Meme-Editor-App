'use strict'

let gElCanvas
let gCtx
const currMeme = getMeme()

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

    var imageHTML = gImgs.map(image => {
        return `<img class='gallery-img img${image.id}' src='${image.url}' data-id='${image.id}' onclick=onImgSelect(this)>`
    })

    elGallery.innerHTML = imageHTML.join('')
}

function onImgSelect(elImg) {
    const imgId = elImg.dataset.id
    setImg(imgId)

    renderMeme()
}

function renderMeme() {
    const meme = getMeme()
    const elImg = getElImg()

    coverCanvasWithImg(elImg)

    const { lines } = meme

    lines.forEach(line => {
        drawText(line.txt, line.idx)
    })


    setCurrLineInput()
}

function onTxtInput(elInput) {
    const lineIdx = elInput.dataset.idx
    const value = elInput.value
    setLineTxt(value)

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

function onAddLine(ev) {
    const elLinesContainer = document.querySelector('.lines-container')

    ev.preventDefault()

    addLine()

    // const html =  `<input type="text" oninput="onTxtInput(this)" data-idx=${meme.lines.length} placeholder="Enter text here">`
    // elLinesContainer.innerHTML += html

    renderMeme()
}

function onSwitchLine(ev) {
    ev.preventDefault()

    switchSelectedLine()
    drawFrame()
    setCurrLineInput()
}


function drawFrame() {
    console.log('currMeme.lines:', currMeme.lines)
    const text = currMeme.lines[currMeme.selectedLineIdx - 1].txt

    const textMetrics = gCtx.measureText(text)
    const textWidth = textMetrics.width;
    const textHeight = parseInt(gTextSettings.size)


    drawRect((gElCanvas.width - textWidth) / 2, textHeight - 5, textWidth, textHeight)
}

function drawRect(x, y, textWidth, textHeight) {
    gCtx.strokeStyle = 'black'
    gCtx.lineWidth = 1
    gCtx.strokeRect(x, y, textWidth + 5, textHeight)
}

function drawText(text, lineIdx) {
    gCtx.font = `${gTextSettings.size}px ${gTextSettings.font}`

    const textMetrics = gCtx.measureText(text)
    const textWidth = textMetrics.width;
    const textHeight = parseInt(gTextSettings.size)

    gCtx.lineWidth = 0.5
    gCtx.strokeStyle = gTextSettings.stroke

    var y = lineIdx * 50


    gCtx.fillStyle = gTextSettings.color
    gCtx.textAlign = gTextSettings.align

    gCtx.fillText(text, 200, y)
    gCtx.strokeText(text, 200, y)


    if (lineIdx === currMeme.selectedLineIdx) {
        drawRect((gElCanvas.width - textWidth) / 2, textHeight - 5, textWidth, textHeight)
    }
}

function setCurrLineInput() {
    const currLineIdx = currMeme.selectedLineIdx

    const elInput = document.querySelector('.text-input')

    elInput.value = currMeme.lines[currLineIdx - 1].txt
}