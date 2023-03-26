
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

async function query(filterBy = { txt: '', price: 0 }) {
    var gatherings = await storageService.query(STORAGE_KEY)
    if (filterBy.txt) {
        const regex = new RegExp(filterBy.txt, 'i')
        gatherings = gatherings.filter(gathering => regex.test(gathering.vendor) || regex.test(gathering.description))
    }
    if (filterBy.price) {
        gatherings = gatherings.filter(gathering => gathering.price <= filterBy.price)
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
        imgsBefore: [],
        // imgsAfter: [],
        // usersIds: [],
        info: utilService.makeLorem(10),
        location: randomLocs[utilService.getRandomIntInclusive(0, 3)],
        time: new Date().getTime() - utilService.getRandomIntInclusive(0, 31536000000),
        status: '',
    }
    if (isGathering) {
        gathering.imgsBefore =
            [
                'https://www.google.com/imgres?imgurl=https%3A%2F%2Fi.pinimg.com%2F736x%2F7d%2Fd9%2F99%2F7dd999f44d34632661ad0c62333d0d63.jpg&tbnid=S4FLoc8oKFjmUM&vet=12ahUKEwiZkNOqrfn9AhVemycCHdG0Aw0QMygHegUIARDDAQ..i&imgrefurl=https%3A%2F%2Fwww.pinterest.com%2Fpin%2Ffunny--435652963964263580%2F&docid=vZO5WlKVMcdmmM&w=720&h=725&q=meme%20faces&ved=2ahUKEwiZkNOqrfn9AhVemycCHdG0Aw0QMygHegUIARDDAQ',
                'https://www.google.com/imgres?imgurl=https%3A%2F%2Fi.pinimg.com%2F736x%2Fec%2Ff9%2Fb9%2Fecf9b9cb9188e63b2c6dea145ea24e77.jpg&tbnid=Gx2grihEcQTj8M&vet=12ahUKEwiZkNOqrfn9AhVemycCHdG0Aw0QMygPegUIARDUAQ..i&imgrefurl=https%3A%2F%2Fwww.pinterest.com%2Fpin%2F759771399645443654%2F&docid=tSksKOnNKepYJM&w=570&h=570&q=meme%20faces&ved=2ahUKEwiZkNOqrfn9AhVemycCHdG0Aw0QMygPegUIARDUAQ',
                'https://www.google.com/imgres?imgurl=http%3A%2F%2Fimages7.memedroid.com%2Fimages%2FUPLOADED743%2F60416b642824c.jpeg&tbnid=7uOGXQeNjK_inM&vet=12ahUKEwiZkNOqrfn9AhVemycCHdG0Aw0QMyghegUIARCEAg..i&imgrefurl=https%3A%2F%2Fwww.memedroid.com%2Fmemes%2Fdetail%2F3264197%2Fface-reveal&docid=sfjdSm6P9sD1_M&w=400&h=400&q=meme%20faces&ved=2ahUKEwiZkNOqrfn9AhVemycCHdG0Aw0QMyghegUIARCEAg'
            ]

        gathering.usersIds = ['HQ6wp', 'HQ6wp', 'HQ6wp', 'HQ6wp', 'HQ6wp', 'HQ6wp', 'HQ6wp']
    }

    return gathering
}

function _createGatherings() {
    let gatherings = utilService.loadFromStorage(STORAGE_KEY)
    if (!gatherings || !gatherings.length) {
        gatherings = []
        for (let i = 0; i < 10; i++) {
            gatherings.push(_createGathering())
        }

    }
    return gatherings
}


// TEST DATA
// storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 2', price: 980}).then(x => console.log(x))




