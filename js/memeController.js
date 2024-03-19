'use strict'

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
    const value = elInput.value
    setLineTxt(value)

    renderMeme()
}

function coverCanvasWithImg(elImg) {
    const elEditor = document.querySelector('.meme-editor')
    const elGallery = document.querySelector('.gallery-view')

    gElCanvas.height = (elImg.naturalHeight / elImg.naturalWidth) * gElCanvas.width
    gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)

    elGallery.classList.add('hide')
    elEditor.classList.remove('hide')
}

function getElImg() {
    currMeme = getMeme()

    const elImg = document.querySelector(`.img${currMeme.selectedImgId}`)

    return elImg
}

function onDownloadCanvas(elLink) {
    const currMeme = getMeme()

    renderMeme()

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

    location.reload()
}

function onFillColorChange(color) {
    console.log('hi:')
    setFillColor(color)
    renderMeme()
    drawFrame()
}

function onStrokeColorChange(color) {
    setStrokeColor(color)
    renderMeme()
    drawFrame()
}

function onIncreaseFont(ev) {
    ev.preventDefault()

    increaseFontSize()
    renderMeme()
    drawFrame()

}

function onDecreaseFont(ev) {
    ev.preventDefault()

    decreaseFontSize()
    renderMeme()
    drawFrame()

}

function onAddLine(ev) {
    // ev.preventDefault()

    addLine()

    renderMeme()
    drawFrame()
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

    if (currLine.isImogi) {
        onAddImogi(currLine.img)
        return
    }
    
    const pos = currLine.pos

    gCtx.font = `${currLine.size}px ${currLine.font}`

    const textMetrics = gCtx.measureText(text)
    const textWidth = textMetrics.width;
    const textHeight = parseInt(currLine.size)

    gCtx.lineWidth = 0.5
    gCtx.strokeStyle = currLine.stroke


    gCtx.fillStyle = currLine.color
    gCtx.textAlign = currLine.align

    gCtx.fillText(text, pos.x, pos.y)
    gCtx.strokeText(text, pos.x, pos.y)
}

function drawFrame() {
    const currMeme = getMeme()
    const currLine = currMeme.lines[currMeme.selectedLineIdx - 1]

    gCtx.save()

    gCtx.font = `${currLine.size}px ${currLine.font}`
    gCtx.textAlign = currLine.align

    const textMetrics = gCtx.measureText(currLine.txt)
    const textWidth = textMetrics.width
    const textHeight = currLine.size

    const { x, y } = calculateRectPosition(currLine.pos.x, currLine.pos.y, textWidth, currLine.size, gCtx.textAlign)

<<<<<<< HEAD
    drawRect(x -10 , y, textWidth +20 , textHeight +10)
=======
    drawRect(x - 10, y, textWidth + 20, textHeight + 10)
>>>>>>> be7d2da (Add support for selectable lines)

    gCtx.restore()
}

function drawRect(x, y, textWidth, textHeight) {
    gCtx.strokeStyle = 'red'
    gCtx.lineWidth = 1
    gCtx.strokeRect(x, y, textWidth, textHeight)
}

function calculateRectPosition(x, y, textWidth, textSize, textAlign) {
    let rectX = x
    let rectY = y - textSize // Adjusted y-coordinate to position the frame above the text

    if (textAlign === 'center') {
        rectX -= textWidth / 2 // Adjust x-coordinate for center alignment
    } else if (textAlign === 'right') {
        rectX -= textWidth; // Adjust x-coordinate for right alignment
    }
    return { x: rectX, y: rectY }
}


function setCurrLineInput() {
    currMeme = getMeme()
    const currLineIdx = currMeme.selectedLineIdx
    const currLine = currMeme.lines[currLineIdx - 1]

    const elInput = document.querySelector('.text-input')

    elInput.value = currLine.txt
}

function onAddImogi(elImg) {
    addImogi(elImg)
    gCtx.drawImage(elImg, 0, 0, 50, 50)
}