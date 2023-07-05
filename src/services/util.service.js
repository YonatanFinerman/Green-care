export const utilService = {
    makeId,
    makeLorem,
    getRandomIntInclusive,
    debounce,
    randomPastTime,
    saveToStorage,
    loadFromStorage,
    asyncDebounce,
    getTimeRemaining,
    deg2rad,
    getTimePastStr,
}

function makeId(length = 6) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return txt
}

function makeLorem(size = 100) {
    var words = ['The sky', 'above', 'the port', 'was', 'the color of television', 'tuned', 'to', 'a dead channel', '.', 'All', 'this happened', 'more or less', '.', 'I', 'had', 'the story', 'bit by bit', 'from various people', 'and', 'as generally', 'happens', 'in such cases', 'each time', 'it', 'was', 'a different story', '.', 'It', 'was', 'a pleasure', 'to', 'burn']
    var txt = ''
    while (size > 0) {
        size--
        txt += words[Math.floor(Math.random() * words.length)] + ' '
    }
    return txt
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive 
}

function getTimeRemaining(futureTime) {
    const oneDay = 24 * 60 * 60 * 1000
    const now = new Date()
    const futureDate = new Date(futureTime)
    futureDate.setHours(0, 0, 0, 0)

    const diffDays = Math.round((futureDate - now) / oneDay)

    if (diffDays === 0) {
        return "today"
    } else if (diffDays === 1) {
        return "tomorrow"
    } else {
        return `in ${diffDays} days`
    }
}


function randomPastTime() {
    const HOUR = 1000 * 60 * 60
    const DAY = 1000 * 60 * 60 * 24
    const WEEK = 1000 * 60 * 60 * 24 * 7

    const pastTime = getRandomIntInclusive(HOUR, WEEK)
    return Date.now() - pastTime
}

function debounce(func, timeout = 300) {
    let timer
    return (...args) => {
        clearTimeout(timer)
        timer = setTimeout(() => { func.apply(this, args) }, timeout)
    }
}

function asyncDebounce(func, timeout = 300) {
    let timer
    return (...args) => {
        return new Promise((resolve, reject) => {
            clearTimeout(timer)
            timer = setTimeout(() => {
                try {
                    const result = func.apply(this, args)
                    resolve(result)
                } catch (error) {
                    reject(error)
                }
            }, timeout)
        })
    }
}

function getTimePastStr(prevTime) {
    const MIN = 1000 * 60
    const HOUR = MIN * 60
    const DAY = HOUR * 24
    const currTime = Date.now()
    const timeDiff = currTime - prevTime
    
    if (timeDiff < MIN) return 'now'
    else if (timeDiff < HOUR) return (timeDiff / MIN).toFixed(0) + ' min ago'
    else if (timeDiff < DAY)return (timeDiff / HOUR).toFixed(0) + ' hrs ago'
    else return (timeDiff / DAY).toFixed(0) + ' days ago'
}

function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}

function loadFromStorage(key) {
    const data = localStorage.getItem(key)
    return (data) ? JSON.parse(data) : undefined
}

function deg2rad(deg) {
    return deg * (Math.PI / 180);
}


