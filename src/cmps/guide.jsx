import { useEffect, useRef, useState } from 'react'
import { HiArrowNarrowRight } from "react-icons/hi";
import { useDispatch, useSelector } from 'react-redux';
import { Fade } from "react-reveal";
import { useNavigate } from 'react-router-dom';
import { TOGGLE_LOGIN_FORM } from '../store/reducers/user.reducer'

export function Guide() {

    const [currStepIdx, setCurrStepIdx] = useState(0)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const isLoginForm = useSelector(storeState => storeState.userModule.isLoginForm)
    const steps = ['Create or join gatherings', 'Meet new people', 'Earn prizes', 'And make the world better', ' So start caring now!']



    return <section className="guide flex column  text-center"  id="guide">

        <div className="step-carousel flex " >

            {steps.map((step, idx) => {

                return <div   key={step + idx} className='guide-step flex align-center justify-center'
                    style={{ transform: `translateX(-${currStepIdx * 100}%)`, backgroundImage: `url(${require(`../assets/img/step${idx}.jpg`)})` }} >
                        {/* <h2>{step}</h2> */}
                    <Fade bottom> <h2>{step}</h2> </Fade>
                </div>
            })}

            <div className='steps-pageing' >
                {steps.map((step, idx) => {
                    return <Fade bottom key={idx + step}><img  loading="eager" className={(idx === currStepIdx) ? 'active' : ''} onClick={() => setCurrStepIdx(idx)} src={require(`../assets/img/step-small${idx}.jpg`)} alt="" /></Fade>
                })}
            </div>

            {(currStepIdx !== 4) ? <button style={{paddingTop:'10px'}} onClick={() => setCurrStepIdx(prev => prev + 1)}
                className='next-step-btn flex align-center justify-center'><Fade bottom><HiArrowNarrowRight /></Fade></button> :
                <div className='guide-btns-cont'>
                    <button className='register-btn' onClick={() => {
                        if (isLoginForm) {
                            dispatch({ type: TOGGLE_LOGIN_FORM })
                        }
                        navigate('/login')
                    }}>Register</button>
                    <button onClick={()=>navigate('/gathering')} className='start-helping-btn'>Start helping </button>
                </div>}
        </div>

        {/* <h2>choose a place and start helping</h2>
        <p>click HELP NOW, choose a place and join a group to start helping,
            the gathering host is responsible for the gathering and for the date and time of the gathering,
            for any questions or info you can contact him.
        </p>

        <p>become the gathering host if a place has no participants,
            by becoming a gathering host you are responsible for the attendees and for reporting the results of the cleaning.
            if you have a problem being the gathering host for some reason you can give the host to one of the attendees which desires it.
        </p>

        <p>for every cleaning that you finish the host will get 2 points and the attendees get 1 point each,
            gather points to reach higher ranks in the GreenCare society and get monthly prices for your hard work!
        </p> */}
    </section>
}