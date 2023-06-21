import { prizeService } from '../../services/prize.service.js';
import { userService } from '../../services/user.service.js';
import { store } from '../store.js';
import { ADD_PRIZE, SET_PRIZES, UPDATE_PRIZE } from '../prize.reducer.js';

// import { SET_SCORE } from "./user.reducer.js";


// Action Creators:
// export function getActionRemovePrize(prizeId) {
//     return {
//         type: REMOVE_PRIZE,
//         prizeId
//     }
// }

export function getActionAddPrize(prize) {
    return {
        type: ADD_PRIZE,
        prize
    }
}

export function getActionUpdatePrize(prize) {
    return {
        type: UPDATE_PRIZE,
        prize
    }
}

export async function addPrize(prize) {
    try {
        const savedPrize = await prizeService.save(prize)
        store.dispatch(getActionAddPrize(savedPrize))
        return savedPrize
    } catch (err) {
        console.log('Cannot add prize', err)
        throw err
    }
}

export async function loadPrizes(filterBy) {
    try {
        const prizes = await prizeService.query()
        store.dispatch({
            type: SET_PRIZES,
            prizes
        })

    } catch (err) {
        console.log('Cannot load prizes', err)
        throw err
    }

}

export async function updatePrize(prize) {
    try {
        const savedPrize = await prizeService.save(prize)
        store.dispatch(getActionUpdatePrize(savedPrize))
        return savedPrize
    }
    catch (err) {
        console.log('Cannot save prize', err)
        throw err
    }
    // return prizeService.save(prize)
    //     .then(savedPrize => {
    //         console.log('Updated Prize:', savedPrize)
    //         store.dispatch(getActionUpdatePrize(savedPrize))
    //         return savedPrize
    //     })
    //     .catch(err => {
    //         console.log('Cannot save prize', err)
    //         throw err
    //     })
}

// export async function removePrize(prizeId) {
//     try {
//         await prizeService.remove(prizeId)
//         store.dispatch(getActionRemovePrize(prizeId))
//     } catch (err) {
//         console.log('Cannot remove prize', err)
//         throw err
//     }
// }





// export function addToPrizet(prize) {
//     store.dispatch({
//         type: ADD_TO_PRIZET,
//         prize
//     })
// }

// export function removeFromPrizet(prizeId) {
//     store.dispatch({
//         type: REMOVE_FROM_PRIZET,
//         prizeId
//     })
// }

// export async function checkout(total) {
//     try {
//         const score = await userService.changeScore(-total)
//         store.dispatch({ type: SET_SCORE, score })
//         store.dispatch({ type: CLEAR_PRIZET })
//         return score
//     } catch (err) {
//         console.log('PrizeActions: err in checkout', err)
//         throw err
//     }
// }


// // Demo for Optimistic Mutation
// // (IOW - Assuming the server call will work, so updating the UI first)
// export function onRemovePrizeOptimistic(prizeId) {
//     store.dispatch({
//         type: REMOVE_PRIZE,
//         prizeId
//     })
//     showSuccessMsg('Prize removed')

//     prizeService.remove(prizeId)
//         .then(() => {
//             console.log('Server Reported - Deleted Succesfully');
//         })
//         .catch(err => {
//             showErrorMsg('Cannot remove prize')
//             console.log('Cannot load prizes', err)
//             store.dispatch({
//                 type: UNDO_REMOVE_PRIZE,
//             })
//         })
// }
