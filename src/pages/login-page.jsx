import { useState, } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppHeader } from "../cmps/app-header";
import { LoginForm } from "../cmps/login-form";
import { SignUpForm } from "../cmps/signup-form";
import { login, signup } from "../store/actions/user.actions";
import { TOGGLE_LOGIN_FORM } from '../store/reducers/user.reducer'

export function LoginPage() {

    // const [isLoginForm, setIsLoginForm] = useState(true)
    const isLoginForm = useSelector(storeState => storeState.userModule.isLoginForm)
    const [isValid, setIsValid] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch()

    async function OnLoginSignUp(credentials) {
        const isValid = validate(credentials)
        
        if (!isValid) {
            console.log('not valid')
            return
        }
        if (!isLoginForm) {
            try {
                console.log('valid')
                await signup(credentials)
                // navigate('/')
            } catch (err) {
                console.log('Error occurred during signup:', err)
            }
            return
        }

        try {
            await login(credentials)
            //   onCloseLoginModal()
              navigate('/')
        } catch (err) {
            console.log('Error occurred during login:', err)
        }
    }

    function validate(user) {
        if (!user.email.includes('@') || !user.email.includes('.')) {
            setIsValid('Invalid mail')
            return false
        }
        if (user.password.length < 8 || user.password.length > 16) {
            setIsValid('Password should have 8 to 16 characters')
            return false
        }
        return true
    }

    function toggleForm(){
        dispatch({ type: TOGGLE_LOGIN_FORM })
    }

    return <section className="login-signup-page ">
        <AppHeader/>   
        <div className="log-cont">  
        <img src={require('../assets/img/logo3.png')} alt=""  className="login-logo"/>      
        {(isLoginForm) ? <LoginForm toggleForm={toggleForm} OnLoginSignUp={OnLoginSignUp}/> : <SignUpForm toggleForm={toggleForm} OnLoginSignUp={OnLoginSignUp}/>}</div>
    </section>
}