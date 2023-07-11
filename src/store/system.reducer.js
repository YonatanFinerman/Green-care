export const LOADING_START = 'LOADING_START'
export const LOADING_DONE = 'LOADING_DONE'
export const TOGGLE_IS_SHADOW= 'TOGGLE_IS_SHADOW'
export const SET_PROFILE_MODAL= 'SET_PROFILE_MODAL'

const initialState = {
  isLoading: false,
  isShadow:false,
  profileModal:null,
}

export function systemReducer (state = initialState, action = {}) {
  switch (action.type) {
    case LOADING_START:
      return { ...state, isLoading: true }
    case LOADING_DONE:
      return { ...state, isLoading: false }
    case SET_PROFILE_MODAL:
      return { ...state, profileModal: action.profileModal }
    case TOGGLE_IS_SHADOW:
      return { ...state, isShadow: !state.isShadow }
    default: return state
  }
}
