import { AppHeader } from "../cmps/app-header";
import { LocationList } from "../cmps/location-list";
import { gatheringService } from "../services/gathering.service";
import { useState,useEffect } from "react";
import { loadGatherings } from "../store/actions/gathering.actions";
import { useSelector } from "react-redux";

export function LocationIndex(){

    const isGathering = useSelector(storeState => storeState.gatheringModule.isGathering)
    const gatherings = useSelector(storeState => storeState.gatheringModule.gatherings)
    
    
    useEffect(()=>{
        loadGatherings(isGathering)
        },[])

    return <section className="location-page main-layout">
        <AppHeader/>
        <h2>Pick a location and host a gathering</h2>
        <LocationList gatherings={gatherings}/>
    </section>
}