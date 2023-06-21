import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { BsPerson } from "react-icons/bs";
import { HiMenu } from "react-icons/hi";
import { SideBar } from './side-bar';
import { TOGGLE_LOGIN_FORM } from '../store/reducers/user.reducer';
import { GoSearch } from "react-icons/go"
import { TOGGLE_FILTER_MODAL, TOGGLE_GATHERING_MODAL } from '../store/reducers/gathering.reducer';
import { Fade } from "react-reveal";
import { SET_CURR_PRIZE } from '../store/prize.reducer';

export function AppHeader() {
    const navigate = useNavigate()
    const location = useLocation()
    const [isSideBarOpen, toggleIsSideBarOpen] = useState(false)
    const user = useSelector(storeState => storeState.userModule.user)
    const isLoginForm = useSelector(storeState => storeState.userModule.isLoginForm)
    const isFilterModal = useSelector(storeState => storeState.gatheringModule.isFilterModal)
    const isGatheringModal = useSelector(storeState => storeState.gatheringModule.isGatheringModal)
    const isUserLocModal = useSelector(storeState => storeState.userModule.isUserLocModal)
    const isLoading = useSelector(storeState => storeState.systemModule.isLoading)
    const currPrize = useSelector(storeState => storeState.prizeModule.currPrize)
    const dispatch = useDispatch()

    return (
        <header className="app-header full flex align-center space-between">
            <Fade left ><img onClick={() => navigate('/')} src={`${require(`../assets/img/logo${(location.pathname === '/') ? '4' : '2'}.png`)}`} alt="" /></Fade>

            <Fade right ><nav>
                {(user) ? <img src={user.profileImg} alt="" /> : <Link className='login-link' to={'/login'} onClick={() => {
                    if (!isLoginForm) {
                        dispatch({ type: TOGGLE_LOGIN_FORM })
                    }
                }}><BsPerson /></Link>}
                {(location.pathname === '/location' || location.pathname === '/gathering') && <GoSearch style={{ fontSize: '24px', marginTop: '6px' }} onClick={() => {
                    dispatch({ type: TOGGLE_FILTER_MODAL })
                }} />}
                <div onClick={() => toggleIsSideBarOpen(prev => !prev)}><HiMenu /></div>
            </nav></Fade>
            <SideBar className='side-bar-container' toggleIsSideBarOpen={toggleIsSideBarOpen} isSideBarOpen={isSideBarOpen} />


            {(isSideBarOpen || isFilterModal || isGatheringModal || isUserLocModal || isLoading || currPrize) && <div className='shadow' onClick={() => {
                if (isSideBarOpen) {
                    toggleIsSideBarOpen(prev => !prev)
                }
                else if (isGatheringModal) {
                    dispatch({ type: TOGGLE_GATHERING_MODAL })
                }
                else if (isUserLocModal) {
                    return
                }
                else if (currPrize) {
                    dispatch({ type: SET_CURR_PRIZE, prize: null })
                }
                else {
                    dispatch({ type: TOGGLE_FILTER_MODAL })
                }
            }}></div>}

        </header>
    )
}