import { useEffect, useState } from "react";
import { AppHeader } from "../cmps/app-header";
import { loadPrizes, updatePrize } from "../store/actions/prize.actions";
import { useDispatch, useSelector } from "react-redux";
import { PrizePreview } from "../cmps/prize-preview";
import { updateUser } from "../store/actions/user.actions";
import { SET_REVEALED_CODE } from "../store/prize.reducer";

export function PrizeIndex() {
    const prizes = useSelector(storeState => storeState.prizeModule.prizes)
    const revealedCode = useSelector(storeState => storeState.prizeModule.revealedCode)
    const user = useSelector(storeState => storeState.userModule.user)
    const dispatch = useDispatch()

    useEffect(() => {
        loadPrizes()
    }, [])

    async function onConfirmReward(prize) {

        try {
            const updatedPrize = structuredClone(prize)
            const updatedUser = structuredClone(user)

            const newCode = updatedPrize.codes.shift(1)
            updatedUser.coins = updatedUser.coins - prize.cost

            updatedUser.prizes.push({
                code: newCode, _id: updatedPrize._id,
                storeName: updatedPrize.storeName,
                img: updatedPrize.img,
                prizeDesc: updatedPrize.prizeDesc
            })

            updatedUser.actions.unshift({
                name: updatedPrize.storeName,
                img: updatedPrize.img,
                action: 'Redeemed a prize',
                time: Date.now(),
            })

            const prizePrm = updatePrize(updatedPrize)
            const userPrm = updateUser(updatedUser)


            await Promise.all([prizePrm, userPrm])

            // dispatch({ type: SET_CURR_PRIZE, prize: null })
            dispatch({ type: SET_REVEALED_CODE, revealedCode: newCode })

            // then reveal the code and add a button to copy to clip board before closeing the modal
        }
        catch (err) {
            console.log('unable to redeem prize', err)
        }
    }



    return <section className="prize-index main-layout">
        <AppHeader />

        <div className="user-wallet flex column">
            <h3>{user.fullName}</h3>
            <div className="wallet-info flex">
                <div className="flex column">
                    <small>Balance</small>
                    <p>{user.coins} Care points</p>
                </div>
                <div className="flex column">
                    <small>User level</small>
                    <p>{user.xp} Green master</p>
                </div>
            </div>
        </div>

        <section className="prize-list">
            {prizes.map(prize => {
                return <PrizePreview key={prize._id} prize={prize} user={user} onConfirmReward={onConfirmReward} revealedCode={revealedCode} />
            })}
        </section>


    </section>
}