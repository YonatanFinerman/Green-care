import { createStore, combineReducers } from 'redux'
import { gatheringReducer } from './reducers/gathering.reducer.js'

// import { carReducer } from './car.reducer.js'
import { userReducer } from './reducers/user.reducer.js'
import { systemReducer } from './system.reducer.js'
import { prizeReducer } from './prize.reducer.js'
// import { reviewReducer } from './review.reducer'
// import { systemReducer } from './system.reducer'

const rootReducer = combineReducers({
    
    userModule: userReducer,
    gatheringModule: gatheringReducer,
    prizeModule: prizeReducer,
    systemModule: systemReducer,
    // reviewModule: reviewReducer,
})


const middleware = (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() : undefined
export const store = createStore(rootReducer, middleware)


store.subscribe(() => {
    console.log('**** Store state changed: ****')
    console.log('storeState:\n', store.getState())
    console.log('*******************************')
})



