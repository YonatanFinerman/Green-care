import { AppHeader } from "../cmps/app-header";
import { LocationList } from "../cmps/location-list";
import { gatheringService } from "../services/gathering.service";
import { useState,useEffect } from "react";

export function LocationIndex(){

    useEffect(()=>{
        loadGatherings()
        },[])

    return <section className="location-page main-layout">
        <AppHeader/>
        <h2>Pick a location and host a gathering</h2>
        <LocationList/>
    </section>
}