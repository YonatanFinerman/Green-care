import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { gatheringService } from "../services/gathering.service"
import { IoClose } from "react-icons/io5"
import { TOGGLE_FILTER_MODAL } from "../store/reducers/gathering.reducer"
import { HiMinus, HiPlus } from "react-icons/hi"

export function LocationFilter() {

    const isFilterModal = useSelector(storeState => storeState.gatheringModule.isFilterModal)
    const [filterBy, setFilterBy] = useState(gatheringService.getEmptyFilter())
    const dispatch = useDispatch()

    function handleChange({ target }) {

        let { value, name: field, type, checked } = target
        value = (type === 'number' || type === 'range') ? +value : value
        if (type === 'checkbox') {
            value = checked
        }
        setFilterBy((prevFilter) => ({ ...prevFilter, [field]: value }))
    }

    return <section className={`location-filter ${(isFilterModal) ? 'open' : 'closed'} `}>

        <p className="close-modal-btn"><IoClose onClick={() => dispatch({ type: TOGGLE_FILTER_MODAL })} /><span>Filter locations</span> </p>
        <input className="search-loc-input" type="text" placeholder="Search location..." />

        <h3>Max distance</h3>
        <div className="range">
            <div className="sliderValue" style={{ left: `${filterBy.maxDistance / 2 + '%'}` }}>
                <span>{filterBy.maxDistance}</span>
            </div>
            <div className="field">
                <div className="value left">0</div>
                <input type="range" name="maxDistance" min={0} max={200} onChange={handleChange} value={filterBy.maxDistance} steps={1} />
                <div className="value right">200</div>
            </div>

            <h3>Participants</h3>
            <div className="participants-amount flex space-between align-center">
                <button className="flex justify-center"
                    disabled={(filterBy.participants === 1)}
                    style={{ backgroundColor: `${(filterBy.participants === 1) ? 'lightGrey' : '#0EA47A'}` }}
                    onClick={() => setFilterBy(prevFilter => {
                        return { ...prevFilter, participants: prevFilter.participants - 1 }
                    })}><HiMinus /></button>
                <p>{filterBy.participants}</p>
                <button className="flex justify-center"
                    disabled={(filterBy.participants === 12)}
                    style={{ backgroundColor: `${(filterBy.participants === 12) ? 'lightGrey' : '#0EA47A'}` }}
                    onClick={() => setFilterBy(prevFilter => {
                        return { ...prevFilter, participants: prevFilter.participants + 1 }
                    })}><HiPlus /></button>
            </div>


            <div className="action-btns-cont">
                <button className="clear-btn">Clear</button>
                <button className="search-btn">Search</button>
            </div>
        </div>
    </section>
}