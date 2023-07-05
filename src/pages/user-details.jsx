// import { useEffect } from 'react'
// import { useSelector } from 'react-redux'
// import { useParams } from 'react-router-dom'

import { useSelector } from "react-redux";
import { AppHeader } from "../cmps/app-header";
import { useEffect } from "react";
import { utilService } from "../services/util.service";

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

      <div>
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

        <section className="actions-section flex">
          <div className="user-actions">

            <h4>Recent activities</h4>
            {(user.actions.length === 0) ? <p>No actions yet</p> : <ul className="action-list flex column">{user.actions.map(action => {
              return <article className="action-preview flex" key={action.time}>
                <img src={action.img} />
               
                  <p className="prev-name">{action.name}</p>

                  <div className="flex column">
                    <p>{action.action}</p>
                    <small className="time-ago">{utilService.getTimePastStr(action.time)}</small>
                  </div>
                

              </article>
            })}</ul>}
          </div>

          <div className="more-options">
            <h4>hello</h4>
          </div>
        </section>
      </div>

    </section>
  )
}