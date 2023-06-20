
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'
import axios from 'axios'

const STORAGE_KEY = 'prize'

export const prizeService = {
    query,
    getById,
    save,
    remove,
    getEmptyLocation,
    addPrizeMsg,
    getLocationName,
    getDistanceFromUser,
    getEmptyFilter,
    getLocationByName,
   
}
window.cs = prizeService

_createPrizes()

async function query(filterBy, userLoc = null) {
    console.log(filterBy,'filterby')
    let prizes = await storageService.query(STORAGE_KEY)

    if (filterBy.isPrize) {
        prizes = prizes.filter(prize => prize.users.length > 0)

    }
    else {
        prizes = prizes.filter(prize => !prize.users.length)

    }

    if (filterBy.date) {
        prizes = prizes.filter(prize => {
            let date = new Date(prize.time)
            date.setHours(0, 0, 0, 0)
            if (date.getTime() === filterBy.date) {
                return prize
            }
        })
    }

    if (filterBy.capacity) {
        prizes = prizes.filter(prize => prize.capacity <= filterBy.capacity)

    }
    if (isNaN(filterBy.maxDistance) && userLoc) {
        prizes = prizes.filter(prize => {
            return getDistanceFromUser(userLoc, prize.loc) <= filterBy.maxDistance
        })

    }
    if (filterBy.locName) {
        const regex = new RegExp(filterBy.locName, 'i')
        prizes = prizes.filter(prize => regex.test(prize.locName))
    }


    return prizes
}




async function getById(prizeId) {
    return storageService.get(STORAGE_KEY, prizeId)
}

async function remove(prizeId) {
    // throw new Error('Nope')
    await storageService.remove(STORAGE_KEY, prizeId)
}

async function save(prize) {
  
    var savedPrize
    if (prize._id) {
        savedPrize = await storageService.put(STORAGE_KEY, prize)
    } else {
        // Later, owner is set by the backend
        
        // prize.owner = userService.getLoggedinUser()
        savedPrize = await storageService.post(STORAGE_KEY, prize)
    }
    return savedPrize
}

async function addPrizeMsg(prizeId, txt) {
    // Later, this is all done by the backend
    const prize = await getById(prizeId)
    if (!prize.msgs) prize.msgs = []

    const msg = {
        id: utilService.makeId(),
        by: userService.getLoggedinUser(),
        txt
    }
    prize.msgs.push(msg)
    await storageService.put(STORAGE_KEY, prize)

    return msg
}

function getEmptyLocation() {
    return {
        _id: '',
        imgsBefore: [],
        imgsAfter: [],
        users: [],
        info: '',
        loc: null,
        time: '',
        status: '',
        locName: '',
        capacity: 8,
    }
}

function getEmptyFilter() {
    return { maxDistance: '100', capacity: 12, locName: '', isPrize: false, date: 0 }
}

function _createPrize() {
    var t1 = new Date().toLocaleString()
    const randomLocs = [{ lat: 31.801447, lng: 34.643497 }, { lat: 32.794044, lng: 34.98957 }, { lat: 32.015833, lng: 34.787384 }]
    const isPrize = (Math.random() > 0.5) ? true : false


    const prize = {
        _id: utilService.makeId(),
        imgsBefore: [
            'https://i0.wp.com/wallpaperaccess.com/full/393735.jpg',
            'https://m.media-amazon.com/images/I/81VBi2RDh6L._SL500_.jpg',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKa_rfXhm0SzPCi8oeofTBZudR6XMViSsK6Q&usqp=CAU'
        ],
        imgsAfter: [],
        users: [],
        info: utilService.makeLorem(utilService.getRandomIntInclusive(30, 60)),
        loc: randomLocs[utilService.getRandomIntInclusive(0, 2)],
        time: '',
        status: '',
        locName: utilService.makeLorem(2),
        capacity: 8,
    }

    // getLocationName(prize.location).then(loc => prize.locName = loc.data.results[1].formatted_address)
    //  getLocationName(prize.location)
    if (isPrize) {
        prize.users = [{ fullname: 'moti pipi', profileImg: 'https://clb.ac.il/wp-content/uploads/2017/03/MOSHE-COHEN-ELIYA-1.jpg', _id: utilService.makeId() }
            , { fullname: 'moti pipi', profileImg: 'https://clb.ac.il/wp-content/uploads/2017/03/MOSHE-COHEN-ELIYA-1.jpg', _id: utilService.makeId() },
        { fullname: 'moti pipi', profileImg: 'https://clb.ac.il/wp-content/uploads/2017/03/MOSHE-COHEN-ELIYA-1.jpg', _id: utilService.makeId() },
        { fullname: 'moti pipi', profileImg: 'https://clb.ac.il/wp-content/uploads/2017/03/MOSHE-COHEN-ELIYA-1.jpg', _id: utilService.makeId() },
        { fullname: 'moti pipi', profileImg: 'https://clb.ac.il/wp-content/uploads/2017/03/MOSHE-COHEN-ELIYA-1.jpg', _id: utilService.makeId() },]
        prize.time = new Date().getTime() - utilService.getRandomIntInclusive(0, 31536000000)
    }

    return prize
}

function _createPrizes() {
    let prizes = utilService.loadFromStorage(STORAGE_KEY)
    if (!prizes || !prizes.length) {
        prizes = []
        for (let i = 0; i < 50; i++) {
            prizes.push(_createPrize())
        }

        utilService.saveToStorage(STORAGE_KEY, prizes)
    }
    return prizes
}



// TEST DATA
// storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 2', price: 980}).then(x => console.log(x))




