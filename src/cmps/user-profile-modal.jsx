import { useSelector } from "react-redux"

export function ProfileModal(){

    const profileModal = useSelector(storeState => storeState.systemModule.profileModal)

    return <section className={`user-profile-modal ${(profileModal) ? 'open' : 'closed'} `}>
        hi
    </section>
}