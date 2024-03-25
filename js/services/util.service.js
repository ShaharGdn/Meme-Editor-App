'use strict'

function makeId(length = 5) {
    var id = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (var i = 0; i < length; i++) {
        id += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return id
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function makeWord(wordMax) {
    let text = ''
    const possible = 'bcdfghjklmnpqrstvwxyz'
    const possibleVowels = 'aeiou'

    for (let i = 0; i < wordMax; i = i + 3) {
        text += possible[Math.floor(Math.random() * possible.length)]
        text += possibleVowels[Math.floor(Math.random() * possibleVowels.length)]
        text += possible[Math.floor(Math.random() * possible.length)]
    }
    return text
}
