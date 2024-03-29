import { userService } from '../../services/user.service.js'

export const INCREMENT = 'INCREMENT'
export const DECREMENT = 'DECREMENT'
export const CHANGE_COUNT = 'CHANGE_COUNT'
export const SET_USER = 'SET_USER'
export const UPDATE_USER = 'UPDATE_USER'
export const SET_WATCHED_USER = 'SET_WATCHED_USER'
export const REMOVE_USER = 'REMOVE_USER'
export const SET_USERS = 'SET_USERS'
export const SET_SCORE = 'SET_SCORE'
export const SET_USER_LOC = 'SET_USER_LOC'
export const TOGGLE_LOGIN_FORM = 'TOGGLE_LOGIN_FORM'
export const TOGGLE_USERLOC_MODAL = 'TOGGLE_USERLOC_MODAL'

const initialState = {
    count: 10,
    user: userService.getLoggedinUser(),
    users: [],
    isLoginForm: true,
    watchedUser: null,
    isSignUpModal: false,
    isCheckoutModal: false,
    isRefreshedLoginModal: true,
    userLoc: null,
    isUserLocModal:false,

}

export function userReducer(state = initialState, action) {
    var newState = state
    let users
    switch (action.type) {

        case TOGGLE_LOGIN_FORM:
            newState = { ...state, isLoginForm: !state.isLoginForm }
            break
        case TOGGLE_USERLOC_MODAL:
            newState = { ...state, isUserLocModal: !state.isUserLocModal }
            break
        case INCREMENT:
            newState = { ...state, count: state.count + 1 }
            break
        case DECREMENT:
            newState = { ...state, count: state.count - 1 }
            break
        case CHANGE_COUNT:
            newState = { ...state, count: state.count + action.diff }
            break
        case SET_USER:
            newState = { ...state, user: action.user }
            break
        case SET_WATCHED_USER:
            newState = { ...state, watchedUser: action.user }
            break
        case REMOVE_USER:
            newState = {
                ...state,
                users: state.users.filter(user => user._id !== action.userId)
            }
            break
        case SET_USERS:
            console.log(action.users)
            newState = { ...state, users: action.users }
            break
        case SET_USER_LOC:
            newState = { ...state, userLoc: action.userLoc }
            break
        case SET_SCORE:
            newState = { ...state, user: { ...state.user, score: action.score } }
            break
        case UPDATE_USER:

            newState = { ...state, user: action.savedUser }
            break

        default:
    }
    // For debug:
    // window.userState = newState
    // console.log('State:', newState)
    return newState

}
