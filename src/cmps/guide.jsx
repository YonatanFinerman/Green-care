import { useEffect, useRef, useState } from 'react'
import { HiArrowNarrowRight } from "react-icons/hi";
import { Fade } from "react-reveal";


export function Guide() {

    const [currStepIdx, setCurrStepIdx] = useState(0)
   
    const steps = [{imgNum:0,txt:'moti'},{imgNum:0,txt:'moti'},{imgNum:0,txt:'moti'},{imgNum:0,txt:'moti'},{imgNum:0,txt:'moti'},{imgNum:1,txt:'yosi'},{imgNum:2,txt:'mark'},{imgNum:3,txt:'yoni'},{imgNum:4,txt:'moshe'}]

    useEffect(() => {

        console.log(currStepIdx)
    }, [currStepIdx])


    return <section className="guide flex column align-center text-center" id="guide">

        <div className="step-carousel flex " >

            {steps.map((step, idx) => {

                return <div className='guide-step flex align-center justify-center'
                    style={{ transform: `translateX(-${currStepIdx * 100}%)`, backgroundImage: `url(${require(`../assets/img/step${step.imgNum}.jpg`)})` }} >
                    <Fade bottom> <h2>{step.txt}</h2> </Fade>
                </div>


            })}

            {(currStepIdx!==4) ? <button onClick={() => setCurrStepIdx(prev => prev + 1)} 
            className='next-step-btn flex align-center justify-center'><HiArrowNarrowRight /></button> : 
            <div className='guide-btns-cont'>
                <button className='register-btn'>Register</button>
                <button className='start-helping-btn'>Start helping </button>
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