import { useSelector } from "react-redux"

export function NoUserLocModal(){

    const isUserLocModal = useSelector(storeState => storeState.userModule.isUserLocModal)

    return <section className={`no-loc-modal ${(isUserLocModal) ? 'open' : 'closed'} `} >
        <p className="close-modal-btn" ><span>Allow location</span> </p>
        <form action="" className="flex column align-center">
            <p>Please change your location settings</p>
            <img src={require('../assets/img/location-setting.PNG')} alt=""  className="login-logo"/>  
           
            <button>Refresh page</button>
        </form>
    </section>
}