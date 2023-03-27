
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'

const STORAGE_KEY = 'gathering'

export const gatheringService = {
    query,
    getById,
    save,
    remove,
    getEmptyGathering,
    addGatheringMsg
}
window.cs = gatheringService

_createGatherings()

async function query(isGathering, filterBy = { txt: '', price: 0 }) {
    let gatherings = await storageService.query(STORAGE_KEY)

    if (isGathering) {
        gatherings = gatherings.filter(gathering => gathering.usersIds.length > 0)
    }
    else {
        gatherings = gatherings.filter(gathering => !gathering.usersIds.length)
    }
    return gatherings
}

function getById(gatheringId) {
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
        gathering.owner = userService.getLoggedinUser()
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

function getEmptyGathering() {
    return {
        vendor: 'Susita-' + (Date.now() % 1000),
        price: utilService.getRandomIntInclusive(1000, 9000),
    }
}

function _createGathering() {
    var t1 = new Date().toLocaleString()
    const randomLocs = [{ lat: -77.042793, lan: -77.042793 }, { lat: 32.794044, lan: 34.98957 }, { lat: 48.872970209571, lan: 2.354588099894616 }]
    const isGathering = (Math.random() > 0.5) ? true : false


    const gathering = {
        _id:utilService.makeId(),
        imgsBefore:   [
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRJ1gKHqnJhT-P5cW-qxf4iuFnLtqGXkYuTQ&usqp=CAU',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrUqRjoMYVdrK8VPLEPH7ej7DY1F2JX9ADTg&usqp=CAU',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYHUd__O9u1Bn7WhTkDD7yzzGRdarcG-APXA&usqp=CAU'
        ],
        imgsAfter: [],
        usersIds: [],
        info: utilService.makeLorem(10),
        location: randomLocs[utilService.getRandomIntInclusive(0, 3)],
        time: new Date().getTime() - utilService.getRandomIntInclusive(0, 31536000000),
        status: '',
    }
    if (isGathering) {
        // gathering.imgsBefore =
        //     [
        //         'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRJ1gKHqnJhT-P5cW-qxf4iuFnLtqGXkYuTQ&usqp=CAU',
        //         'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrUqRjoMYVdrK8VPLEPH7ej7DY1F2JX9ADTg&usqp=CAU',
        //         'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYHUd__O9u1Bn7WhTkDD7yzzGRdarcG-APXA&usqp=CAU'
        //     ]

        gathering.usersIds = ['HQ6wp', 'HQ6wp', 'HQ6wp', 'HQ6wp', 'HQ6wp', 'HQ6wp', 'HQ6wp']
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




