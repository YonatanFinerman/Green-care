import { useState } from "react"
import { useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom"
import { gatheringService } from "../services/gathering.service"
import { BsBookmarkStar, BsBookmarkStarFill, BsFillPersonFill, BsPerson } from "react-icons/bs"
import { utilService } from "../services/util.service"
import { userService } from "../services/user.service"

export function LocationPreview({ gathering, userLoc }) {
    const navigate = useNavigate()
    const [currImgUrlIdx, setCurrImgUrlIdx] = useState(0)
    const user = useSelector(storeState => storeState.userModule.user)

    return <article className="location-preview"
        onClick={() => { navigate(`/location/${gathering._id}`) }}
    >
        {(userService.getUserRole(gathering.users,user))&&<div className="joined-sign"><BsBookmarkStarFill/></div>}
        <div className="prev-carousel" onMouseEnter={() => setCurrImgUrlIdx(prev => prev + 1)} onMouseLeave={() => setCurrImgUrlIdx(prev => prev - 1)}>

            {gathering.imgsBefore.map(imgUrl => {
                return <img key={imgUrl} className="stay-preview-img" src={imgUrl} alt="" style={{ transform: `translateX(-${currImgUrlIdx * 100}%)` }} />
            })}

        </div>
        <div className="preview-info">
            <div className="flex space-between">
                <p>{gathering.locName}</p>
                <p className="prev-capacity flex" > {gathering.users.length + ' / ' + gathering.capacity} <span><BsFillPersonFill /></span></p>

            </div>

            <p>{gatheringService.getDistanceFromUser(userLoc, gathering.loc) + 'km away'}</p>
            {(gathering.time) && <p style={{ fontWeight: '600' }}>{utilService.getTimeRemaining(gathering.time)}</p>}



        </div>

    </article>
}