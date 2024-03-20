'use strict'

var gMeme

function createMeme(imgId) {
    gMeme = {
        selectedImgId: imgId,
        selectedLineIdx: 1,
        selectedImogiIdx: 0,
        lines: [
            { txt: 'I sometimes eat Falafel', size: 30, stroke: 'white', color: 'white', align: 'left', idx: 1, pos: { x: 50, y: 50 }, isDrag: false },
        ],
        imogis: []
    }

    return gMeme
}

function getMeme() {
    return gMeme
}

function setLineTxt(text) {
    const idx = gMeme.selectedLineIdx

    gMeme.lines[idx - 1].txt = text
}

function setStrokeColor(color) {
    const idx = gMeme.selectedLineIdx

    gMeme.lines[idx - 1].stroke = color
    // gTextSettings.stroke = color
}

function setFillColor(color) {
    const idx = gMeme.selectedLineIdx

    gMeme.lines[idx - 1].color = color
    // gTextSettings.color = color
}

function increaseFontSize() {
    const idx = gMeme.selectedLineIdx

    if (gMeme.lines[idx - 1].size >= 40) {
        return
    }
    gMeme.lines[idx - 1].size += 2
}

function decreaseFontSize() {
    const idx = gMeme.selectedLineIdx

    if (gMeme.lines[idx - 1].size <= 25) {
        return
    }

    gMeme.lines[idx - 1].size -= 2
}

function addLine() {
    const y = gMeme.lines[gMeme.lines.length - 1].pos.y + 50

    gMeme.lines.push({ txt: 'Enter Text', size: 20, stroke: 'white', color: 'white', align: 'left', idx: `${gMeme.lines.length + 1}`, pos: { x: 50, y }, isDrag: false })

    gMeme.selectedLineIdx = gMeme.lines.length
}


function switchSelectedLine() {
    if (gMeme.selectedLineIdx >= gMeme.lines.length) {
        gMeme.selectedLineIdx = 1
        renderMeme()
        drawFrame()
        return
    }
    gMeme.selectedLineIdx++
    renderMeme()
    drawFrame()

    return
}


function addImogi(elImg) {
    gMeme.imogis.push({ idx: `${gMeme.imogis.length + 1}`, pos: { x: 0, y: 0 }, size:50, isDrag: false, img: elImg})
}