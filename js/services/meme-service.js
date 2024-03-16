'use strict'

// var gMeme

var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [{ txt: 'I sometimes eat Falafel', size: 20, color: 'red' }]
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

function setLineTxt(txt, lineIdx) {
    gMeme.lines[lineIdx].txt = txt
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

function drawText(text, x, y) {
    gCtx.lineWidth = 0.5
    gCtx.strokeStyle = gTextSettings.stroke

    gCtx.fillStyle = gTextSettings.color

    gCtx.font = `${gTextSettings.size}px ${gTextSettings.font}`
    gCtx.textAlign = gTextSettings.align

    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)
}