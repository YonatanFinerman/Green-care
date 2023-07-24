import { IoClose } from "react-icons/io5"
import { useDispatch, useSelector } from "react-redux"
import { SET_PROFILE_MODAL, TOGGLE_IS_SHADOW } from "../store/system.reducer"
import { useNavigate } from "react-router-dom"
import { SET_CURR_PRIZE, SET_REVEALED_CODE } from "../store/prize.reducer"
import { useEffect, useRef } from "react"
import { AiFillCamera } from "react-icons/ai"
import { useState } from "react"
import { gatheringService } from "../services/gathering.service"

export function ProfileModal({ user, onUpdateUser }) {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const profileModal = useSelector(storeState => storeState.systemModule.profileModal)
    const profileImgInput = useRef(null)
    const [editedUser, setEditedUser] = useState(null)
    const [userGatherings, setUserGatherings] = useState([])

    useEffect(() => {
        setEditedUser(null)

        if (profileModal === 'gatherings') {
            gatheringService.getUserGatherings(user._id)
            .then(setUserGatherings)
        }

    }, [profileModal])

    function handleChange({ target }) {

        let { value, name: field, type, checked } = target

        if (type === 'file') {
            const selectedFile = target.files[0]
            
            if (selectedFile && selectedFile.type.includes('image')) {

                const reader = new FileReader()
                reader.onload = function (ev) {
                    const url = ev.target.result
                    setEditedUser((editedUser) => ({ ...editedUser, profileImg: url }))
                }
                reader.readAsDataURL(selectedFile)
                return
            }
        }
        setEditedUser((editedUser) => ({ ...editedUser, [field]: value }))
    }


    return <section className={`user-profile-modal ${(profileModal) ? 'open' : 'closed'} `}>
        <p className="close-modal-btn"><IoClose onClick={() => {
            dispatch({ type: SET_PROFILE_MODAL, profileModal: null })
            dispatch({ type: TOGGLE_IS_SHADOW })
        }} /><span>YOUR {(profileModal) ? profileModal.toUpperCase() : ''}</span> </p>

        {(profileModal === 'gatherings') && <div>
            {(userGatherings.length === 0) ? <div className="no-gatherings text-center">
                <p >No gatherings to display!</p>
                <button onClick={() => {
                    dispatch({ type: TOGGLE_IS_SHADOW })
                    dispatch({ type: SET_PROFILE_MODAL, profileModal: null })
                    navigate('/gathering')
                }}>View gatherings</button>
            </div>
                : userGatherings.map((gathering, idx) => {
                    return <article className="modal-gathering-prev flex align-center text-center" key={idx + gathering._id}>
                        <img src={(gathering.imgsAfter.length > 0) ? gathering.imgsAfter[0] : gathering.imgsBefore[0]} />
                        <div className="flex column">
                            <p>{gathering.locName}</p>
                            <small>{gathering.status}</small>
                            <button onClick={() => {
                                dispatch({ type: TOGGLE_IS_SHADOW })
                                dispatch({ type: SET_PROFILE_MODAL, profileModal: null })
                                navigate(`/location/${gathering._id}`)
                            }}>details</button>

                        </div>
                    </article>
                })}
        </div>}

        {(profileModal === 'prizes') && <div className="text-center">
            {(user.prizes.length === 0) ? <div className="no-prizes">
                <p >No prizes to display!</p>
                <button onClick={() => {
                    dispatch({ type: TOGGLE_IS_SHADOW })
                    dispatch({ type: SET_PROFILE_MODAL, profileModal: null })
                    navigate('/prize')
                }}>View store</button>
            </div> :
                user.prizes.map(prize => {
                    return <article className="modal-prize-prev flex align-center text-center" key={prize.storeName}>
                        <img src={prize.img} />

                        <div className="flex column">
                            <p>{prize.storeName}</p>
                            <small>{prize.prizeDesc}</small>
                            <button onClick={() => {
                                dispatch({ type: SET_REVEALED_CODE, revealedCode: prize.code })
                                dispatch({ type: SET_PROFILE_MODAL, profileModal: null })
                                dispatch({ type: SET_CURR_PRIZE, prize })
                                navigate('/prize')
                            }}>View code</button>
                        </div>
                    </article>
                })}
        </div>}

        {(profileModal === 'profile') && <div className="edit-user flex column align-center">
            <div className="img-input-container">
                <img src={(editedUser?.profileImg) ? editedUser.profileImg : user.profileImg} />
                <input type="file" value={editedUser?.pfofileImg} style={{ display: 'none' }} name="profileImg" onChange={handleChange} ref={profileImgInput} />
                <button onClick={() => profileImgInput.current.click()}><AiFillCamera /></button>
            </div>
            <input className="change-name-input text-center"
                name="fullName"
                onChange={handleChange}
                type="text"
                value={(editedUser) ? editedUser.fullName : user.fullName} />
            <div className="actions-cont flex">
                <button className="clear-btn" onClick={() => setEditedUser(null)}>clear</button>
                <button className="save-btn" onClick={() => onUpdateUser(editedUser)}>Save</button>
            </div>
        </div>}
    </section>
}