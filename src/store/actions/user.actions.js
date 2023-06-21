import { userService } from '../../services/user.service';
import { store } from '../store';

import { showErrorMsg } from '../../services/event-bus.service';
import { LOADING_DONE, LOADING_START } from "../system.reducer";
import { REMOVE_USER, SET_USER, SET_USERS, SET_USER_LOC, SET_WATCHED_USER, TOGGLE_USERLOC_MODAL, UPDATE_USER } from "../reducers/user.reducer";

export function getActionUpdateUser(user) {

    return {
        type: UPDATE_USER,
        user
    }
}

export async function loadUsers() {
    try {
        store.dispatch({ type: LOADING_START })
        const users = await userService.getUsers()
        store.dispatch({ type: SET_USERS, users })
    } catch (err) {
        console.log('UserActions: err in loadUsers', err)
    } finally {
        store.dispatch({ type: LOADING_DONE })
    }
}

export function setUserLoc() {
    userService.getUserPos()
        .then(loc => {
            const userLoc = { lat: loc.coords.latitude, lng: loc.coords.longitude }
            store.dispatch({ type: SET_USER_LOC, userLoc })

        })
        .catch(err => {
            console.log(err, 'no user loc')
            store.dispatch({ type: TOGGLE_USERLOC_MODAL })

        })
}

export async function removeUser(userId) {
    try {
        await userService.remove(userId)
        store.dispatch({ type: REMOVE_USER, userId })
    } catch (err) {
        console.log('UserActions: err in removeUser', err)
        throw err
    }
}

export async function updateUser(user) {
    try {
        const savedUser = await userService.update(user)
        console.log('Updated user:', savedUser)
        userService.saveLocalUser(savedUser)
        // store.dispatch(getActionUpdateUser(savedUser))
        store.dispatch({ type: UPDATE_USER, savedUser })
        return savedUser
    }
    catch (err) {
        console.log('Cannot save stay', err)
        throw err
    }
}

//////////////////////////////////////////// BACK

export async function login(credentials) {

    try {
        // console.log(credentials, 'user action')
        const user = await userService.login(credentials)
        store.dispatch({ type: SET_USER, user })
        // store.dispatch({ type: TOGGLE_IS_SHADOW })
        return user
    } catch (err) {
        // console.error('Cannot login:', err)
        throw err
    }
}

export async function logout() {
    try {
        await userService.logout()
        store.dispatch({ type: SET_USER, user: null })
    } catch (err) {
        console.error('Cannot logout:', err)
        throw err
    }
}

export async function signup(credentials) {
    // console.log('from actions',credentials)
    try {
        const user = await userService.signup(credentials)
        store.dispatch({ type: SET_USER, user })
        return user
    } catch (err) {
        console.error('Cannot signup:', err)
        throw err
    }
}
