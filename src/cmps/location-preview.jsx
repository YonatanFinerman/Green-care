import { useState } from "react"
import { useNavigate } from "react-router-dom"

export function LocationPreview({ gathering }) {
    const navigate = useNavigate()
    const [currImgUrlIdx, setCurrImgUrlIdx] = useState(0)
    
    
    return <article className="location-preview" 
    // onClick={() => { navigate(`/location/${gathering._id}`) }}
    >
        
        <div className="prev-carousel" >
            {gathering.imgsBefore.map(imgUrl => {
                return <img key={imgUrl} className="stay-preview-img" src={imgUrl} alt="" style={{ transform: `translateX(-${currImgUrlIdx * 100}%)` }} />
            })}
        </div>
    </article>
}