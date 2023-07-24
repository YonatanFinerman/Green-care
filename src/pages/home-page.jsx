import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import logo from '../assets/img/logo.png'
import { AppHeader } from '../cmps/app-header'
import { CHANGE_COUNT } from '../store/reducers/user.reducer'
import { Link } from 'react-scroll'
import { useNavigate } from 'react-router-dom'
import { Guide } from '../cmps/guide'
import { gatheringService } from "../services/gathering.service"
import { Bounce,Fade } from "react-reveal";
import { useRef } from 'react'

export function HomePage() {
    const dispatch = useDispatch()
    const count = useSelector(storeState => storeState.userModule.count)
    const navigate = useNavigate()

    function changeCount(diff) {
        dispatch({ type: CHANGE_COUNT, diff })
    }

    // gatheringService.getLocationName({ lat: 32.794044, lng: 34.989571 })

    
        const cursorRef = useRef(null)
      
        const handleMouseMove = (event) => {
          const cursor = cursorRef.current
          if (cursor) {
            cursor.style.left = event.clientX + 'px'
            cursor.style.top = event.clientY + 'px'
          }
        }

    return (
        <section className='home-page' >
            <AppHeader />

            <section className='hero flex justify-center'>

                <div className='hero-info flex column align-center'>

                    <h1 className='flex column text-center' style={{ gap: '8px' }}>
                        
                    <Bounce opposite left ><span>   Join our community and </span></Bounce>
                    
                    <Bounce right > <span style={{color:'#D25CEE'}}>make the world a better place.</span></Bounce>
                    {/* make the world a better place. */}
                    </h1>

                    <Bounce top><Link to='about' spy={true} smooth={true} offset={0} duration={500}><button className='hero-btn'>Learn more</button></Link></Bounce>
                </div>
                <div className='birds'></div>
                <div className='butterfly'></div>
            </section>

            <section className='about flex align-center justify-center' id='about'>
            <Bounce bottom >
                <div className='about-info flex column align-center text-center'>

                    <h2>About Green care</h2>
                    <p><span>Green Care</span> has a vision in which anyone can find it amusing to help the world, to keep it clean and have fun in the process!
                        In this journey you can connect with friends meet new people while helping the world at the same time.
                    </p>

                    <Link to='guide' spy={true} smooth={true} offset={0} duration={500}><button>How it works ?</button></Link>
                    
                </div>
                
                <img src={require('../assets/img/about1.webp')} />
                </Bounce>
        </section>

        <Guide/>
       
        </section >
    )
}