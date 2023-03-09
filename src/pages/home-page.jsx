import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import logo from '../assets/img/logo.png'
import { AppHeader } from '../cmps/app-header'
import { CHANGE_COUNT } from '../store/reducers/user.reducer'

export function HomePage() {
    const dispatch = useDispatch()
    const count = useSelector(storeState => storeState.userModule.count)

    function changeCount(diff) {
        console.log('Changing count by:', diff);
        dispatch({ type: CHANGE_COUNT, diff })
    }

    return (
        <section className='home-page'>
            <AppHeader/>
            <section className='hero'>

                <div className='hero-info'>

                    <h1 className='flex column' style={{gap:'8px'}}> <span>
                        Join our community and
                    </span>
                        <span  style={{color:'#D25CEE'}}>make the world a better place.</span>
                    </h1>

                    <p>GreenCare has a vision in which anyone can find it amusing to help the world, to keep it clean and have fun in the process!

                        In this journey you can connect with friends meet new people all the while helping the world.</p>

                    <button className='hero-btn'>Start helping now</button>
                </div>



            </section>
      
        </section >
    )
}