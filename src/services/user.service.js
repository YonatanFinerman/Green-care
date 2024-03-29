import { storageService } from './async-storage.service'
import { httpService } from './http.service'

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'


export const userService = {
    login,
    logout,
    signup,
    getLoggedinUser,
    saveLocalUser,
    getUsers,
    getById,
    remove,
    update,
    changeScore,
    getUserPos,
    getUserRole,
}

window.userService = userService


function getUsers() {
    return storageService.query('user')
    // return httpService.get(`user`)
}


async function getUserPos() {

    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })

}

async function getById(userId) {
    const user = await storageService.get('user', userId)
    // const user = await httpService.get(`user/${userId}`)
    return user
}

function remove(userId) {
    return storageService.remove('user', userId)
    // return httpService.delete(`user/${userId}`)
}

async function update(user) {
    try {
        const updatedUser = await storageService.put('user', user)
        // const user = await httpService.put(`user/${_id}`, {_id, score})
        // Handle case in which admin updates other user's details
        if (getLoggedinUser()._id === user._id) saveLocalUser(user)
        return updatedUser
    }
    catch (err) {
        console.log('cannot update user', err)
    }
}


async function login(userCred) {
    const users = await storageService.query('user')
    const user = users.find(user => user.email === userCred.email && user.password === userCred.password)
    // const user = await httpService.post('auth/login', userCred)
    if (user) {
        // socketService.login(user._id)
        return saveLocalUser(user)
    }
    else {
        throw new Error('no such user')
    }
}
async function signup(userCred) {
    const newUser = {
        ...userCred, xp: 0, profileImg: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png', 
        // https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png
        coins: 50, actions: [], isVerified: false, prizes: []
    }
    const user = await storageService.post('user', newUser)
    console.log('newuser', user)
    // // const user = await httpService.post('auth/signup', userCred)
    // // socketService.login(user._id)
    return saveLocalUser(user)
}
async function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
    // socketService.logout()
    // return await httpService.post('auth/logout')
}

async function changeScore(by) {
    const user = getLoggedinUser()
    if (!user) throw new Error('Not loggedin')
    user.score = user.score + by || by
    await update(user)
    return user.score
}


function saveLocalUser(user) {
    const { password, ...currUser } = user
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(currUser))
    return currUser
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}

function getUserRole(users,currUser) {
    const userIdx = users.findIndex(user => user._id === currUser._id)
    if (userIdx > -1) return true
    else return false
}


// ;(async ()=>{
//     await userService.signup({fullName: 'Puki Norma', username: 'puki', password:'123',score: 10000, isAdmin: false})
//     await userService.signup({fullName: 'Master Adminov', username: 'admin', password:'123', score: 10000, isAdmin: true})
//     await userService.signup({fullName: 'Muki G', username: 'muki', password:'123', score: 10000})
// })()





