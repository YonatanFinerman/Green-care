import { AppHeader } from "../cmps/app-header";
import { LocationList } from "../cmps/location-list";
import { useState, useEffect, useRef } from "react";
import { loadGatherings } from "../store/actions/gathering.actions";
import { useDispatch, useSelector } from "react-redux";
import { setUserLoc } from "../store/actions/user.actions";
import { LocationFilter } from "../cmps/location-filter";
import { GoSearch } from "react-icons/go"
import { useLocation } from "react-router-dom";
import { TOGGLE_IS_GATHERING } from "../store/reducers/gathering.reducer";
export function LocationIndex() {


    const isGathering = useSelector(storeState => storeState.gatheringModule.isGathering)
    const gatherings = useSelector(storeState => storeState.gatheringModule.gatherings)
    const userLoc = useSelector(storeState => storeState.userModule.userLoc)
    const location = useLocation()
    const dispatch = useDispatch()

    useEffect(() => {
        if (location.pathname === '/location') {

            loadGatherings(false)
            dispatch({ type: TOGGLE_IS_GATHERING, isGathering:false })
        }
        else {
            loadGatherings(true)
            dispatch({ type: TOGGLE_IS_GATHERING, isGathering:false })
        }
        setUserLoc()


    }, [isGathering])

    return <section className="location-page main-layout">
        <AppHeader />
        {(!isGathering) ? <h2><span>Pick a location and host</span><span>a gathering</span></h2>
            : <h2>Join a gathering</h2>}

        <LocationFilter />
        <LocationList gatherings={gatherings} userLoc={userLoc} />

    </section>
}