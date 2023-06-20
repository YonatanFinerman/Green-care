import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router'

import routes from './routes'

import { AppHeader } from './cmps/app-header'
import { AppFooter } from './cmps/app-footer'
import { UserDetails } from './pages/user-details'
import { HomePage } from './pages/home-page'
import { LoginPage } from './pages/login-page'
import { LocationIndex } from './pages/location-index'
import { LocationDetails } from './cmps/location-details'
import { AddLocationPage } from './pages/add-location'
import { setUserLoc } from './store/actions/user.actions'
import { useSelector } from 'react-redux'
import { NoUserLocModal } from './cmps/no-userloc-modal'
import { gatheringService } from './services/gathering.service'
import { LoadingCircle } from './cmps/loading-circle'
import { PrizeIndex } from './pages/prize-index'

export function RootCmp() {

    const userLoc = useSelector(storeState => storeState.userModule.userLoc)
    const isLoading = useSelector(storeState => storeState.systemModule.isLoading)


    useEffect(() => {
        setUserLoc()
    }, [])

    return (
        <div>

            {(userLoc) && <main>
                <Routes>
                    {/* {routes.map(route => <Route key={route.path} exact={true} element={route.component} path={route.path} />)} */}
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/location" element={<LocationIndex />} />
                    <Route path="/prize" element={<PrizeIndex />} />
                    <Route path="/gathering" element={<LocationIndex />} />
                    <Route path="/inform" element={<AddLocationPage />} />
                    <Route path="/location/:locationId" element={<LocationDetails />} />

                </Routes>
            </main>}
            {<NoUserLocModal />}
            {(isLoading) && <LoadingCircle />}

            {/* <AppFooter /> */}
        </div>
    )
}


