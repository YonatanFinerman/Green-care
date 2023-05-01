import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { gatheringService } from "../services/gathering.service"
import { BsFillPersonFill, BsPerson } from "react-icons/bs"

export function LocationPreview({ gathering, userLoc }) {
    const navigate = useNavigate()
    const [currImgUrlIdx, setCurrImgUrlIdx] = useState(0)

    // gatheringService.getLocationName(gathering.location)


    return <article className="location-preview"
    onClick={() => { navigate(`/location/${gathering._id}`) }}
    >

        <div className="prev-carousel" onMouseEnter={() => setCurrImgUrlIdx(prev => prev + 1)} onMouseLeave={() => setCurrImgUrlIdx(prev => prev - 1)}>
    
            {gathering.imgsBefore.map(imgUrl => {
                return <img key={imgUrl} className="stay-preview-img" src={imgUrl} alt="" style={{ transform: `translateX(-${currImgUrlIdx * 100}%)` }} />
            })}

        </div>
        <div className="preview-info">
            <div className="flex space-between">
                <p>{gathering.locName}</p>
                <p className="prev-capacity flex"> {gathering.users.length + ' / ' + gathering.capacity} <span><BsFillPersonFill /></span></p>

            </div>

            <p>{gatheringService.getDistanceFromUser(userLoc, gathering.loc) + 'km away'}</p>


        </div>

    </article>
}