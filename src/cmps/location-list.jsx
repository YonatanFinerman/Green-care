import { LocationPreview } from "./location-preview"

export function LocationList({gatherings,userLoc}){
    return <section className="location-list">
        {gatherings.map(gathering=>{
            return <LocationPreview gathering={gathering} userLoc={userLoc} key={gathering._id}/>
        })}
    </section>
}