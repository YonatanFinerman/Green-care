import { useDispatch, useSelector } from "react-redux"
import { IoClose } from "react-icons/io5"
import { DatePickerCmp } from "./date-picker"
import { AmoutInput } from "./participants-amount-input"
import { TOGGLE_FILTER_MODAL } from "../store/reducers/gathering.reducer"
import { TOGGLE_IS_SHADOW } from "../store/system.reducer"

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

        <p className="close-modal-btn"><IoClose onClick={() => {
            dispatch({ type: TOGGLE_FILTER_MODAL })
            dispatch({ type: TOGGLE_IS_SHADOW })
        }} /><span>Filter locations</span> </p>
        <input className="search-loc-input" name="locName" type="text" onChange={handleChange} placeholder="Search location..." />


        {(isGathering) && <h3>Date</h3>}
        {(isGathering) && <DatePickerCmp setFilterBy={setFilterBy} filterBy={filterBy} />}


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



            <h3>Max participants</h3>
            <AmoutInput capacity={filterBy.capacity} setCapacity={setFilterBy} />

            <div className="action-btns-cont">
                <button className="clear-btn">Clear</button>
                <button className="filter-btn" onClick={onFilterLocation}>Filter</button>
            </div>
        </div>
    </section>
}