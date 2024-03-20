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
    drawImogis()
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

    drawRect(x -10 , y, textWidth +20 , textHeight +10)

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
    drawImogis()
}

function drawImogis() {
    currMeme = getMeme()
    currMeme.imogis.forEach(imogi => {
        gCtx.drawImage(imogi.img, imogi.pos.x, imogi.pos.y, imogi.size, imogi.size)
    })
}


function onDown(ev) {
    gStartPos = getEvPos(ev)

    if (!isTextClicked(gStartPos) && !isImogiClicked(gStartPos)) return

    if (isTextClicked(gStartPos)) {
        setTextDrag(true)
    } else if(isImogiClicked(gStartPos)){
        setImogiDrag(true)
    }

    document.body.style.cursor = 'move'
}

function onMove(ev) {
    const currMeme = getMeme()
    const currLine = currMeme.lines[currMeme.selectedLineIdx - 1]
    const currImogi = currMeme.imogis[currMeme.selectedImogiIdx - 1]

    if (currMeme.selectedImogiIdx != 0) {
        const isImogiDrag = currImogi.isDrag

        if (!isImogiDrag) return

        const pos = getEvPos(ev)

        const dx = pos.x - gStartPos.x
        const dy = pos.y - gStartPos.y
  
        moveImogi(dx, dy)

        gStartPos = pos

        renderMeme()
        drawFrame()

        return
    }

    const { isDrag } = currLine

    if (!isDrag) return

    const pos = getEvPos(ev)

    const dx = pos.x - gStartPos.x
    const dy = pos.y - gStartPos.y

    if(isDrag) {
        moveText(dx, dy)
    } 
    gStartPos = pos

    renderMeme()
    drawFrame()
}

function onUp() {
    setTextDrag(false)
    
    document.body.style.cursor = 'grab'

    if (currMeme.selectedImogiIdx != 0) {
        setImogiDrag(false)
        currMeme.selectedImogiIdx = 0
    }
}

function getEvPos(ev) {
    if (TOUCH_EVENTS.includes(ev.type)) {

        ev.preventDefault()
        ev = ev.changedTouches[0]

        return {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
        }

    } else {
        return {
            x: ev.offsetX,
            y: ev.offsetY,
        }
    }
}

function isTextClicked(clickedPos) {
    const currMeme = getMeme()
    const offsetX = clickedPos.x
    const offsetY = clickedPos.y

    const line = currMeme.lines.find(line => {
        const textMetrics = gCtx.measureText(line.txt)
        const textWidth = textMetrics.width
        const textHeight = parseInt(line.size)
        const { x, y } = line.pos

        return (
            offsetX >= x && offsetX <= x + textWidth &&
            offsetY >= y - (textHeight + 20) / 2 && offsetY <= y + (textHeight + 20) / 2
        )
    })

    if (line) {
        currMeme.selectedLineIdx = line.idx
        return true
    } else {
        renderMeme()
        return false
    }
}

function isImogiClicked(clickedPos) {
    const currMeme = getMeme()
    const offsetX = clickedPos.x
    const offsetY = clickedPos.y

    const imogi = currMeme.imogis.find(imogi => {
        var width = imogi.img.naturalWidth
        var height = imogi.img.naturalHeight
        const { x, y } = imogi.pos

        return (
            offsetX >= x && offsetX <= x + width &&
            offsetY >= y - (height + 20) / 2 && offsetY <= y + (height + 20) / 2
        )
    })

    if (imogi) {
        currMeme.selectedImogiIdx = imogi.idx
        return true
    } else {
        renderMeme()
        return false
    }
}

function setTextDrag(isDrag) {
    const currMeme = getMeme()

    currMeme.lines[currMeme.selectedLineIdx - 1].isDrag = isDrag
}

function setImogiDrag(isDrag) {
    const currMeme = getMeme()

    currMeme.imogis[currMeme.selectedImogiIdx -1].isDrag = isDrag

}

function moveText(dx, dy) {
    const currMeme = getMeme()

    currMeme.lines[currMeme.selectedLineIdx - 1].pos.x += dx
    currMeme.lines[currMeme.selectedLineIdx - 1].pos.y += dy
}

function moveImogi(dx, dy) {
    const currMeme = getMeme()

    currMeme.imogis[currMeme.selectedImogiIdx - 1].pos.x += dx
    currMeme.imogis[currMeme.selectedImogiIdx - 1].pos.y += dy
}

