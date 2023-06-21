
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
    getEmptyFilter,
}
window.cs = prizeService

_createPrizes()

async function query() {

    let prizes = await storageService.query(STORAGE_KEY)
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
        name:utilService.makeLorem(2),
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHOoJFYlmvyJgrNHV2oZGUVi1670j6v_e14g&usqp=CAU',
        codes: [utilService.makeId(20),utilService.makeId(20),utilService.makeId(20),utilService.makeId(20),utilService.makeId(20),utilService.makeId(20),utilService.makeId(20),],
        cost:utilService.getRandomIntInclusive(3, 6),
        prizeDesc:utilService.makeLorem(10),
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





