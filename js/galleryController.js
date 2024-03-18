'use strict'

var gImgs = [
    { id: 1, url: '../assets/images/1.jpg', keywords: ['funny', 'trump'] },
    { id: 2, url: '../assets/images/2.jpg', keywords: ['dog', 'cute'] },
    { id: 3, url: '../assets/images/3.jpg', keywords: ['baby', 'cute'] },
]

var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }

function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')

    // addListeners()

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
}

// function addListeners() {
//     addMouseListeners()
//     addTouchListeners()

//     // window.addEventListener('resize', () => {
//     //     resizeCanvas()

//     //     const center = { x: gElCanvas.width / 2, y: gElCanvas.height / 2 }
//     //     createCircle(center)

//     //     renderMeme()
//     // })
// }

// function addMouseListeners() {
//     gElCanvas.addEventListener('mousedown', onDown)
//     gElCanvas.addEventListener('mousemove', onMove)
//     gElCanvas.addEventListener('mouseup', onUp)
// }

// function addTouchListeners() {
//     gElCanvas.addEventListener('touchstart', onDown)
//     gElCanvas.addEventListener('touchmove', onMove)
//     gElCanvas.addEventListener('touchend', onUp)
// }


// function onDown(ev) {

//     // Save the position we started from...
//     // Get the event position from mouse or touch
//     gStartPos = getEvPos(ev)

//     if (!isCircleClicked(gStartPos)) return

//     setCircleDrag(true)
//     document.body.style.cursor = 'grabbing'
// }

// function onMove(ev) {
//     const { isDrag } = getCircle()
//     if (!isDrag) return

//     const pos = getEvPos(ev)

//     // Calc the delta, the diff we moved
//     const dx = pos.x - gStartPos.x
//     const dy = pos.y - gStartPos.y

//     moveCircle(dx, dy)

//     // Save the last pos, we remember where we`ve been and move accordingly
//     gStartPos = pos

//     // The canvas is rendered again after every move
//     renderMeme()
// }

// function onUp() {
//     setCircleDrag(false)
//     document.body.style.cursor = 'grab'
// }

// // function resizeCanvas() {
// //     const elContainer = document.querySelector('.canvas-container')

// //     gElCanvas.width = elContainer.offsetWidth
// //     gElCanvas.height = elContainer.offsetHeight
// // }

// function getEvPos(ev) {

//     if (TOUCH_EVENTS.includes(ev.type)) {

//         ev.preventDefault()         // Prevent triggering the mouse events
//         ev = ev.changedTouches[0]   // Gets the first touch point

//         // Calculate the touch position inside the canvas

//         // ev.pageX = distance of touch position from the documents left edge
//         // target.offsetLeft = offset of the elemnt's left side from the it's parent
//         // target.clientLeft = width of the elemnt's left border

//         return {
//             x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
//             y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
//         }

//     } else {
//         return {
//             x: ev.offsetX,
//             y: ev.offsetY,
//         }
//     }
// }

// function isLineClicked(clickedPos) {
// 	const { pos } = gMeme.lines[gMeme.selectedLineIdx-1]

// 	// Calc the distance between two dots
// 	const distance = 
//         Math.sqrt((pos.x - clickedPos.x) ** 2 + (pos.y - clickedPos.y) ** 2)

// 	//If its smaller then the radius of the circle we are inside
// 	return distance <= gMeme.lines[gMeme.selectedLineIdx-1].size
// }

// function setLineDrag(isDrag) {
// 	gMeme.lines[gMeme.selectedLineIdx-1].isDrag = isDrag
// }

// // Move the circle by a delta from the pervious pos

// function moveLine(dx, dy) {
// 	gMeme.lines[gMeme.selectedLineIdx-1].pos.x += dx
// 	gMeme.lines[gMeme.selectedLineIdx-1].pos.y += dy
// }
