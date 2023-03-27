export const SET_GATHERINGS = 'SET_GATHERINGS'
export const REMOVE_GATHERING = 'REMOVE_GATHERING'
export const ADD_GATHERING = 'ADD_GATHERING'
export const UPDATE_GATHERING = 'UPDATE_GATHERING'
export const ADD_TO_GATHERINGT = 'ADD_TO_GATHERINGT'
export const CLEAR_GATHERINGT = 'CLEAR_GATHERINGT'
export const UNDO_REMOVE_GATHERING = 'UNDO_REMOVE_GATHERING'
export const REMOVE_FROM_GATHERINGT = 'REMOVE_FROM_GATHERINGT'

const initialState = {
    gatherings: [],
    gatheringt: [],
    lastRemovedGathering: null,
    isGathering: false,
}

export function gatheringReducer(state = initialState, action) {
    var newState = state
    var gatherings
    var gatheringt
    switch (action.type) {
        case SET_GATHERINGS:
            newState = { ...state, gatherings: action.gatherings }
            break
        case REMOVE_GATHERING:
            const lastRemovedGathering = state.gatherings.find(gathering => gathering._id === action.gatheringId)
            gatherings = state.gatherings.filter(gathering => gathering._id !== action.gatheringId)
            newState = { ...state, gatherings, lastRemovedGathering }
            break
        case ADD_GATHERING:
            newState = { ...state, gatherings: [...state.gatherings, action.gathering] }
            break
        case UPDATE_GATHERING:
            gatherings = state.gatherings.map(gathering => (gathering._id === action.gathering._id) ? action.gathering : gathering)
            newState = { ...state, gatherings }
            break
        case ADD_TO_GATHERINGT:
            newState = { ...state, gatheringt: [...state.gatheringt, action.gathering] }
            break
        case REMOVE_FROM_GATHERINGT:
            gatheringt = state.gatheringt.filter(gathering => gathering._id !== action.gatheringId)
            newState = { ...state, gatheringt }
            break
        case CLEAR_GATHERINGT:
            newState = { ...state, gatheringt: [] }
            break
        case UNDO_REMOVE_GATHERING:
            if (state.lastRemovedGathering) {
                newState = { ...state, gatherings: [...state.gatherings, state.lastRemovedGathering], lastRemovedGathering: null }
            }
            break
        default:
    }
    return newState
}