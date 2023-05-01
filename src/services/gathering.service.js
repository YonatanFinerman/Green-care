
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
    getEmptyGathering,
    addGatheringMsg,
    getLocationName,
    getDistanceFromUser,
    getEmptyFilter
}
window.cs = gatheringService

_createGatherings()

function getLocationName(pos) {
    console.log(pos)

    // const API_KEY = 'AIzaSyDaRU8dfDmfYH7VAnKLLM7Y2SXli9AH33Q'
    const API_KEY = 'AIzaSyCWNRrGApZar-RMJ5hDCH8zRLA2TDISlPc'

    // latlng by name
    let urk = `https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=${API_KEY}`
    // name by laglng
    let urlName = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${pos.lat},${pos.lng}&key=AIzaSyCWNRrGApZar-RMJ5hDCH8zRLA2TDISlPc`
    // console.log('name of location is', posNamePrm)
    const locName = axios.get(urlName).then(res => res.data.plus_code)
    console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!', locName)
    var posNamePrm = axios.get(urlName)
    return posNamePrm

}

function getDistanceFromUser(userLoc, gatheringLoc) {

    
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(gatheringLoc.lat - userLoc.lat);

    const dLng = deg2rad(gatheringLoc.lng - userLoc.lng);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(userLoc.lat)) *
        Math.cos(deg2rad(gatheringLoc.lat)) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in km
    return distance.toFixed(1);
}

function deg2rad(deg) {
    return deg * (Math.PI / 180);
}

async function query(isGathering, filterBy = { txt: '', price: 0 }) {
    let gatherings = await storageService.query(STORAGE_KEY)

    if (isGathering) {
        gatherings = gatherings.filter(gathering => gathering.users.length > 0)
    }
    else {
        gatherings = gatherings.filter(gathering => !gathering.users.length)
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
    const randomLocs = [{ lat: 31.801447, lng: 34.643497 }, { lat: 32.794044, lng: 34.98957 }, { lat: 32.015833, lng: 34.787384 }]
    const isGathering = (Math.random() > 0.5) ? true : false


    const gathering = {
        _id: utilService.makeId(),
        imgsBefore: [
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRJ1gKHqnJhT-P5cW-qxf4iuFnLtqGXkYuTQ&usqp=CAU',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrUqRjoMYVdrK8VPLEPH7ej7DY1F2JX9ADTg&usqp=CAU',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYHUd__O9u1Bn7WhTkDD7yzzGRdarcG-APXA&usqp=CAU'
        ],
        imgsAfter: [],
        users: [],
        info: utilService.makeLorem(utilService.getRandomIntInclusive(5,30)),
        loc: randomLocs[utilService.getRandomIntInclusive(0, 2)],
        time: new Date().getTime() - utilService.getRandomIntInclusive(0, 31536000000),
        status: '',
        locName: utilService.makeLorem(2),
        capacity: 8,
    }

    // getLocationName(gathering.location).then(loc => gathering.locName = loc.data.results[1].formatted_address)
    //  getLocationName(gathering.location)
    if (isGathering) {
        gathering.users = [{fullName:'moti pipi',profileImg:'https://www.google.com/url?sa=i&url=https%3A%2F%2Frussianconductors.wordpress.com%2F2015%2F04%2F28%2Fmark-gorenstein%2F&psig=AOvVaw0SOKyITRAl39mCy1EBH8Hz&ust=1681470231762000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCNi28_fapv4CFQAAAAAdAAAAABAE'}
    ,{fullName:'moti pipi',profileImg:'https://www.google.com/url?sa=i&url=https%3A%2F%2Frussianconductors.wordpress.com%2F2015%2F04%2F28%2Fmark-gorenstein%2F&psig=AOvVaw0SOKyITRAl39mCy1EBH8Hz&ust=1681470231762000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCNi28_fapv4CFQAAAAAdAAAAABAE'},
    {fullName:'moti pipi',profileImg:'https://www.google.com/url?sa=i&url=https%3A%2F%2Frussianconductors.wordpress.com%2F2015%2F04%2F28%2Fmark-gorenstein%2F&psig=AOvVaw0SOKyITRAl39mCy1EBH8Hz&ust=1681470231762000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCNi28_fapv4CFQAAAAAdAAAAABAE'},
    {fullName:'moti pipi',profileImg:'https://www.google.com/url?sa=i&url=https%3A%2F%2Frussianconductors.wordpress.com%2F2015%2F04%2F28%2Fmark-gorenstein%2F&psig=AOvVaw0SOKyITRAl39mCy1EBH8Hz&ust=1681470231762000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCNi28_fapv4CFQAAAAAdAAAAABAE'},
    {fullName:'moti pipi',profileImg:'https://www.google.com/url?sa=i&url=https%3A%2F%2Frussianconductors.wordpress.com%2F2015%2F04%2F28%2Fmark-gorenstein%2F&psig=AOvVaw0SOKyITRAl39mCy1EBH8Hz&ust=1681470231762000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCNi28_fapv4CFQAAAAAdAAAAABAE'},]
    }
    console.log(gathering)
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

function getEmptyFilter(){
    return {maxDistance:100,participants:5,locName:''}
}

// TEST DATA
// storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 2', price: 980}).then(x => console.log(x))




