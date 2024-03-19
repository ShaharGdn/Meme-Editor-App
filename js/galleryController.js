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
    // setImg(imgId)

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


function onDown(ev) {

    // Save the position we started from...
    // Get the event position from mouse or touch
    gStartPos = getEvPos(ev)

    if (!isTextClicked(gStartPos)) return

    setTextDrag(true)
    document.body.style.cursor = 'move'
}

function onMove(ev) {
    const currMeme = getMeme()
    const currLine = currMeme.lines[currMeme.selectedLineIdx - 1]

    const { isDrag } = currLine
    if (!isDrag) return

    const pos = getEvPos(ev)

    // Calc the delta, the diff we moved
    const dx = pos.x - gStartPos.x
    const dy = pos.y - gStartPos.y

    moveText(dx, dy)

    // Save the last pos, we remember where we`ve been and move accordingly
    gStartPos = pos

    // The canvas is rendered again after every move
    renderMeme()
    drawFrame()
}

function onUp() {
    setTextDrag(false)
    document.body.style.cursor = 'grab'
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


function setTextDrag(isDrag) {
    gMeme.lines[gMeme.selectedLineIdx - 1].isDrag = isDrag
}

// Move the Line by a delta from the pervious pos

function moveText(dx, dy) {
    gMeme.lines[gMeme.selectedLineIdx - 1].pos.x += dx
    gMeme.lines[gMeme.selectedLineIdx - 1].pos.y += dy
}
