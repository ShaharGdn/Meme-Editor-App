'use strict'

var gMeme

function createMeme(imgId) {
    gMeme = {
        selectedImgId: imgId,
        selectedLineIdx: 1,
        selectedImogiIdx: 0,
        lines: [
            { txt: 'Enter Text', size: 30, stroke: 'white', color: 'white', align: 'left', idx: 1, pos: { x: 50, y: 50 }, isDrag: false , font: 'Impact'},
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

    if(!currMeme.lines.length) {
        gMeme.lines.push({ txt: 'Enter Text', size: 20, stroke: 'white', color: 'white', align: 'left', idx: 1, pos: { x: 50, y:50 }, isDrag: false , font: 'Impact'})
        gMeme.selectedLineIdx = gMeme.lines.length
        return
    }

    const y = gMeme.lines[gMeme.lines.length - 1].pos.y + 50
    gMeme.lines.push({ txt: 'Enter Text', size: 20, stroke: 'white', color: 'white', align: 'left', idx: `${gMeme.lines.length + 1}`, pos: { x: 50, y }, isDrag: false , font: 'Impact'})
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

function shiftSelectedLine(dir) {
    gMeme.selectedLineIdx += dir;

    if (gMeme.selectedLineIdx > gMeme.lines.length) {
        gMeme.selectedLineIdx = 1
    } else if (gMeme.selectedLineIdx <= 0) {
        gMeme.selectedLineIdx = gMeme.lines.length
    }

    renderMeme()
    drawFrame()
}

function addImogi(elImg) {
    gMeme.imogis.push({ idx: `${gMeme.imogis.length + 1}`, pos: { x: 0, y: 0 }, size: 50, isDrag: false, img: elImg })
}

function setTextDrag(isDrag) {
    if (!gMeme.lines.length) return

    gMeme.lines[gMeme.selectedLineIdx - 1].isDrag = isDrag
}

function setImogiDrag(isDrag) {
    gMeme.imogis[gMeme.selectedImogiIdx - 1].isDrag = isDrag
}

function moveText(dx, dy) {
    gMeme.lines[gMeme.selectedLineIdx - 1].pos.x += dx
    gMeme.lines[gMeme.selectedLineIdx - 1].pos.y += dy
}

function moveImogi(dx, dy) {
    gMeme.imogis[gMeme.selectedImogiIdx - 1].pos.x += dx
    gMeme.imogis[gMeme.selectedImogiIdx - 1].pos.y += dy
}

function alignText(dir) {
    gMeme.lines[gMeme.selectedLineIdx - 1].align = dir
}

function setFont(fontFamily) {
    gMeme.lines[gMeme.selectedLineIdx - 1].font = fontFamily
}

function removeLine() {
    gMeme.lines.splice(gMeme.selectedLineIdx -1, 1)
    gMeme.selectedLineIdx--
}