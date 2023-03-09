import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppHeader } from "../cmps/app-header";
import { LoginForm } from "../cmps/login-form";
import { SignUpForm } from "../cmps/signup-form";
import { login, signup } from "../store/actions/user.actions";

export function LoginPage() {

    const [isLoginForm, setIsLoginForm] = useState(true)
    const [isValid, setIsValid] = useState('')
    const navigate = useNavigate()

    async function OnLoginSignUp(credentials) {
        const isValid = validate(credentials)
        if (!isValid) {
            console.log('not valid')
            return
        }
        if (!isLoginForm) {
            try {
                await signup(credentials)
                // onCloseLoginModal()
                navigate('/')
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
    return <section className="login-signup-page">
        <AppHeader/>   
        <div className="log-cont">  
        <img src={require('../assets/img/logo3.png')} alt=""  className="login-logo"/>      
        {(isLoginForm) ? <LoginForm setIsLoginForm={setIsLoginForm}/> : <SignUpForm setIsLoginForm={setIsLoginForm}/>}</div>
    </section>
}