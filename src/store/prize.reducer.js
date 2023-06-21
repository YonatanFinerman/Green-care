export const SET_PRIZES = 'SET_PRIZES'
export const REMOVE_PRIZE = 'REMOVE_PRIZE'
export const ADD_PRIZE = 'ADD_PRIZE'
export const UPDATE_PRIZE = 'UPDATE_PRIZE'
export const ADD_TO_PRIZET = 'ADD_TO_PRIZET'
export const CLEAR_PRIZET = 'CLEAR_PRIZET'
export const UNDO_REMOVE_PRIZE = 'UNDO_REMOVE_PRIZE'
export const REMOVE_FROM_PRIZET = 'REMOVE_FROM_PRIZET'
export const TOGGLE_FILTER_MODAL = 'TOGGLE_FILTER_MODAL'
export const TOGGLE_PRIZE_MODAL = 'TOGGLE_PRIZE_MODAL'
export const TOGGLE_IS_PRIZE = 'TOGGLE_IS_PRIZE'

export const SET_CURR_PRIZE = 'SET_CURR_PRIZE'

const initialState = {
    prizes: [],
    currPrize:null,
    lastRemovedPrize: null,
    isPrize: false,
    isFilterModal:false,
    isPrizeModal:false,
}

export function prizeReducer(state = initialState, action) {
    var newState = state
    var prizes
    var prizet
    switch (action.type) {
        case SET_PRIZES:
            newState = { ...state, prizes: action.prizes }
            break
        case SET_CURR_PRIZE:
            newState = { ...state, currPrize: action.prize }
            break
        case REMOVE_PRIZE:
            const lastRemovedPrize = state.prizes.find(prize => prize._id === action.prizeId)
            prizes = state.prizes.filter(prize => prize._id !== action.prizeId)
            newState = { ...state, prizes, lastRemovedPrize }
            break
        case ADD_PRIZE:
            newState = { ...state, prizes: [...state.prizes, action.prize] }
            break
        case TOGGLE_FILTER_MODAL:
            newState = { ...state, isFilterModal: !state.isFilterModal }
            break
        case TOGGLE_PRIZE_MODAL:
            newState = { ...state, isPrizeModal: !state.isPrizeModal }
            break
        case TOGGLE_IS_PRIZE:
            newState = { ...state, isPrize: action.isPrize }
            break
        case UPDATE_PRIZE:
            prizes = state.prizes.map(prize => (prize._id === action.prize._id) ? action.prize : prize)
            newState = { ...state, prizes }
            break
        case ADD_TO_PRIZET:
            newState = { ...state, prizet: [...state.prizet, action.prize] }
            break
        case REMOVE_FROM_PRIZET:
            prizet = state.prizet.filter(prize => prize._id !== action.prizeId)
            newState = { ...state, prizet }
            break
        case CLEAR_PRIZET:
            newState = { ...state, prizet: [] }
            break
        case UNDO_REMOVE_PRIZE:
            if (state.lastRemovedPrize) {
                newState = { ...state, prizes: [...state.prizes, state.lastRemovedPrize], lastRemovedPrize: null }
            }
            break
        default:
    }
    return newState
}
