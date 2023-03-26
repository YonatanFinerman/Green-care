import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../store/actions/user.actions";
import { TOGGLE_LOGIN_FORM } from "../store/reducers/user.reducer";
export function SideBar({ isSideBarOpen, toggleIsSideBarOpen }) {

    const navigate = useNavigate()
    const user = useSelector(storeState => storeState.userModule.user)
    const isLoginForm = useSelector(storeState => storeState.userModule.isLoginForm)
    const dispatch = useDispatch()

    return <aside className={`side-bar ${(isSideBarOpen) ? 'open' : 'closed'} flex column`}>
        <ul >
            <li><a href="#">My contribution</a></li>
            <li><a href="#">Join a gathering</a></li>
            <li><Link to='/location' >Host a gathering</Link></li>
            <li><a href="#">Inform a location</a></li>
            <li><a href="#">Prizes store</a></li>
            <li><Link to='/' >About us</Link></li>
            <li><a href="#">help</a></li>
            {(user) ? <li onClick={() => {
                logout()
                toggleIsSideBarOpen(prev => !prev)
                navigate('/')
            }}> Log out</li> : <li onClick={() => {
                if (!isLoginForm) {
                    dispatch({ type: TOGGLE_LOGIN_FORM })
                }
            }}><Link to='/login' >Login</Link></li>}

        </ul>
    </aside>
}