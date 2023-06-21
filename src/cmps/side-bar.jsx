import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../store/actions/user.actions";
import { TOGGLE_LOGIN_FORM } from "../store/reducers/user.reducer";
import { TOGGLE_IS_GATHERING } from "../store/reducers/gathering.reducer";
export function SideBar({ isSideBarOpen, toggleIsSideBarOpen }) {


    const user = useSelector(storeState => storeState.userModule.user)
    const isLoginForm = useSelector(storeState => storeState.userModule.isLoginForm)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    return <aside className={`side-bar ${(isSideBarOpen) ? 'open' : 'closed'} flex column`}>
        <ul onClick={() => toggleIsSideBarOpen(prev => !prev)}>
            {(user) && <div>

                <li><a href="#">My contribution</a></li>
                <li onClick={() => {
                    dispatch({ type: TOGGLE_IS_GATHERING, isGathering: true })
                    navigate('/gathering')
                }}>Join a gathering</li>
                <li onClick={() => {
                    dispatch({ type: TOGGLE_IS_GATHERING, isGathering: false })
                    navigate('/location')
                }}>Host a gathering</li>
                <li onClick={() => navigate('/inform')}>Inform a location</li>
                <li onClick={()=>navigate('/prize')}>Prizes store</li>
            </div>}

            <li><Link to='/' >About us</Link></li>
            <li><a href="#">help</a></li>
            {(user) ? <li onClick={() => {
                logout()
                // navigate('/gathering')
            }}> Log out</li> : <li onClick={() => {
                if (!isLoginForm) {
                    dispatch({ type: TOGGLE_LOGIN_FORM })
                }
            }}><Link to='/login' >Login</Link></li>}

        </ul>
    </aside>
}