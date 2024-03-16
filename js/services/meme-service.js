'use strict'

// var gMeme

var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [{ txt: 'I sometimes eat Falafel', size: 20, color: 'red' }]
}

function getMeme() {
    return gMeme
}

function setImg(id) {
        gMeme.selectedImgId = id
}

function setLineTxt(txt, lineIdx) {
    gMeme.lines[lineIdx].txt = txt
}