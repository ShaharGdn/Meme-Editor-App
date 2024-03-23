'use strict'

let gElCanvas
let gCtx
let gStartPos

var gImgs = [
    { id: 1, url: 'assets/images/1.jpg', keywords: ['funny', 'trump'] },
    { id: 2, url: 'assets/images/2.jpg', keywords: ['dog', 'cute'] },
    { id: 3, url: 'assets/images/3.jpg', keywords: ['baby', 'cute'] },
    { id: 4, url: 'assets/images/4.jpg', keywords: ['baby', 'cute'] },
    { id: 5, url: 'assets/images/5.jpg', keywords: ['baby', 'cute'] },
    { id: 6, url: 'assets/images/6.jpg', keywords: ['baby', 'cute'] },
    { id: 7, url: 'assets/images/7.jpg', keywords: ['baby', 'cute'] },
    { id: 8, url: 'assets/images/8.jpg', keywords: ['baby', 'cute'] },
    { id: 9, url: 'assets/images/9.jpg', keywords: ['baby', 'cute'] },
    { id: 10, url: 'assets/images/10.jpg', keywords: ['baby', 'cute'] },
    { id: 11, url: 'assets/images/11.jpg', keywords: ['baby', 'cute'] },
    { id: 12, url: 'assets/images/12.jpg', keywords: ['baby', 'cute'] },
    { id: 13, url: 'assets/images/13.jpg', keywords: ['baby', 'cute'] },
    { id: 14, url: 'assets/images/14.jpg', keywords: ['baby', 'cute'] },
    { id: 15, url: 'assets/images/15.jpg', keywords: ['baby', 'cute'] },
    { id: 16, url: 'assets/images/16.jpg', keywords: ['baby', 'cute'] },
    { id: 17, url: 'assets/images/17.jpg', keywords: ['baby', 'cute'] },
    { id: 18, url: 'assets/images/18.jpg', keywords: ['baby', 'cute'] },
    { id: 19, url: 'assets/images/19.jpg', keywords: ['baby', 'cute'] },
    { id: 20, url: 'assets/images/20.jpg', keywords: ['baby', 'cute'] },
    { id: 21, url: 'assets/images/21.jpg', keywords: ['baby', 'cute'] },
    { id: 22, url: 'assets/images/22.jpg', keywords: ['baby', 'cute'] },
    { id: 23, url: 'assets/images/23.jpg', keywords: ['baby', 'cute'] },
    { id: 24, url: 'assets/images/24.jpg', keywords: ['baby', 'cute'] },
    { id: 25, url: 'assets/images/25.jpg', keywords: ['baby', 'cute'] },
    { id: 26, url: 'assets/images/26.jpg', keywords: ['baby', 'cute'] },
    { id: 27, url: 'assets/images/27.jpg', keywords: ['baby', 'cute'] },
    { id: 28, url: 'assets/images/28.jpg', keywords: ['baby', 'cute'] },
    { id: 29, url: 'assets/images/29.jpg', keywords: ['baby', 'cute'] },
    { id: 30, url: 'assets/images/30.jpg', keywords: ['baby', 'cute'] },
    { id: 31, url: 'assets/images/31.jpg', keywords: ['baby', 'cute'] },
    { id: 32, url: 'assets/images/32.jpg', keywords: ['baby', 'cute'] },
    { id: 33, url: 'assets/images/33.jpg', keywords: ['baby', 'cute'] },
    { id: 34, url: 'assets/images/34.jpg', keywords: ['baby', 'cute'] },
    { id: 35, url: 'assets/images/35.jpg', keywords: ['baby', 'cute'] },
    { id: 37, url: 'assets/images/37.jpg', keywords: ['baby', 'cute'] },
    { id: 38, url: 'assets/images/38.jpg', keywords: ['baby', 'cute'] },

]

const TOUCH_EVENTS = ['touchstart', 'touchmove', 'touchend']

var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }

function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')

    addListeners()

    resizeCanvas()
    renderImages()
}

function renderImages() {
    const elGallery = document.querySelector('.gallery-container')

    const upladHTML = 
    `<div class="upload-container">
    <label for="file-upload" class="custom-file-upload">
        <i class="fa-solid fa-upload"></i> 
        Upload
    </label>
    <input id="file-upload" type="file" class="file-input btn" name="image" onchange="onImgInput(event)"accept="image/*" />            
    </div>`

    var imageHTML = gImgs.map(image => {
        return `<img class='gallery-img img${image.id}' src='${image.url}' data-id='${image.id}' onclick=onImgSelect(this)>`
    })

    elGallery.innerHTML = upladHTML +imageHTML.join('')
}

function onImgSelect(elImg) {
    const imgId = elImg.dataset.id
    const elBody = document.querySelector('body')

    elBody.classList.remove('gallery')

    createMeme(imgId)

    renderMeme()
    drawFrame()
}

function addListeners() {
    addMouseListeners()
    addTouchListeners()

    window.addEventListener('resize', () => {
        resizeCanvas()
        renderMeme()
        drawFrame()
    })
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

function toggleMenu() {
    document.body.classList.toggle('menu-open');
}

function onImgInput(ev) {
    loadImageFromInput(ev)
}

function loadImageFromInput(ev) {
    const reader = new FileReader()

    reader.onload = ev => {
        let img = new Image()
        img.src = ev.target.result
        img.onload = () => 
        createImg(img)
    }
    reader.readAsDataURL(ev.target.files[0])
}

function createImg(elImg) {
    const newId = makeId()

    const newImg = { id: newId, url: `${elImg.src}`, keywords: [] }
    elImg.dataset.id = newId

    gImgs.push(newImg)

    gMeme = {
        imgUrl: elImg.src,
        selectedImgId: newId,
        selectedLineIdx: 0,
        lines: [
            { txt: 'Enter Text', size: 35, stroke: 'white', color: 'white', align: 'center', pos: { x: 180, y: 50 }, isDrag: false , font: 'Impact'},
        ]
    }

    renderImages()
    renderMeme()
    drawFrame()
}

function makeId(length = 5) {
	var id = ''
	var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

	for (var i = 0; i < length; i++) {
		id += possible.charAt(Math.floor(Math.random() * possible.length))
	}
	return id
}
