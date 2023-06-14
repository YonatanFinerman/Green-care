import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { AppHeader } from "../cmps/app-header";
import { AmoutInput } from "../cmps/participants-amount-input";
import { GoogleMap } from "../cmps/map";

import { gatheringService } from "../services/gathering.service";
import { uploadImgs } from "../services/cloudinary-service.js"
import { utilService } from "../services/util.service";
import { addGathering } from "../store/actions/gathering.actions";

import { Link } from 'react-scroll'
import { AiOutlineClose, AiOutlinePlus } from "react-icons/ai"
import { LoadingCircle } from "../cmps/loading-circle";
import { LOADING_DONE, LOADING_START } from "../store/system.reducer";

export function AddLocationPage() {

    const [location, setLocation] = useState(gatheringService.getEmptyLocation())
    const [currImgIdx, setCurrImgIdx] = useState(0)
    const [possibleLocs, setPossibleLocs] = useState([])
    const [ispossibleLocs, setIsPossibleLocs] = useState(false)
    const [formErrs, setFormsErrs] = useState({})

    const userLoc = useSelector(storeState => storeState.userModule.userLoc)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const debGetLocByName = useRef(utilService.asyncDebounce(gatheringService.getLocationByName, 500)).current
    const imgInput0 = useRef(null)
    const imgInput1 = useRef(null)
    const imgInput2 = useRef(null)

    useEffect(() => {
        gatheringService.getLocationName(userLoc)
            .then(res => setLocation({ ...location, locName: res }))
    }, [])

    function handleDivClick(idx) {
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
                setCurrImgIdx(idx)
            }
            reader.readAsDataURL(selectedFile)
        }
        return
    }

    async function handleChange({ target }) {
        let { value, name: field, type, checked } = target
        value = (type === 'number' || type === 'range') ? +value : value
        setLocation({ ...location, [field]: value })

        if (field === 'locName') {

            try {
                const newPossibleLocs = await debGetLocByName(value)
                setPossibleLocs(newPossibleLocs)
                setIsPossibleLocs(true)
                setLocation({ ...location, [field]: value })

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


    function onInformLocation() {
    

        const newLoc = { ...location }
        const isValid = validateForm()
        console.log(isValid)
        if (!isValid) return
            dispatch({type:LOADING_START})
        if (!newLoc.loc) newLoc.loc = userLoc
        uploadImgs(newLoc.imgsBefore)
            .then(res => {
                console.log(res)
                newLoc.imgsBefore = res
                addGathering(newLoc).then(res => {
                    dispatch({type:LOADING_DONE})
                    navigate(`/location/${res._id}`)
                })
            })
    }

    function validateForm() {
    let newErrs = {}
        console.log(location)

        if (!location.imgsBefore[0] || !location.imgsBefore[1] || !location.imgsBefore[2]) newErrs.imgErr = true

        if (!location.locName) newErrs.locNameErr = true

        if (!location.info || location.info.length < 100) newErrs.infoErr = true

        if (Object.keys(newErrs).length) {
            setFormsErrs(newErrs)          
            return false
        }
        else return true
    }

    return <section className="inform-location-page main-layout" onClick={() => {
        if (possibleLocs.length && ispossibleLocs) {
            setIsPossibleLocs(false)
        }
    }}>
        <AppHeader />
        <form className="add-location-form flex">
            <div className="location-imgs flex">
                {(location.imgsBefore.length > 0) ? <img className="curr-img" src={location.imgsBefore[currImgIdx]} />
                    : <div className="curr-img flex justify-center align-center">no selected img</div>}

                <div className="location-imgs-paging flex">
                    {Array.from({ length: 3 }, (_, idx) => (
                        <div className={`${(formErrs.imgErr && !location.imgsBefore[idx]) ? 'error' : ''} empty-img flex justify-center align-center`} key={'empty-img' + idx} onClick={() => handleDivClick(idx)}>
                            <input
                                type="file"
                                ref={getImgInputRef(idx)}
                                style={{ display: 'none' }}

                                onChange={(event) => handleFileChange(event, idx)}
                            />
                            {(location.imgsBefore[idx]) ? <div className="selected-img" onClick={(ev) => {
                                ev.stopPropagation()
                                setCurrImgIdx(idx)
                            }}><img src={location.imgsBefore[idx]} />
                                <button type="button" onClick={(ev) => {
                                    ev.stopPropagation()
                                    handleDivClick(idx)
                                }} className={"btn-clean"} ><AiOutlineClose /></button >
                            </div> : <p ><AiOutlinePlus /></p>}
                        </div>))}
                </div>

            </div>
            <div className="location-info-inputs flex column align-center ">
                <div className="location-name-input-container">

                    <div style={{ position: 'relative', width: '100%' }}><input className={`${(formErrs.locNameErr) ? "error" : ""} location-name-input text-center`} name="locName"
                        onChange={handleChange}
                        type="text"
                        onClick={(ev) => {
                            ev.stopPropagation()
                            if (possibleLocs.length && !ispossibleLocs) {
                                setIsPossibleLocs(true)
                            }
                        }}
                        placeholder="Location name *"
                        value={location.locName} />
                        {(formErrs.locNameErr) && <small className="error-msg text-center">No such place!</small>}
                    </div>

                    {(ispossibleLocs && possibleLocs.length > 0) && <ul className="possible-locs-list">
                        {possibleLocs.map((loc, idx) => {
                            return <Link to="map" spy={true} smooth={true} offset={0} duration={500} key={loc.place_id + idx}>
                                <li className="possible-loc-prev text-center"
                                    onClick={() => {
                                        console.log(loc, 'loca')
                                        setLocation({ ...location, locName: loc.formatted_address, loc: loc.geometry.location })
                                        setIsPossibleLocs(false)
                                    }}
                                >
                                    {loc.formatted_address}
                                </li></Link>
                        })}
                    </ul>}
                </div>

                <div style={{ position: 'relative', width: '100%' }}>
                    <textarea className={`${(formErrs.infoErr) ? "error" : ""} location-info-input text-center`}
                        name="info"
                        onChange={handleChange}
                        placeholder="Tell us about this location *"
                        style={{ resize: 'none' }}
                        value={location.info}
                        maxLength={500}>
                    </textarea>
                    {(formErrs.infoErr) && <small className="error-msg text-center">Please tell us more*</small>}
                </div>

                <h3>Participants amount</h3>
                <AmoutInput capacity={location.capacity} setCapacity={setLocation} />
                <div className="flex column" style={{ gap: '0.5rem' }}>
                    <button type="button" onClick={onInformLocation} className="inform-btn">Inform location</button>
                    <small>Inform a contaminated location to earn 1 care point</small>
                </div>
            </div>
        </form>
        <h3 className="text-center">{(location.loc) ? location.locName : 'Your location'}</h3>
        {(userLoc) && <GoogleMap loc={(location.loc) ? location.loc : userLoc} />}
       
    </section>
}

