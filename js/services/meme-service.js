'use strict'

var gMeme

function createMeme(imgId=null) {
    gMeme = {
        imgUrl: null,
        selectedImgId: imgId,
        selectedLineIdx: 0,
        lines: [
            { txt: 'Enter Text', size: 35, stroke: 'white', color: 'white', align: 'center', pos: { x: 180, y: 50 }, isDrag: false , font: 'Impact'},
        ]
    }

    return gMeme
}

function getMeme() {
    return gMeme
}

function setLineTxt(text) {
    const idx = gMeme.selectedLineIdx

    gMeme.lines[idx].txt = text
}

function setStrokeColor(color) {
    const idx = gMeme.selectedLineIdx

    gMeme.lines[idx].stroke = color
}

function setFillColor(color) {
    const idx = gMeme.selectedLineIdx

    gMeme.lines[idx].color = color
}

function increaseFontSize() {
    const idx = gMeme.selectedLineIdx

    if (gMeme.lines[idx].size >= 50) {
        return
    }
    gMeme.lines[idx].size += 2
}

function decreaseFontSize() {
    const idx = gMeme.selectedLineIdx

    if (gMeme.lines[idx].size <= 25) {
        return
    }

    gMeme.lines[idx].size -= 2
}

function addLine(txt) {
    if(!currMeme.lines.length) {
        gMeme.lines.push({txt, size: 35, stroke: 'white', color: 'white', align: 'center', pos: { x: 180, y:50 }, isDrag: false , font: 'Impact'})
        gMeme.selectedLineIdx = 0
        return
    }

    const y = gMeme.lines[gMeme.lines.length - 1].pos.y + 50
    gMeme.lines.push({ txt, size: 35, stroke: 'white', color: 'white', align: 'center', pos: { x: 180, y }, isDrag: false , font: 'Impact'})
    gMeme.selectedLineIdx = gMeme.lines.length -1
}

function removeLine() {
    if (gMeme.lines.length === 0) return
    
    gMeme.lines.splice(gMeme.selectedLineIdx, 1)
    
    // Adjust the selected line index after removal
    if (gMeme.selectedLineIdx >= gMeme.lines.length) {
        gMeme.selectedLineIdx = gMeme.lines.length - 1;
    }
    // Ensure selected line index is within bounds
    if (gMeme.selectedLineIdx < 0) {
        gMeme.selectedLineIdx = -1;
    }
}

function switchSelectedLine() {
    if (gMeme.lines.length === 0) return

    gMeme.selectedLineIdx++

    if (gMeme.selectedLineIdx >= gMeme.lines.length) {
        gMeme.selectedLineIdx = 0
    }
}

function shiftSelectedLine(dir) {
    const idx = gMeme.selectedLineIdx

    const dif = dir * 20

    gMeme.lines[idx].pos.y += dif
}

function setTextDrag(isDrag) {
    if (!currMeme.lines.length || currMeme.selectedLineIdx < 0 || currMeme.selectedLineIdx >= currMeme.lines.length) return

    const idx = gMeme.selectedLineIdx
    if (idx >= 0 && idx < gMeme.lines.length) {
        const currLine = gMeme.lines[idx]
        currLine.isDrag = isDrag
    }
}

function moveText(dx, dy) {
    const idx = gMeme.selectedLineIdx
    const currLine = gMeme.lines[idx]

    currLine.pos.x += dx
    currLine.pos.y += dy
}

function alignText(dir) {
    const idx = gMeme.selectedLineIdx
    const currLine = gMeme.lines[idx]
    let newXPos
    
    if (dir === 'left') {
        newXPos = currLine.size / 2 + 50
    } else if (dir === 'right') {
        newXPos = gElCanvas.width - currLine.size / 2 - 50
    } else {
        newXPos = gElCanvas.width / 2
    }

    currLine.pos.x = newXPos
}

function setFont(fontFamily) {
    const idx = gMeme.selectedLineIdx
    const currLine = gMeme.lines[idx]

   currLine.font = fontFamily
}

