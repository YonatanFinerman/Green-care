import { gatheringService } from '../../services/gathering.service.js';
import { userService } from '../../services/user.service.js';
import { store } from '../store.js';
// import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { ADD_GATHERING, SET_GATHERINGS, UPDATE_GATHERING } from '../reducers/gathering.reducer.js'
// import { SET_SCORE } from "./user.reducer.js";

// Action Creators:
// export function getActionRemoveGathering(gatheringId) {
//     return {
//         type: REMOVE_GATHERING,
//         gatheringId
//     }
// }

export function getActionAddGathering(gathering) {
    return {
        type: ADD_GATHERING,
        gathering
    }
}

export function getActionUpdateGathering(gathering) {
    return {
        type: UPDATE_GATHERING,
        gathering
    }
}

export async function addGathering(gathering) {
    try {
        const savedGathering = await gatheringService.save(gathering)
        console.log('Added Gathering', savedGathering)
        store.dispatch(getActionAddGathering(savedGathering))
        return savedGathering
    } catch (err) {
        console.log('Cannot add gathering', err)
        throw err
    }
}

export async function loadGatherings(filterBy, userLoc = null) {
    try {
        const gatherings = await gatheringService.query(filterBy,userLoc)
        store.dispatch({
            type: SET_GATHERINGS,
            gatherings
        })

    } catch (err) {
        console.log('Cannot load gatherings', err)
        throw err
    }

}

export async function updateGathering(gathering) {
    try {
        const savedGathering = await gatheringService.save(gathering)
        store.dispatch(getActionUpdateGathering(savedGathering))
        return savedGathering
    }
    catch (err) {
        console.log('Cannot save gathering', err)
        throw err
    }
    // return gatheringService.save(gathering)
    //     .then(savedGathering => {
    //         console.log('Updated Gathering:', savedGathering)
    //         store.dispatch(getActionUpdateGathering(savedGathering))
    //         return savedGathering
    //     })
    //     .catch(err => {
    //         console.log('Cannot save gathering', err)
    //         throw err
    //     })
}

// export async function removeGathering(gatheringId) {
//     try {
//         await gatheringService.remove(gatheringId)
//         store.dispatch(getActionRemoveGathering(gatheringId))
//     } catch (err) {
//         console.log('Cannot remove gathering', err)
//         throw err
//     }
// }





// export function addToGatheringt(gathering) {
//     store.dispatch({
//         type: ADD_TO_GATHERINGT,
//         gathering
//     })
// }

// export function removeFromGatheringt(gatheringId) {
//     store.dispatch({
//         type: REMOVE_FROM_GATHERINGT,
//         gatheringId
//     })
// }

// export async function checkout(total) {
//     try {
//         const score = await userService.changeScore(-total)
//         store.dispatch({ type: SET_SCORE, score })
//         store.dispatch({ type: CLEAR_GATHERINGT })
//         return score
//     } catch (err) {
//         console.log('GatheringActions: err in checkout', err)
//         throw err
//     }
// }


// // Demo for Optimistic Mutation
// // (IOW - Assuming the server call will work, so updating the UI first)
// export function onRemoveGatheringOptimistic(gatheringId) {
//     store.dispatch({
//         type: REMOVE_GATHERING,
//         gatheringId
//     })
//     showSuccessMsg('Gathering removed')

//     gatheringService.remove(gatheringId)
//         .then(() => {
//             console.log('Server Reported - Deleted Succesfully');
//         })
//         .catch(err => {
//             showErrorMsg('Cannot remove gathering')
//             console.log('Cannot load gatherings', err)
//             store.dispatch({
//                 type: UNDO_REMOVE_GATHERING,
//             })
//         })
// }
