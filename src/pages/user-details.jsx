// import { useEffect } from 'react'
// import { useSelector } from 'react-redux'
// import { useParams } from 'react-router-dom'

import { useSelector } from "react-redux";
import { AppHeader } from "../cmps/app-header";
import { useEffect } from "react";

// import { loadUser } from '../store/user.actions'
// import { store } from '../store/store'
// import { showSuccessMsg } from '../services/event-bus.service'
// import { socketService, SOCKET_EVENT_USER_UPDATED, SOCKET_EMIT_USER_WATCH } from '../services/socket.service'

export function UserDetails() {

  // 
  //   const user = useSelector(storeState => storeState.userModule.watchedUser)
  // useEffect(() => {
  //   loadUserGathering
  // }, [])

  const user = useSelector(storeState => storeState.userModule.user)

  return (
    <section className="user-details main-layout">
      <AppHeader />


      <div className="user-details-header flex">

        <img className="profile-img" src={user.profileImg} />

        <div className="user-info">

          <div className="flex space-between align-center">
            <h3>{user.fullname}</h3>
            <p className="user-lvl">level  <span>9</span></p>
          </div>

          <p>Green master</p>

          <div className="balance">
            <small>Care points balance</small>
            <p>{user.coins}</p>
          </div>

        </div>
      </div>

      <section>
        <p>Recent activities</p>
        <div>{user.gatheringIds.map(gath => {
          return <div key={gath}>{'hi' + gath}</div>
        })}</div>
      </section>

    </section>
  )
}