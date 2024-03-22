'use strict'

var gMeme

function createMeme(imgId) {
    gMeme = {
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

function addLine() {
    if(!currMeme.lines.length) {
        gMeme.lines.push({ txt: 'Enter Text', size: 20, stroke: 'white', color: 'white', align: 'center', pos: { x: 50, y:50 }, isDrag: false , font: 'Impact'})
        gMeme.selectedLineIdx = 0
        return
    }

    const y = gMeme.lines[gMeme.lines.length - 1].pos.y + 50
    gMeme.lines.push({ txt: 'Enter Text', size: 35, stroke: 'white', color: 'white', align: 'center', pos: { x: 180, y }, isDrag: false , font: 'Impact'})
    gMeme.selectedLineIdx = gMeme.lines.length -1
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

    gMeme.selectedLineIdx += dir

    if (gMeme.selectedLineIdx >= gMeme.lines.length) {
        gMeme.selectedLineIdx = 0
    }

    renderMeme()
    drawFrame()
}

// function setTextDrag(isDrag) {
//     if (!gMeme.lines.length) return

//     const idx = gMeme.selectedLineIdx
//     const currLine = gMeme.lines[idx]

//     currLine.isDrag = isDrag
// }
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

// old code

// function createMeme(imgId) {
//     gMeme = {
//         selectedImgId: imgId,
//         selectedLineIdx: 1,
//         selectedImogiIdx: 0,
//         lines: [
//             { txt: 'Enter Text', size: 35, stroke: 'white', color: 'white', align: 'center', idx: 1, pos: { x: 180, y: 50 }, isDrag: false , font: 'Impact'},
//         ],
//         imogis: []
//     }

//     return gMeme
// }

// function getMeme() {
//     return gMeme
// }

// function setLineTxt(text) {
//     const idx = gMeme.selectedLineIdx

//     gMeme.lines[idx - 1].txt = text
// }

// function setStrokeColor(color) {
//     const idx = gMeme.selectedLineIdx

//     gMeme.lines[idx - 1].stroke = color
//     // gTextSettings.stroke = color
// }

// function setFillColor(color) {
//     const idx = gMeme.selectedLineIdx

//     gMeme.lines[idx - 1].color = color
//     // gTextSettings.color = color
// }

// function increaseFontSize() {
//     const idx = gMeme.selectedLineIdx

//     if (gMeme.lines[idx - 1].size >= 40) {
//         return
//     }
//     gMeme.lines[idx - 1].size += 2
// }

// function decreaseFontSize() {
//     const idx = gMeme.selectedLineIdx

//     if (gMeme.lines[idx - 1].size <= 25) {
//         return
//     }

//     gMeme.lines[idx - 1].size -= 2
// }

// function addLine() {

//     if(!currMeme.lines.length) {
//         gMeme.lines.push({ txt: 'Enter Text', size: 20, stroke: 'white', color: 'white', align: 'left', idx: 1, pos: { x: 50, y:50 }, isDrag: false , font: 'Impact'})
//         gMeme.selectedLineIdx = gMeme.lines.length
//         return
//     }

//     const y = gMeme.lines[gMeme.lines.length - 1].pos.y + 50
//     gMeme.lines.push({ txt: 'Enter Text', size: 35, stroke: 'white', color: 'white', align: 'center', idx: `${gMeme.lines.length + 1}`, pos: { x: 180, y }, isDrag: false , font: 'Impact'})
//     gMeme.selectedLineIdx = gMeme.lines.length
// }

// function switchSelectedLine() {
//     if (gMeme.selectedLineIdx >= gMeme.lines.length) {
//         gMeme.selectedLineIdx = 1
//         renderMeme()
//         drawFrame()
//         return
//     }
//     gMeme.selectedLineIdx++
//     renderMeme()
//     drawFrame()

//     return
// }

// function shiftSelectedLine(dir) {
//     gMeme.selectedLineIdx += dir

//     if (gMeme.selectedLineIdx > gMeme.lines.length) {
//         gMeme.selectedLineIdx = 1
//     } else if (gMeme.selectedLineIdx <= 0) {
//         gMeme.selectedLineIdx = gMeme.lines.length
//     }

//     renderMeme()
//     drawFrame()
// }

// function addImogi(elImg) {
//     gMeme.imogis.push({ idx: `${gMeme.imogis.length + 1}`, pos: { x: 0, y: 0 }, size: 50, isDrag: false, img: elImg })
// }

// function setTextDrag(isDrag) {
//     if (!gMeme.lines.length) return

//     const currLine = findLineByIdx(gMeme.selectedLineIdx)

//     currLine.isDrag = isDrag
//     // gMeme.lines[gMeme.selectedLineIdx - 1].isDrag = isDrag
// }

// function setImogiDrag(isDrag) {
//     gMeme.imogis[gMeme.selectedImogiIdx - 1].isDrag = isDrag
// }

// function moveText(dx, dy) {
//     const currMeme = getMeme()
//     const currLine = findLineByIdx(currMeme.selectedLineIdx)

//     // gMeme.lines[gMeme.selectedLineIdx - 1].pos.x += dx
//     // gMeme.lines[gMeme.selectedLineIdx - 1].pos.y += dy
//     currLine.pos.x += dx
//     currLine.pos.y += dy
// }

// function moveImogi(dx, dy) {
//     gMeme.imogis[gMeme.selectedImogiIdx - 1].pos.x += dx
//     gMeme.imogis[gMeme.selectedImogiIdx - 1].pos.y += dy
// }

// // function alignText(dir) {
// //     gMeme.lines[gMeme.selectedLineIdx - 1].align = dir
// // }

// function alignText(dir) {
//     const meme = getMeme()
//     const selectedLine = meme.lines[meme.selectedLineIdx -1]
//     let newXPos
    
//     if (dir === 'left') {
//         newXPos = selectedLine.size / 2 + 50
//     } else if (dir === 'right') {
//         newXPos = gElCanvas.width - selectedLine.size / 2 - 50
//     } else {
//         newXPos = gElCanvas.width / 2
//     }

//     selectedLine.pos.x = newXPos
// }

// function setFont(fontFamily) {
//     gMeme.lines[gMeme.selectedLineIdx - 1].font = fontFamily
// }

// function removeLine() {
//     if (gMeme.lines.length === 0) return

//     gMeme.lines.splice(gMeme.selectedLineIdx -1 , 1)

//     gMeme.selectedLineIdx--

//     if (gMeme.selectedLineIdx > gMeme.lines.length) {
//         gMeme.selectedLineIdx = 1
//         return
//     } else if (gMeme.selectedLineIdx <= 0) {
//         gMeme.selectedLineIdx = 1
//         return
//     }
// }


