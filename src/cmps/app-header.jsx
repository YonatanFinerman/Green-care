import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { useEffect, useState } from 'react'
import { BsPerson } from "react-icons/bs";
import { HiMenu } from "react-icons/hi";
import { SideBar } from './side-bar';
import { TOGGLE_LOGIN_FORM } from '../store/reducers/user.reducer';
import { GoSearch } from "react-icons/go"
import { TOGGLE_FILTER_MODAL, TOGGLE_GATHERING_MODAL } from '../store/reducers/gathering.reducer';

export function AppHeader() {
    const navigate = useNavigate()
    const location = useLocation()
    const [isSideBarOpen, toggleIsSideBarOpen] = useState(false)
    const user = useSelector(storeState => storeState.userModule.user)
    const isLoginForm = useSelector(storeState => storeState.userModule.isLoginForm)
    const isFilterModal = useSelector(storeState => storeState.gatheringModule.isFilterModal)
    const isGatheringModal = useSelector(storeState => storeState.gatheringModule.isGatheringModal)
    const dispatch = useDispatch()

    return (
        <header className="app-header full flex align-center space-between">
            <img onClick={() => navigate('/')} src={`${require(`../assets/img/logo${(location.pathname === '/') ? '4' : '2'}.png`)}`} alt="" />
            <nav>
                {(user) ? <img src={user.profileImg} alt="" /> : <Link className='login-link' to={'/login'} onClick={() => {
                    if (!isLoginForm) {
                        dispatch({ type: TOGGLE_LOGIN_FORM })
                    }
                }}><BsPerson /></Link>}
                {(location.pathname === '/location' || location.pathname === '/gathering') && <GoSearch style={{ fontSize: '24px', marginTop: '6px' }} onClick={() => {
                    dispatch({ type: TOGGLE_FILTER_MODAL })
                }} />}
                <div onClick={() => toggleIsSideBarOpen(prev => !prev)}><HiMenu /></div>
            </nav>
            <SideBar className='side-bar-container' toggleIsSideBarOpen={toggleIsSideBarOpen} isSideBarOpen={isSideBarOpen} />


            {(isSideBarOpen || isFilterModal || isGatheringModal) && <div className='shadow' onClick={() => {
                if (isSideBarOpen) {
                    toggleIsSideBarOpen(prev => !prev)
                }
                else if(isGatheringModal){
                    dispatch({ type: TOGGLE_GATHERING_MODAL })
                }
                else{
                    dispatch({ type: TOGGLE_FILTER_MODAL })
                }
            }}></div>}

        </header>
    )
}