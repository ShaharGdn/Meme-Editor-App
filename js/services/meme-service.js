'use strict'

// var gMeme

var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 1,
    lines: [
        { txt: 'I sometimes eat Falafel', size: 20, color: 'red', idx: 1 },
        // { txt: 'Im a goat', size: 20, color: 'red' , idx: 2 }
    ]
}

var gTextSettings = {
    font: 'Arial',
    size: 30,
    color: 'black',
    stroke: 'white',
    align: 'center'
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
    var idx = gMeme.selectedLineIdx

    gMeme.lines[idx -1].txt = text
}

function setStrokeColor(color) {
    gTextSettings.stroke = color
}

function setFillColor(color) {
    gTextSettings.color = color
}

function increaseFontSize() {
    if (gTextSettings.size >= 40) {
        return
    }
    gTextSettings.size += 5
}

function decreaseFontSize() {
    if (gTextSettings.size <= 25) {
        return
    }

    gTextSettings.size -= 5
}

function addLine() {
    gMeme.lines.push({ txt: 'Enter Text', idx: `${gMeme.lines.length + 1}` })
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

// function getLineByIdx(index) {
//     const line = gMeme.lines.find(line => line.idx === index)
//     return line
// }
