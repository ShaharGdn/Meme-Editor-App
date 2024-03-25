'use strict'

let gElCanvas
let gCtx
let gStartPos
let gFilteredImges

const gQueryOptions = {
    keyWord: ''
}

var gImgs = [
    { id: 1, url: 'assets/images/1.jpg', keywords: ['funny', 'trump', 'man', 'politics'] },
    { id: 2, url: 'assets/images/2.jpg', keywords: ['dog', 'cute'] },
    { id: 3, url: 'assets/images/3.jpg', keywords: ['dog', 'baby', 'cute'] },
    { id: 4, url: 'assets/images/4.jpg', keywords: ['cat', 'cute'] },
    { id: 5, url: 'assets/images/5.jpg', keywords: ['funny', 'baby'] },
    { id: 6, url: 'assets/images/6.jpg', keywords: ['man', 'funny'] },
    { id: 7, url: 'assets/images/7.jpg', keywords: ['baby', 'funny'] },
    { id: 8, url: 'assets/images/8.jpg', keywords: ['man', 'funny'] },
    { id: 9, url: 'assets/images/9.jpg', keywords: ['baby', 'funny'] },
    { id: 10, url: 'assets/images/10.jpg', keywords: ['man', 'funny', 'politics'] },
    { id: 11, url: 'assets/images/11.jpg', keywords: ['man', 'funny', 'sports'] },
    { id: 12, url: 'assets/images/12.jpg', keywords: ['man', 'funny'] },
    { id: 13, url: 'assets/images/13.jpg', keywords: ['man', 'celebs', 'movies'] },
    { id: 14, url: 'assets/images/14.jpg', keywords: ['man', 'serious', 'movies'] },
    { id: 15, url: 'assets/images/15.jpg', keywords: ['man', 'funny'] },
    { id: 16, url: 'assets/images/16.jpg', keywords: ['man', 'funny'] },
    { id: 17, url: 'assets/images/17.jpg', keywords: ['man', 'funny', 'politics', 'putin'] },
    { id: 18, url: 'assets/images/18.jpg', keywords: ['cartoon', 'funny'] },
    { id: 19, url: 'assets/images/19.jpg', keywords: ['man', 'funny'] },
    { id: 20, url: 'assets/images/20.jpg', keywords: ['funny', 'trump', 'man', 'politics'] },
    { id: 21, url: 'assets/images/21.jpg', keywords: ['dog', 'cute'] },
    { id: 22, url: 'assets/images/22.jpg', keywords: ['man', 'funny'] },
    { id: 23, url: 'assets/images/23.jpg', keywords: ['dog', 'baby', 'cute'] },
    { id: 24, url: 'assets/images/24.jpg', keywords: ['cat', 'cute'] },
    { id: 25, url: 'assets/images/25.jpg', keywords: ['man', 'funny', 'movies'] },
    { id: 26, url: 'assets/images/26.jpg', keywords: ['kids', 'funny'] },
    { id: 27, url: 'assets/images/27.jpg', keywords: ['funny', 'trump', 'man', 'politics'] },
    { id: 28, url: 'assets/images/28.jpg', keywords: ['baby', 'funny'] },
    { id: 29, url: 'assets/images/29.jpg', keywords: ['dog', 'funny'] },
    { id: 30, url: 'assets/images/30.jpg', keywords: ['man', 'funny', 'politics', 'obama'] },
    { id: 31, url: 'assets/images/31.jpg', keywords: ['man', 'funny', 'sports'] },
    { id: 32, url: 'assets/images/32.jpg', keywords: ['man', 'celebs', 'movies'] },
    { id: 33, url: 'assets/images/33.jpg', keywords: ['man', 'serious', 'movies'] },
    { id: 34, url: 'assets/images/34.jpg', keywords: ['man', 'funny', 'movies'] },
    { id: 35, url: 'assets/images/35.jpg', keywords: ['woman', 'funny', 'oprah', 'celebs'] },
    { id: 36, url: 'assets/images/36.jpg', keywords: ['man', 'funny', 'movies'] },
    { id: 37, url: 'assets/images/37.jpg', keywords: ['funny', 'putin', 'man', 'politics'] },
    { id: 38, url: 'assets/images/38.jpg', keywords: ['cartoon', 'funny'] },
]

const TOUCH_EVENTS = ['touchstart', 'touchmove', 'touchend']

// var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }
var gKeywordSearchCountMap = {}

function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')

    addListeners()

    resizeCanvas()
    createKeywordFilterBar()
    renderImages()
}

function renderImages() {
    gFilteredImges = getImages(gQueryOptions)

    if (!gFilteredImges) gFilteredImges = gImgs

    const elGallery = document.querySelector('.gallery-container')

    const upladHTML =
        `<div class="upload-container">
    <label for="file-upload" class="custom-file-upload">
        <i class="fa-solid fa-upload"></i> 
        Upload
    </label>
    <input id="file-upload" type="file" class="file-input btn" name="image" onchange="onImgInput(event)"accept="image/*" />            
    </div>`

    var imageHTML = gFilteredImges.map(image => {
        return `<img class='gallery-img img${image.id}' src='${image.url}' data-id='${image.id}' onclick=onImgSelect(this)>`
    })

    elGallery.innerHTML = upladHTML + imageHTML.join('')
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
        // TODO: handle default text size (inside the meme)
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
            { txt: 'Enter Text', size: 35, stroke: 'white', color: 'white', align: 'center', pos: { x: 180, y: 50 }, isDrag: false, font: 'Impact' },
        ]
    }

    renderImages()
    renderMeme()
    drawFrame()
}

function onLookup(ev=null, elValue) {
    // ev.preventDefault()
    // ev.stopPropagation()

    gQueryOptions.keyWord = elValue.value

    renderImages()
}

function getImages(options = {}) {
    if (!options.keyWord) return gImgs

    var images = filterImages(options)

    // if (options.sortBy.title) {
    //     books.sort((book1, book2) => book1.name.localeCompare(book2.name) * options.sortBy.title)
    // } else if (options.sortBy.price) {
    //     books.sort((book1, book2) => (book1.price - book2.price) * options.sortBy.price)
    // } else if (options.sortBy.rating) {
    //     books.sort((book1, book2) => (book1.rating - book2.rating) * options.sortBy.rating)
    // } else if (options.sortBy.author) {
    //     books.sort((book1, book2) => book1.author.localeCompare(book2.author) * options.sortBy.author)
    // }

    return images
}

function filterImages(options) {
    const valueLower = options.keyWord.toLowerCase()

    var images = gImgs.filter(img => {
        return img.keywords.some(keyword => {
            const keywordLower = keyword.toLowerCase();
            return keywordLower.startsWith(valueLower) || keywordLower.includes(valueLower);
        })
    })


    return images
}

function onRandomizeMeme() {
    const elAboutSec = document.querySelector('.about-view')
    elAboutSec.classList.add('hide')


    randomizeMeme()
    renderMeme()
    drawFrame()
    toggleMenu()
}

function createKeywordFilterBar() {
    const keywordsContainer = document.querySelector('.keywords-container')

    const clearBtn = `<button class="clear-filter" onclick="onClearFilter()">Clear</button>`

    var keyWords = []

    gImgs.forEach(img => {
        img.keywords.forEach(keyword => {
            if (!keyWords.includes(keyword)) {
                keyWords.push(keyword)
            }
        })
    })

    var keywordsHTML = keyWords.map(keyword => {
        const keywordCap = keyword.charAt(0).toUpperCase() + keyword.slice(1)
        return `<a class="keyword-link" style="font-size: 1em;" href="#" data-value="${keyword}" onclick="onFilterBy(this)">${keywordCap}</a>`
    }).join('')

    keyWords.map(keyword => { 
        return gKeywordSearchCountMap[keyword] = 0})

    keywordsContainer.innerHTML = keywordsHTML +clearBtn
}

function onFilterBy(el) {
    const elValue = el.dataset.value
    gQueryOptions.keyWord = elValue

    setFontSize(el, elValue)
    renderImages()
}

function setFontSize(element, keyword) {
    var fontSize = element.style.fontSize
    const inc = 0.1

    gKeywordSearchCountMap[keyword] +=1

    const currentFontSize = parseFloat(fontSize)
    const newFontSize = currentFontSize + inc

    element.style.fontSize = `${newFontSize}em`
}

function onClearFilter() {
    gQueryOptions.keyWord = ''

    renderImages()
}