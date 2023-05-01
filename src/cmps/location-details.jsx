import { useEffect } from "react";
import { AppHeader } from "./app-header";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { gatheringService } from "../services/gathering.service";
import { DatePickerCmp } from "./date-picker";
import { GoogleMap } from "./map";
import { BsFillPersonFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import { setUserLoc } from "../store/actions/user.actions";
import { RiArrowUpSFill,RiArrowDownSFill } from "react-icons/ri";

export function LocationDetails() {

    const { locationId } = useParams()
    const [currGathering, setCurrgathering] = useState(null)
    const [currImgUrlIdx, setCurrImgUrlIdx] = useState(0)
    const userLoc = useSelector(storeState => storeState.userModule.userLoc)

    useEffect(() => {
        console.log(locationId)
        loadGathering(locationId)
        setUserLoc()
    }, [])

    async function loadGathering(locationId) {
        try {
            const gathering = await gatheringService.getById(locationId)
            setCurrgathering(gathering)
        }
        catch (err) {
            console.log("unable to load gathering")
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
                        <div className="carousel-paging flex column">
                            {currGathering.imgsBefore.map((currImg, idx) => {
                                return <img src={currImg} key={currImg + 1} onClick={() => setCurrImgUrlIdx(idx)} />
                            })}
                        </div>
                    </div>

                    <div className="location-info">
                        <h2>{currGathering.locName}</h2>
                        <p>{currGathering.info}</p>
                        <p className="prev-capacity flex"> {currGathering.users.length + ' / ' + currGathering.capacity} <span><BsFillPersonFill /></span></p>
                        <p>{gatheringService.getDistanceFromUser(userLoc, currGathering.loc) + 'km away'}</p>

                        {(!currGathering.users.length) && <div className="create-gathering flex column align-center">
                            <h3>Become a host</h3>
                            <DatePickerCmp />
                            <p>Select Time</p>
                            
                            <div className="time-picker flex">


                                <div className="flex column align-center">
                                    <button><RiArrowUpSFill /></button>
                                    <p>22</p>
                                    <button><RiArrowDownSFill /></button>

                                </div>
                                <p className="flex align-center"><span>:</span></p>
                                <div className="flex column align-center">
                                    <button><RiArrowUpSFill /></button>
                                    <p>22</p>
                                    <button><RiArrowDownSFill /></button>

                                </div>
                            </div>

                            <button className="create-btn">Create gathering</button>

                        </div>}

                    </div>
                </div>
            </div>

            <GoogleMap />

        </section>
    }
}

