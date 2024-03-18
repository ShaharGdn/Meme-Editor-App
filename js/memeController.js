'use strict'

let gElCanvas
let gCtx
let currMeme

function renderMeme() {
    const elImg = getElImg()
    currMeme = getMeme()

    coverCanvasWithImg(elImg)

    const { lines } = currMeme

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
    const elEditor = document.querySelector('.meme-editor')
    const elGallery = document.querySelector('.gallery-container')

    gElCanvas.height = (elImg.naturalHeight / elImg.naturalWidth) * gElCanvas.width
    gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)

    elGallery.classList.add('hide')
    elEditor.classList.remove('hide')
}

function getElImg() {
    // const meme = getMeme()
    currMeme = getMeme()

    const elImg = document.querySelector(`.img${currMeme.selectedImgId}`)

    return elImg
}

function onDownloadCanvas(elLink) {
    // const meme = getMeme()

    elLink.href = '#'
    const dataUrl = gElCanvas.toDataURL()

    elLink.href = dataUrl
    elLink.download = `meme${currMeme.selectedImgId}`
}

function backToGallery() {

    const elEditor = document.querySelector('.meme-editor')
    const elGallery = document.querySelector('.gallery-container')

    elEditor.classList.add('hide')
    elGallery.classList.remove('hide')
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
    // const elLinesContainer = document.querySelector('.lines-container')
    // const html =  `<input type="text" oninput="onTxtInput(this)" data-idx=${meme.lines.length} placeholder="Enter text here">`
    // elLinesContainer.innerHTML += html
    ev.preventDefault()

    addLine()
    renderMeme()
}

function onSwitchLine(ev) {
    ev.preventDefault()

    switchSelectedLine()

    drawFrame()

    setCurrLineInput()
}


function drawText(text, lineIdx) {
    currMeme = getMeme()

    const currLine = currMeme.lines[lineIdx - 1]
    const pos = currLine.pos

    gCtx.font = `${currLine.size}px ${currLine.font}`

    const textMetrics = gCtx.measureText(text)
    const textWidth = textMetrics.width;
    const textHeight = parseInt(currLine.size)

    gCtx.lineWidth = 0.5
    gCtx.strokeStyle = currLine.stroke

    // var y = lineIdx * 50


    gCtx.fillStyle = currLine.color
    gCtx.textAlign = currLine.align

    gCtx.fillText(text, pos.x, pos.y)
    gCtx.strokeText(text, pos.x, pos.y)


    // if (lineIdx === currMeme.selectedLineIdx) {
    //     drawRect((gElCanvas.width - textWidth) / 2, textHeight - 5, textWidth, textHeight)
    // }
}
// function drawText(text, lineIdx) {
//     gCtx.font = `${gTextSettings.size}px ${gTextSettings.font}`

//     const textMetrics = gCtx.measureText(text)
//     const textWidth = textMetrics.width;
//     const textHeight = parseInt(gTextSettings.size)

//     gCtx.lineWidth = 0.5
//     gCtx.strokeStyle = gTextSettings.stroke

//     var y = lineIdx * 50


//     gCtx.fillStyle = gTextSettings.color
//     gCtx.textAlign = gTextSettings.align

//     gCtx.fillText(text, 200, y)
//     gCtx.strokeText(text, 200, y)


//     // if (lineIdx === currMeme.selectedLineIdx) {
//     //     drawRect((gElCanvas.width - textWidth) / 2, textHeight - 5, textWidth, textHeight)
//     // }
// }

function drawFrame() {
    currMeme = getMeme()

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

function setCurrLineInput() {
    currMeme = getMeme()


    const currLineIdx = currMeme.selectedLineIdx

    const elInput = document.querySelector('.text-input')

    elInput.value = currMeme.lines[currLineIdx - 1].txt
}