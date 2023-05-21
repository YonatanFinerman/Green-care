import { useDispatch, useSelector } from "react-redux"
import { TOGGLE_GATHERING_MODAL } from "../store/reducers/gathering.reducer"
import { IoClose } from "react-icons/io5"
import { BsFillPersonFill } from "react-icons/bs"

export function CreateGatheringModal({ userRole, onCreateJoinGathering, gathering, newgatheringTime }) {

    const isGatheringModal = useSelector(storeState => storeState.gatheringModule.isGatheringModal)
    const dispatch = useDispatch()


    return <section className={`gathering-modal ${(isGatheringModal) ? 'open' : 'closed'} `}>
        <p className="close-modal-btn"><IoClose onClick={() => dispatch({ type: TOGGLE_GATHERING_MODAL })} /><span>Confirm details</span> </p>
        <div>
            <p className="flex space-between"><span>Location:</span> <span>{gathering.locName}</span></p>
            <p className="flex space-between"> <span>Date:</span> <span>{new Date(newgatheringTime.date).toLocaleDateString()}</span></p>
            <p className="flex space-between"><span>Time:</span> <span>  {`${(newgatheringTime.time.hour < 10) ? '0' : ''}${newgatheringTime.time.hour} : ${(newgatheringTime.time.min < 10) ? '0' : ''}${newgatheringTime.time.min}`}</span></p>
            <p className="flex space-between"><span>Participents:</span> <span>{gathering.capacity}<BsFillPersonFill /></span></p>
            <p className="flex space-between"><span>Care points:</span> <span>{(userRole) ? 2 : 1}</span></p>
        </div>
        <img src={gathering.imgsBefore[0]} alt="" />
        <button onClick={onCreateJoinGathering}>{(gathering.users.length) ? 'Join gathering' : 'Create gathering'}</button>
    </section>
}