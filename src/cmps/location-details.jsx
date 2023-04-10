import { useEffect } from "react";
import { AppHeader } from "./app-header";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { gatheringService } from "../services/gathering.service";


export function LocationDetails() {

    const { locationId } = useParams()
    const [currGathering, setCurrgathering] = useState(null)

    useEffect(() => {
        console.log(locationId)
        loadGathering(locationId)
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

    return <section className="location-details main-layout">
        <AppHeader />
        {(currGathering) && <div>
          <div className="location flex">

        <div className="gatheringImgs">
            {currGathering.imgsBefore.map((currImg,idx)=>{
                return <img src={currImg} key={currImg} className={`img${idx + 1}`} />
            })}
        </div>
        
        <div className="location-info">
            <h2>hi</h2>
        </div>

            </div> 
        </div>}

    </section>
}