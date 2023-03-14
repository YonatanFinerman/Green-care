import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { useEffect } from 'react'

export function AppHeader() {
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(()=>{
        console.log('this is location',location.pathname)
    },[])
    return (
        <header className="app-header full">
            <img onClick={() => navigate('/')} src={`${require(`../assets/img/logo${(location.pathname==='/') ? '4' : '2'}.png`)}`} alt="" />
            <nav>
                <NavLink to={'/help'}>help</NavLink>
                <NavLink to={'/login'}>login</NavLink>
                <NavLink to={'/login'}>login</NavLink>
                <NavLink to={'/login'}>login</NavLink>
                <NavLink to={'/gathering'}>gathering</NavLink>
            </nav>
            <NavLink to={'/login'}>login</NavLink>
        </header>
    )
}