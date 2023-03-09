import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'

export function AppHeader() {

    const navigate = useNavigate()

    return (
        <header className="app-header">
            <img onClick={() => navigate('/')} src={`${require(`../assets/img/logo4.png`)}`} alt="" />
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