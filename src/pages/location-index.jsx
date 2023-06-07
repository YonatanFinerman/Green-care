import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useSearchParams } from "react-router-dom";

import { gatheringService } from "../services/gathering.service";
import { setUserLoc } from "../store/actions/user.actions";
import { loadGatherings } from "../store/actions/gathering.actions";
import { TOGGLE_IS_GATHERING } from "../store/reducers/gathering.reducer";

import { AppHeader } from "../cmps/app-header";
import { LocationList } from "../cmps/location-list";
import { LocationFilter } from "../cmps/location-filter";

export function LocationIndex() {

    const location = useLocation()
    const dispatch = useDispatch()
    const [searchParams, setSearchParams] = useSearchParams()
    const isGathering = useSelector(storeState => storeState.gatheringModule.isGathering)
    const gatherings = useSelector(storeState => storeState.gatheringModule.gatherings)
    const userLoc = useSelector(storeState => storeState.userModule.userLoc)
    const [filterBy, setFilterBy] = useState(gatheringService.getEmptyFilter())

    useEffect(() => {
        const newIsGathering = (location.pathname === '/location') ? false : true

        dispatch({ type: TOGGLE_IS_GATHERING, isGathering: newIsGathering })

        if (searchParams.size) {

            const newFilterBy = {
                ...filterBy,
                locName: searchParams.get('locName') || filterBy.locName,
                capacity: (+searchParams.get('capacity')) || filterBy.capacity,
                date: (+(searchParams.get('date'))) || filterBy.date,
                isGathering: newIsGathering
            }

            setFilterBy(newFilterBy)
            loadGatherings(newFilterBy)

        }
        else {
            setFilterBy({ ...filterBy, isGathering: newIsGathering })
            loadGatherings({ ...filterBy, isGathering: newIsGathering })
        }

        

    }, [isGathering])

    function onFilterLocation() {
        console.log(filterBy, 'filter!!')
        setSearchParams({ locName: filterBy.locName, capacity: filterBy.capacity, date: filterBy.date })
        loadGatherings(filterBy, userLoc)
    }

    return <section className="location-page main-layout">
        <AppHeader />
        {(!isGathering) ? <h2><span>Pick a location and host</span><span>a gathering</span></h2>
            : <h2>Join a gathering</h2>}

        <LocationFilter setFilterBy={setFilterBy} filterBy={filterBy} onFilterLocation={onFilterLocation} />
        {(userLoc) && <LocationList gatherings={gatherings} userLoc={userLoc} />}

    </section>
}