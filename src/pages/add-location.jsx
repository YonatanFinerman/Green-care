import { useLayoutEffect, useRef, useState } from "react";
import { AppHeader } from "../cmps/app-header";
import { gatheringService } from "../services/gathering.service";
import { uploadImg } from "../services/cloudinary-service.js"
import { AmoutInput } from "../cmps/participants-amount-input";
import { GoogleMap } from "../cmps/map";
import { useSelector } from "react-redux";
import { AiOutlinePlus } from "react-icons/ai"
import { utilService } from "../services/util.service";

export function AddLocationPage() {

    const [location, setLocation] = useState(gatheringService.getEmptyLocation())
    const [currImgIdx, setCurrImgIdx] = useState(0)
    const [possibleLocs, setPossibleLocs] = useState([])
    const userLoc = useSelector(storeState => storeState.userModule.userLoc)
    const debouncedGetLocByName = useRef(utilService.asyncDebounce(gatheringService.getLocationByName, 5000)).current

    const imgInput0 = useRef(null)
    const imgInput1 = useRef(null)
    const imgInput2 = useRef(null)

    function handleDivClick(idx) {
        console.log('userloc', userLoc)
        const imgInput = getImgInputRef(idx)
        imgInput.current.click()
    }

    function handleFileChange(ev, idx) {

        const selectedFile = ev.target.files[0]

        if (selectedFile && selectedFile.type.includes('image')) {

            const reader = new FileReader()
            reader.onload = function (ev) {
                const url = ev.target.result
                const updatedLocation = { ...location }
                updatedLocation.imgsBefore[idx] = url
                setLocation(updatedLocation)
            }
            reader.readAsDataURL(selectedFile)
        }
        return
    }

    async function handleChange({ target }) {
        let { value, name: field, type, checked } = target
        value = (type === 'number' || type === 'range') ? +value : value
        if (type === 'checkbox') {
            value = checked
        }
        if (field === 'locName') {

            try {
                const newPossibleLocs = await debouncedGetLocByName(value)
                setPossibleLocs(newPossibleLocs)
            }
            catch (err) {
                console.log('err', err)
            }
        }

    }

    function getImgInputRef(idx) {
        if (idx === 0) {
            return imgInput0
        }
        else if (idx === 1) {
            return imgInput1
        }
        else {
            return imgInput2
        }
    }

    return <section className="inform-location-page main-layout">
        <AppHeader />
        <form className="add-location-form flex">
            <div className="location-imgs flex">
                {(location.imgsBefore.length > 0) ? <img className="curr-img" src={location.imgsBefore[currImgIdx]} /> : <div className="curr-img flex justify-center align-center">no selected img</div>}

                <div className="location-imgs-paging flex">
                    {Array.from({ length: 3 }, (_, idx) => (
                        <div className="empty-img flex justify-center align-center" key={'empty-img' + idx} onClick={() => handleDivClick(idx)}>
                            <input
                                type="file"
                                ref={getImgInputRef(idx)}
                                style={{ display: 'none' }}
                                onChange={(event) => handleFileChange(event, idx)}
                            />
                            {(location.imgsBefore[idx]) ? <img src={location.imgsBefore[idx]} /> : <p><AiOutlinePlus /></p>}
                        </div>))}
                </div>

            </div>
            <div className="location-info-inputs flex column align-center ">
                <div className="location-name-input-container">

                    <input className="location-name-input text-center" name="locName" onChange={handleChange} type="text" placeholder="Location name *" />

                    {(possibleLocs.length>0 && !location.loc) && <ul className="possible-locs-list">
                        {possibleLocs.map(loc=>{
                            return <li className="possible-loc-prev text-center" key={loc.place_id} >
                                {loc.formatted_address}
                            </li>
                        })}
                        </ul>}
                </div>

                <textarea className="location-info-input text-center" name="info" onChange={handleChange} placeholder="Tell us about this location *" style={{ resize: 'none' }} maxLength={500}></textarea>
                <h3>Participants amount</h3>
                <AmoutInput capacity={location.capacity} setCapacity={setLocation} />
                <div className="flex column" style={{ gap: '0.5rem' }}>
                    <button className="inform-btn">Inform location</button>
                    <small>Inform a contaminated location to earn 1 care point</small>
                </div>
            </div>
        </form>
        <h3 className="text-center">Your location</h3>
        {(userLoc) && <GoogleMap loc={userLoc} />}
    </section>
}

