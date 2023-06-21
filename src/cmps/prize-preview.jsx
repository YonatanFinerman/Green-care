import { useDispatch, useSelector } from "react-redux"
import { SET_CURR_PRIZE } from "../store/prize.reducer"
import { useState } from "react"

export function PrizePreview({ prize, user,onConfirmReward }) {

    const dispatch = useDispatch()
    const currPrize = useSelector(storeState => storeState.prizeModule.currPrize)
    const [lowBalanceErr, setLowBalanceErr] = useState(false)

    return <article className={`prize-preview flex ${(currPrize?._id === prize._id) ? 'curr-prize' : ''}`}>

        {(!prize.codes.length) && <div className="out-of-stock flex align-center justify-center"><span>Out of stock</span> </div>}

        <img src={prize.img} />

        <div className="prev-info flex column">
            <p className="prize-name">{prize.name}</p>
            <p>{prize.prizeDesc}</p>

            {(currPrize?._id === prize._id) && <div className="tranaction">
                <h4>Transaction</h4>

                <div className="flex text-center">

                    <div>
                        <p>{user.coins}</p>
                        <small>Your balance</small>
                    </div>
                    <p>-</p>
                    <div>
                        <p>{prize.cost}</p>
                        <small>Prize cost</small>
                    </div>
                    <p>=</p>
                    <div>
                        <p>{user.coins - prize.cost}</p>
                        <small>Remaining balance</small>
                    </div>
                </div>

            </div>}

            <div className="prev-footer flex align-center">
                <p className="amount-left">{prize.codes.length} in stock</p>
                <div className="flex align-center">
                    <p>{prize.cost} care points</p>
                    {(currPrize?._id !== prize._id) ? <button onClick={() => {
                        dispatch({ type: SET_CURR_PRIZE, prize })

                    }}>Redeem</button> : <button onClick={() => {
                        if (user.coins - prize.cost < 0) {
                            setLowBalanceErr(true)
                            return
                        }
                        onConfirmReward(prize)

                    }}>Confirm</button>}
                    {(lowBalanceErr && currPrize?._id === prize._id) && <small className="error-msg">Not enught credit!</small>}
                </div>
            </div>
        </div>
    </article>
}