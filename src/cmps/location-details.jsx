import { useEffect } from "react";
import { AppHeader } from "./app-header";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { gatheringService } from "../services/gathering.service";
import { DatePickerCmp } from "./date-picker";
import { GoogleMap } from "./map";
import { BsCalendarDate, BsCalendarDateFill, BsFillPersonFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { setUserLoc, updateUser } from "../store/actions/user.actions";
import { RiArrowUpSFill, RiArrowDownSFill, RiPinDistanceFill } from "react-icons/ri";
import { TbBrandCoinbase } from "react-icons/tb";
import { FaCheck, FaClock } from "react-icons/fa";
import { TOGGLE_GATHERING_MODAL } from "../store/reducers/gathering.reducer";
import { CreateGatheringModal } from "./create-gathering-modal";
import { updateGathering } from "../store/actions/gathering.actions";
import { utilService } from "../services/util.service";
import { TOGGLE_IS_SHADOW } from "../store/system.reducer";

export function LocationDetails() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userLoc = useSelector(storeState => storeState.userModule.userLoc)
    const user = useSelector(storeState => storeState.userModule.user)
    const [newgatheringTime, setNewGatheringTime] = useState({ date: null, time: { hour: 12, min: 0 } })
    const [currGathering, setCurrgathering] = useState(null)
    const [currImgUrlIdx, setCurrImgUrlIdx] = useState(0)
    const [userRole, setUserRole] = useState(null)
    const [isSelectedDateErr, setIsSelectedDateErr] = useState(false)
    const { locationId } = useParams()


    useEffect(() => {
        loadGathering(locationId)
    }, [])

    async function loadGathering(locationId) {
        try {
            const gathering = await gatheringService.getById(locationId)
            console.log(gathering, 'omg')
            if (gathering.time) {
                setNewGatheringTime({ date: gathering.time, time: { hour: new Date(gathering.time).getHours(), min: new Date(gathering.time).getMinutes() } })
                if (user) {
                    checkUserRole(gathering)
                }
            }
            setCurrgathering(gathering)
            return gathering
        }
        catch (err) {
            console.log("unable to load gathering", err)
            return err
        }
    }


    function checkUserRole(gathering) {
        const userIdx = gathering.users.findIndex(participent => participent._id === user._id)
        console.log('useridx', userIdx)
        if (userIdx === 0) {
            setUserRole('host')
        }
        else if (userIdx > 0) {
            setUserRole('participent')
        }
    }

    function handleTimeInput(type, changeBy) {
        if (type === 'hour') {
            if (changeBy > 0 && newgatheringTime.time.hour === 23) {
                setNewGatheringTime(prev => ({ ...prev, time: { ...prev.time, hour: 0 } }))
            }
            else if (changeBy < 0 && newgatheringTime.time.hour === 0) {
                setNewGatheringTime(prev => ({ ...prev, time: { ...prev.time, hour: 23 } }))
            }
            else {
                setNewGatheringTime(prev => ({ ...prev, time: { ...prev.time, hour: prev.time.hour + changeBy } }))
            }
        }
        else {
            if (changeBy > 0 && newgatheringTime.time.min === 55) {
                setNewGatheringTime(prev => ({ ...prev, time: { ...prev.time, min: 0 } }))
            }
            else if (changeBy < 0 && newgatheringTime.time.min === 0) {
                setNewGatheringTime(prev => ({ ...prev, time: { ...prev.time, min: 55 } }))
            }
            else {
                setNewGatheringTime(prev => ({ ...prev, time: { ...prev.time, min: prev.time.min + changeBy } }))
            }
        }
    }

    async function onCreateJoinGathering() {
        try {
            const newGathering = structuredClone(currGathering)
            const updatedUser = structuredClone(user)
            // deep clone

            if (!currGathering.users.length) {
                const min = 1000 * 60
                const hour = min * 60
                newGathering.time = newgatheringTime.date + (newgatheringTime.time.hour * hour) + (newgatheringTime.time.min * min)
            }
            updatedUser.actions.unshift({
                name: newGathering.locName,
                img: newGathering.imgsBefore[0],
                action: (currGathering.users.length) ? 'joined gathering' : 'Hosted gathering',
                time: Date.now(),
            })
            updatedUser.coins += (currGathering.users.length) ? 1 : 2

            newGathering.users.push({ fullName: user.fullName, profileImg: user.profileImg, _id: user._id })

            const gatheringPrm = updateGathering(newGathering)
            const userPrm = updateUser(updatedUser)

            await Promise.all([gatheringPrm, userPrm])

            dispatch({ type: TOGGLE_GATHERING_MODAL })
            dispatch({ type: TOGGLE_IS_SHADOW })
            setCurrgathering(newGathering)
            checkUserRole(newGathering)
        }

        catch (err) {
            console.log('there was an error joining this gathering')
        }
    }

    function onOpenGatheringModal() {

        if (newgatheringTime.date || currGathering.users.length) {

            dispatch({ type: TOGGLE_GATHERING_MODAL })
            dispatch({ type: TOGGLE_IS_SHADOW })
        }
        else {
            setIsSelectedDateErr(true)
        }
        
    }

    {
        if (currGathering) return <section className="location-details main-layout">
            <AppHeader />
            <div>
                <div className="location flex">
                    <div className="gatheringCarousel flex">

                        <div className="gatheringImgs">
                            {currGathering.imgsBefore.map((currImg, idx) => {
                                return <img src={currImg} style={{ transform: `translateY(-${currImgUrlIdx * 100}%)` }} key={currImg} className={`img${idx + 1}`} />
                            })}
                        </div>
                        <div className="carousel-paging flex">
                            {currGathering.imgsBefore.map((currImg, idx) => {
                                return <img src={currImg} key={currImg + 1} onClick={() => setCurrImgUrlIdx(idx)} />
                            })}
                        </div>
                    </div>

                    <div className="location-info">
                        <h2>{currGathering.locName}</h2>
                        <p>{currGathering.info}</p>

                        <div className="gathering-stats">
                            {(currGathering.users.length > 0 && userRole !== 'host') && <div className="gathering-host flex align-center justify-center">
                                <p>Gathering host: {currGathering.users[0].fullName}</p>
                                <img src={currGathering.users[0].profileImg} />
                            </div>}

                            {(userRole === 'host') && <h4 className="host-msg">You are this gathering's host!  <FaCheck /></h4>}

                            <div className="info-list">

                                <div className="flex justify-center"><p> {currGathering.users.length + ' / ' + currGathering.capacity} <BsFillPersonFill /></p></div>
                                <div className="flex justify-center"><p>{gatheringService.getDistanceFromUser(userLoc, currGathering.loc) + 'km'}<RiPinDistanceFill /></p></div>
                                {(currGathering.time) && <div className="flex justify-center"><p>{new Date(newgatheringTime.date).toLocaleDateString()}<BsCalendarDateFill /></p></div>}
                                {(currGathering.time) && <div className="flex justify-center"><p>{`  ${(newgatheringTime.time.hour < 10) ? '0' : ''}${newgatheringTime.time.hour} : ${(newgatheringTime.time.min < 10) ? '0' : ''}${newgatheringTime.time.min}`}<FaClock /></p></div>}

                            </div>
                        </div>

                        <div className="text-center">

                            {(currGathering.time) && <p>This gathering is {utilService.getTimeRemaining(currGathering.time)}</p>}
                            <p>{currGathering.status}</p>
                            {(userRole === 'participent') && <h4>You joined this gathering! <FaCheck /></h4>}
                        </div>

                        {(!currGathering.users.length) && <div className="create-gathering flex column align-center">
                            <h3>Become a host</h3>
                            <DatePickerCmp setNewGatheringTime={setNewGatheringTime} newgatheringTime={newgatheringTime} />
                            {(isSelectedDateErr) && <p className="select-date-error">Please select date!</p>}
                            <p>Select Time</p>

                            <div className="time-picker flex">
                                <div className="flex column align-center">
                                    <button onClick={() => { handleTimeInput('hour', 1) }} ><RiArrowUpSFill /></button>
                                    <p>{`${(newgatheringTime.time.hour < 10) ? 0 : ''}`}{newgatheringTime.time.hour}</p>
                                    <button onClick={() => { handleTimeInput('hour', -1) }}><RiArrowDownSFill /></button>

                                </div>
                                <p className="flex align-center"><span>:</span></p>
                                <div className="flex column align-center">
                                    <button onClick={() => { handleTimeInput('min', 5) }}><RiArrowUpSFill /></button>
                                    <p>{`${(newgatheringTime.time.min < 10) ? 0 : ''}`}{newgatheringTime.time.min}</p>
                                    <button onClick={() => { handleTimeInput('min', -5) }}><RiArrowDownSFill /></button>

                                </div>
                            </div>
                            <button className="create-btn" onClick={onOpenGatheringModal}>Create gathering</button>
                            <small>Host now and earn 2 care points</small>
                        </div>}
                        {(currGathering.users.length > 0 && !userRole) && <div className="join-gathering ">
                            <button onClick={onOpenGatheringModal}>Join gathering</button>
                            <p>Join now and earn 1 care point</p>
                        </div>}

                    </div>
                </div>
            </div>

            <GoogleMap loc={currGathering.loc} />
            <CreateGatheringModal userRole={userRole} onCreateJoinGathering={onCreateJoinGathering} gathering={currGathering} newgatheringTime={newgatheringTime} />

        </section>
    }
}

