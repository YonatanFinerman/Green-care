import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import logo from '../assets/img/logo.png'
import { AppHeader } from '../cmps/app-header'
import { CHANGE_COUNT } from '../store/reducers/user.reducer'
import { Link } from 'react-scroll'
import { useNavigate } from 'react-router-dom'
import { Guide } from '../cmps/guide'
  

export function HomePage() {
    const dispatch = useDispatch()
    const count = useSelector(storeState => storeState.userModule.count)
    const navigate = useNavigate()

    function changeCount(diff) {
        console.log('Changing count by:', diff);
        dispatch({ type: CHANGE_COUNT, diff })
    }

    return (
        <section className='home-page '>
            <AppHeader />
            <section className='hero flex justify-center'>

                <div className='hero-info flex column align-center text-center'>

                    <h1 className='flex column' style={{ gap: '8px' }}> <span>
                        Join our community and
                    </span>
                        <span style={{ color: '#D25CEE' }}>make the world a better place.</span>
                    </h1>



                    <Link to='about' spy={true} smooth={true} offset={0} duration={500}><button className='hero-btn'>Learn more</button></Link>
                </div>
            </section>

            <section className='about flex align-center justify-center' id='about'>
                <div className='about-info flex column align-center text-center'>

                    <h2>About Green care</h2>
                    <p>GreenCare has a vision in which anyone can find it amusing to help the world, to keep it clean and have fun in the process!
                        In this journey you can connect with friends meet new people all the while helping the world.
                    </p>

                    <Link to='guide' spy={true} smooth={true} offset={0} duration={500}><button>How it works ?</button></Link>
                    {/* <Link to='guide' spy={true} smooth={true} offset={0} duration={500}><button>Start helping now</button></Link> */}

                </div>
                <img src={require('../assets/img/about1.webp')} alt="" />
            
        </section>

        <Guide/>

        </section >
    )
}