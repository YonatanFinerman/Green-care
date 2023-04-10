import { AppHeader } from "../cmps/app-header";
import { LocationList } from "../cmps/location-list";
import { useState, useEffect, useRef } from "react";
import { loadGatherings } from "../store/actions/gathering.actions";
import { useSelector } from "react-redux";
import { setUserLoc } from "../store/actions/user.actions";
import { LocationFilter } from "../cmps/location-filter";
import { GoSearch } from "react-icons/go"
export function LocationIndex() {


    const isGathering = useSelector(storeState => storeState.gatheringModule.isGathering)
    const gatherings = useSelector(storeState => storeState.gatheringModule.gatherings)
    const userLoc = useSelector(storeState => storeState.userModule.userLoc)
    

    useEffect(() => {
        loadGatherings(isGathering)
        setUserLoc()
    }, [])

    return <section className="location-page main-layout">
        <AppHeader />
        <h2><span>Pick a location and host</span><span>a gathering</span></h2>
        
        <LocationFilter />
        <LocationList gatherings={gatherings} userLoc={userLoc} />

    </section>
}