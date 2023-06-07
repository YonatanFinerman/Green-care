import { useDispatch, useSelector } from "react-redux"
import { IoClose } from "react-icons/io5"
import { TOGGLE_FILTER_MODAL } from "../store/reducers/gathering.reducer"
import { HiMinus, HiPlus } from "react-icons/hi"
import { DatePickerCmp } from "./date-picker"
import { AmoutInput } from "./participants-amount-input"

export function LocationFilter({ setFilterBy, filterBy, onFilterLocation }) {

    const isFilterModal = useSelector(storeState => storeState.gatheringModule.isFilterModal)
    const isGathering = useSelector(storeState => storeState.gatheringModule.isGathering)

    const dispatch = useDispatch()

    function handleChange({ target }) {

        let { value, name: field, type, checked } = target
        value = (type === 'number' || type === 'range') ? +value : value
        if (type === 'checkbox') {
            value = checked
        }
        setFilterBy((prevFilter) => ({ ...prevFilter, [field]: value }))
    }

    return <section className={`location-filter ${(isFilterModal) ? 'open' : 'closed'} `} style={{ gap: `${(isGathering) ? '20px' : '40px'}` }}>

        <p className="close-modal-btn"><IoClose onClick={() => dispatch({ type: TOGGLE_FILTER_MODAL })} /><span>Filter locations</span> </p>
        <input className="search-loc-input" name="locName" type="text" onChange={handleChange} placeholder="Search location..." />

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

            {(isGathering) && <h3>Date</h3>}
            {(isGathering) && <DatePickerCmp setFilterBy={setFilterBy} filterBy={filterBy} />}

            <h3>Max participants</h3>
            <AmoutInput capacity={filterBy.capacity} setCapacity={setFilterBy}/>
            {/* <div className="participants-amount flex space-between align-center">
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
            </div> */}

            <div className="action-btns-cont">
                <button className="clear-btn">Clear</button>
                <button className="filter-btn" onClick={onFilterLocation}>Filter</button>
            </div>
        </div>
    </section>
}