
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'
import axios from 'axios'

const STORAGE_KEY = 'gathering'

export const gatheringService = {
    query,
    getById,
    save,
    remove,
    getEmptyLocation,
    addGatheringMsg,
    getLocationName,
    getDistanceFromUser,
    getEmptyFilter,
    getLocationByName,

}
window.cs = gatheringService

_createGatherings()

async function query(filterBy, userLoc = null) {
    console.log(filterBy, 'filterby')
    let gatherings = await storageService.query(STORAGE_KEY)

    if (filterBy.isGathering) {
        gatherings = gatherings.filter(gathering => gathering.users.length > 0)

    }
    else {
        gatherings = gatherings.filter(gathering => !gathering.users.length)

    }

    if (filterBy.date) {
        gatherings = gatherings.filter(gathering => {
            let date = new Date(gathering.time)
            date.setHours(0, 0, 0, 0)
            if (date.getTime() === filterBy.date) {
                return gathering
            }
        })
    }

    if (filterBy.capacity) {
        gatherings = gatherings.filter(gathering => gathering.capacity <= filterBy.capacity)

    }
    if (isNaN(filterBy.maxDistance) && userLoc) {
        gatherings = gatherings.filter(gathering => {
            return getDistanceFromUser(userLoc, gathering.loc) <= filterBy.maxDistance
        })

    }
    if (filterBy.locName) {
        const regex = new RegExp(filterBy.locName, 'i')
        gatherings = gatherings.filter(gathering => regex.test(gathering.locName))
    }


    return gatherings
}

async function getUserGatherings(gatheringsIds) {
    let gatherings = await storageService.query(STORAGE_KEY)
    return gatherings.filter(gathering => gatheringsIds.includes(gathering._id))
}


async function getLocationName(pos) {
    console.log('locname from args', pos)
    // const API_KEY = 'AIzaSyDaRU8dfDmfYH7VAnKLLM7Y2SXli9AH33Q'
    const API_KEY = 'AIzaSyCWNRrGApZar-RMJ5hDCH8zRLA2TDISlPc'

    // latlng by name
    let urk = `https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=${API_KEY}`
    // name by laglng
    let urlName = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${pos.lat},${pos.lng}&key=AIzaSyCWNRrGApZar-RMJ5hDCH8zRLA2TDISlPc`
    // console.log('name of location is', posNamePrm)
    const locName = await axios.get(urlName).then(res => res.data.results[0].formatted_address)
    console.log('this is location', locName)
    return locName
}





async function getLocationByName(locName) {

    const API_KEY = 'AIzaSyCWNRrGApZar-RMJ5hDCH8zRLA2TDISlPc'
    let urlName = `https://maps.googleapis.com/maps/api/geocode/json?address=${locName}&key=${API_KEY}`
    try {
        const loc = await axios.get(urlName).then(res => res.data.results)

        return loc
    }
    catch (err) {
        console.log(err, 'No such place')
        throw err
    }
}

function getDistanceFromUser(userLoc, gatheringLoc) {

    const R = 6371
    const dLat = utilService.deg2rad(gatheringLoc.lat - userLoc.lat)

    const dLng = utilService.deg2rad(gatheringLoc.lng - userLoc.lng)
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(utilService.deg2rad(userLoc.lat)) *
        Math.cos(utilService.deg2rad(gatheringLoc.lat)) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    const distance = R * c
    return distance.toFixed(1)
}

async function getById(gatheringId) {
    return storageService.get(STORAGE_KEY, gatheringId)
}

async function remove(gatheringId) {
    // throw new Error('Nope')
    await storageService.remove(STORAGE_KEY, gatheringId)
}

async function save(gathering) {

    var savedGathering
    if (gathering._id) {
        savedGathering = await storageService.put(STORAGE_KEY, gathering)
    } else {
        // Later, owner is set by the backend

        // gathering.owner = userService.getLoggedinUser()
        savedGathering = await storageService.post(STORAGE_KEY, gathering)
    }
    return savedGathering
}

async function addGatheringMsg(gatheringId, txt) {
    // Later, this is all done by the backend
    const gathering = await getById(gatheringId)
    if (!gathering.msgs) gathering.msgs = []

    const msg = {
        id: utilService.makeId(),
        by: userService.getLoggedinUser(),
        txt
    }
    gathering.msgs.push(msg)
    await storageService.put(STORAGE_KEY, gathering)

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
    return { maxDistance: '100', capacity: 13, locName: '', isGathering: false, date: 0 }
}

function _createGathering() {
    var t1 = new Date().toLocaleString()
    const randomLocs = [{ lat: 31.801447, lng: 34.643497 }, { lat: 32.794044, lng: 34.98957 }, { lat: 32.015833, lng: 34.787384 }]
    const isGathering = (Math.random() > 0.5) ? true : false


    const gathering = {
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

    // getLocationName(gathering.location).then(loc => gathering.locName = loc.data.results[1].formatted_address)
    //  getLocationName(gathering.location)
    if (isGathering) {
        gathering.users = [{ fullname: 'moti pipi', profileImg: 'https://clb.ac.il/wp-content/uploads/2017/03/MOSHE-COHEN-ELIYA-1.jpg', _id: utilService.makeId() }
            , { fullname: 'moti pipi', profileImg: 'https://clb.ac.il/wp-content/uploads/2017/03/MOSHE-COHEN-ELIYA-1.jpg', _id: utilService.makeId() },
        { fullname: 'moti pipi', profileImg: 'https://clb.ac.il/wp-content/uploads/2017/03/MOSHE-COHEN-ELIYA-1.jpg', _id: utilService.makeId() },
        { fullname: 'moti pipi', profileImg: 'https://clb.ac.il/wp-content/uploads/2017/03/MOSHE-COHEN-ELIYA-1.jpg', _id: utilService.makeId() },
        { fullname: 'moti pipi', profileImg: 'https://clb.ac.il/wp-content/uploads/2017/03/MOSHE-COHEN-ELIYA-1.jpg', _id: utilService.makeId() },]
        gathering.time = new Date().getTime() - utilService.getRandomIntInclusive(0, 31536000000)
    }

    return gathering
}

function _createGatherings() {
    let gatherings = utilService.loadFromStorage(STORAGE_KEY)
    if (!gatherings || !gatherings.length) {
        gatherings = []
        for (let i = 0; i < 50; i++) {
            gatherings.push(_createGathering())
        }

        utilService.saveToStorage(STORAGE_KEY, gatherings)
    }
    return gatherings
}



// TEST DATA
// storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 2', price: 980}).then(x => console.log(x))




