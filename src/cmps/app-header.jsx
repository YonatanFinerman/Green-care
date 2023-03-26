import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { useEffect, useState } from 'react'
import { BsPerson } from "react-icons/bs";
import { HiMenu } from "react-icons/hi";
import { SideBar } from './side-bar';
import { TOGGLE_LOGIN_FORM } from '../store/reducers/user.reducer';

export function AppHeader() {
    const navigate = useNavigate()
    const location = useLocation()
    const [isSideBarOpen, toggleIsSideBarOpen] = useState(false)
    const user = useSelector(storeState => storeState.userModule.user)
    const isLoginForm = useSelector(storeState => storeState.userModule.isLoginForm)
    const dispatch = useDispatch()
    
    return (
        <header className="app-header full flex align-center space-between">
            <img onClick={() => navigate('/')} src={`${require(`../assets/img/logo${(location.pathname === '/') ? '4' : '2'}.png`)}`} alt="" />
            <nav>
                {(user) ? <img  src={user.imgUrl} alt="" /> : <Link className='login-link' to={'/login'} onClick={()=>{
                     if (!isLoginForm) {
                        dispatch({ type: TOGGLE_LOGIN_FORM })
                    }
                }}><BsPerson /></Link>}
                <div onClick={() => toggleIsSideBarOpen(prev => !prev)}><HiMenu /></div>
            </nav>
            <SideBar className='side-bar-container' toggleIsSideBarOpen={toggleIsSideBarOpen} isSideBarOpen={isSideBarOpen}/>
            

            {(isSideBarOpen) && <div className='shadow' onClick={() => toggleIsSideBarOpen(prev => !prev)}></div>}

        </header>
    )
}