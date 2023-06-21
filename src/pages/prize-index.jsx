import { useEffect, useState } from "react";
import { AppHeader } from "../cmps/app-header";
import { loadPrizes, updatePrize } from "../store/actions/prize.actions";
import { useSelector } from "react-redux";
import { PrizePreview } from "../cmps/prize-preview";
import { updateUser } from "../store/actions/user.actions";

export function PrizeIndex() {

    const prizes = useSelector(storeState => storeState.prizeModule.prizes)
    const user = useSelector(storeState => storeState.userModule.user)

    useEffect(() => {
        loadPrizes()
    }, [])

 async function onConfirmReward(prize){
        const updatedPrize = structuredClone(prize)
        const updatedUser = structuredClone(user)

        const newCode = updatedPrize.codes.shift(1)
        updatedUser.prizes.push(newCode)
        updatedUser.coins = updatedUser.coins - prize.cost
        
        try{
            const prizePrm = updatePrize(updatedPrize)
            const userPrm =  updateUser(updatedUser)
            const res = await Promise.all([prizePrm,userPrm])
        }
        catch(err){
            console.log('unable to redeem prize',err)
        }
    }

    return <section className="prize-index main-layout">
        <AppHeader />

        <div className="user-wallet flex column">
            <h3>{user.fullname}</h3>
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
                return <PrizePreview key={prize._id} prize={prize} user={user} onConfirmReward={onConfirmReward} />
            })}
        </section>

    </section>
}