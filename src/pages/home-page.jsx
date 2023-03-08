import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import logo from '../assets/img/logo.png'
import { CHANGE_COUNT } from '../store/user.reducer'

export function HomePage() {
    const dispatch = useDispatch()
    const count = useSelector(storeState => storeState.userModule.count)

    function changeCount(diff) {
        console.log('Changing count by:', diff);
        dispatch({ type: CHANGE_COUNT, diff })
    }

    return (
        <section className='home-page'>
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
            {/* <img src={logo} alt="Logo" style={{ maxWidth: '300px' }} />
            <h2>
                Count {count}
                <button onClick={() => {
                    changeCount(1)
                }}>+</button>
                <button onClick={() => {
                    changeCount(10)
                }}>+10</button>
            </h2 > */}
        </section >
    )
}