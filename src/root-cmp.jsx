import React from 'react'
import { Routes, Route } from 'react-router'

import routes from './routes'

import { AppHeader } from './cmps/app-header'
import { AppFooter } from './cmps/app-footer'
import { UserDetails } from './pages/user-details'
import { HomePage } from './pages/home-page'
import { LoginPage } from './pages/login-page'
import { LocationIndex } from './pages/location-index'
import { LocationDetails } from './cmps/location-details'


export function RootCmp() {

    return (
        <div>
            {/* <AppHeader /> */}
            <main>
                <Routes>
                    {/* {routes.map(route => <Route key={route.path} exact={true} element={route.component} path={route.path} />)} */}
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/location" element={<LocationIndex />} />
                    <Route path="/location/:locationId" element={<LocationDetails />} />

                </Routes>
            </main>
            {/* <AppFooter /> */}
        </div>
    )
}


