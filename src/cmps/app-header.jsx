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
import { SET_CURR_PRIZE, SET_REVEALED_CODE } from '../store/prize.reducer';
import { SET_PROFILE_MODAL, TOGGLE_IS_SHADOW } from '../store/system.reducer';
import { IoReturnDownBack } from 'react-icons/io5';

export function AppHeader() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()

    const [isSideBarOpen, toggleIsSideBarOpen] = useState(false)

    const user = useSelector(storeState => storeState.userModule.user)
    const isLoginForm = useSelector(storeState => storeState.userModule.isLoginForm)
    const isGatheringModal = useSelector(storeState => storeState.gatheringModule.isGatheringModal)
    const isLoading = useSelector(storeState => storeState.systemModule.isLoading)
    const currPrize = useSelector(storeState => storeState.prizeModule.currPrize)
    const isShadow = useSelector(storeState => storeState.systemModule.isShadow)
    const isGathering = useSelector(storeState => storeState.gatheringModule.isGathering)
    const profileModal = useSelector(storeState => storeState.systemModule.profileModal)

    function handleShadowClick() {
        if (isLoading) return

        else if (isSideBarOpen) toggleIsSideBarOpen(prev => !prev)

        else if (isGatheringModal) dispatch({ type: TOGGLE_GATHERING_MODAL })

        else if (profileModal) dispatch({ type: SET_PROFILE_MODAL, profileModal: null })

        else if (currPrize) {
            dispatch({ type: SET_REVEALED_CODE, revealedCode: null })
            dispatch({ type: SET_CURR_PRIZE, prize: null })
        }

        else dispatch({ type: TOGGLE_FILTER_MODAL })

        dispatch({ type: TOGGLE_IS_SHADOW })
    }

    return (
        <header className="app-header full flex align-center space-between">
            <Fade left ><img className='logo' onClick={() => navigate('/')} src={`${require(`../assets/img/logo${(location.pathname === '/' || location.pathname.includes('/user')) ? '4' : '2'}.png`)}`} alt="" /></Fade>
            {(location.pathname.includes('/location/')||location.pathname.includes('/inform')) && <Fade left><div className='go-back' onClick={() => navigate((isGathering) ? '/gathering' : '/location')}><IoReturnDownBack /></div></Fade>}

            <Fade right ><nav>
                {(user) ? <img src={user.profileImg} alt="" /> : <Link className='login-link' to={'/login'} onClick={() => {
                    if (!isLoginForm) {
                        dispatch({ type: TOGGLE_LOGIN_FORM })
                    }
                }}><BsPerson /></Link>}
                {(location.pathname === '/location' || location.pathname === '/gathering') && <GoSearch style={{ fontSize: '24px', marginTop: '6px' }} onClick={() => {
                    dispatch({ type: TOGGLE_FILTER_MODAL })
                    dispatch({ type: TOGGLE_IS_SHADOW })
                }} />}
                <div onClick={() => {
                    toggleIsSideBarOpen(prev => !prev)
                    dispatch({ type: TOGGLE_IS_SHADOW })
                }}><HiMenu /></div>
            </nav></Fade>
            <SideBar className='side-bar-container' toggleIsSideBarOpen={toggleIsSideBarOpen} isSideBarOpen={isSideBarOpen} />

            {(isShadow) && <div className='shadow' onClick={handleShadowClick}></div>}

        </header>
    )
}