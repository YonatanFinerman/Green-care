import { useSelector } from "react-redux"

export function LocationFilter() {

    const isFilterModal = useSelector(storeState => storeState.gatheringModule.isFilterModal)

    return <section className={`location-filter ${(isFilterModal) ? 'open' : 'closed'} `}>
        hi
    </section>
}