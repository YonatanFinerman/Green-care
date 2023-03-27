import { LocationPreview } from "./location-preview"

export function LocationList({gatherings}){
    return <section className="location-list">
        {gatherings.map(gathering=>{
            return <LocationPreview gathering={gathering} key={gathering._id}/>
        })}
    </section>
}