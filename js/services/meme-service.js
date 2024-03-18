'use strict'

var gMeme

// var gMeme = {
//     selectedImgId: 5,
//     selectedLineIdx: 1,
//     lines: [
//         { txt: 'I sometimes eat Falafel', size: 20, stroke: 'red', color: 'black', align: 'center', idx: 1, pos: { x: 200, y: 50 }, isDrag: false },
//     ]
// }

function createMeme(imgId) {
    gMeme = {
        selectedImgId: imgId,
        selectedLineIdx: 1,
        lines: [
            { txt: 'I sometimes eat Falafel', size: 20, stroke: 'red', color: 'black', align: 'center', idx: 1, pos: { x: 200, y: 50 }, isDrag: false },
        ]
    }

    return gMeme
}

function getMeme() {
    return gMeme
}

function getSettings() {
    return gTextSettings
}

function setImg(id) {
    gMeme.selectedImgId = id
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
    // gMeme.lines.push({ txt: 'Enter Text', idx: `${gMeme.lines.length + 1}` })
    const y = gMeme.lines[gMeme.lines.length - 1].pos.y + 50

    gMeme.lines.push({ txt: 'Enter Text', size: 20, stroke: 'red', color: 'black', align: 'center', idx: `${gMeme.lines.length + 1}`, pos: { x: 200, y }, isDrag: false })
}


function switchSelectedLine() {
    // if (gMeme.selectedLineIdx >= gMeme.lines.length) {
    //     gMeme.selectedLineIdx = 1
    //     return
    // }
    // gMeme.selectedLineIdx++

    console.log(gMeme.selectedLineIdx)

    if (gMeme.selectedLineIdx === 0) {
        gMeme.selectedLineIdx = 1
        return
    }
    if (gMeme.selectedLineIdx === 1) {
        gMeme.selectedLineIdx = 2
        return
    }
    if (gMeme.selectedLineIdx === 2) {
        gMeme.selectedLineIdx = 1
        return
    }

}
