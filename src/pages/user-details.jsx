
import { useDispatch, useSelector } from "react-redux";
import { AppHeader } from "../cmps/app-header";
import { utilService } from "../services/util.service";
import { ProfileModal } from "../cmps/user-profile-modal";
import { LOADING_DONE, LOADING_START, SET_PROFILE_MODAL, TOGGLE_IS_SHADOW } from "../store/system.reducer";
import { uploadImg } from "../services/cloudinary-service";
import { updateUser } from "../store/actions/user.actions";
import { useParams } from "react-router-dom";

export function UserDetails() {

  const dispatch = useDispatch()
  const user = useSelector(storeState => storeState.userModule.user)
  const { userId } = useParams()

  function handleOptionsClick(modalStatus) {
    dispatch({ type: SET_PROFILE_MODAL, profileModal: modalStatus })
    dispatch({ type: TOGGLE_IS_SHADOW })
  }

  async function onUpdateUser(editedUser) {

    if (!editedUser) return

    const updatedUser = structuredClone(user)
    dispatch({ type: SET_PROFILE_MODAL, profileModal: null })
    dispatch({ type: LOADING_START })

    if (editedUser.fullName) updatedUser.fullName = editedUser.fullName

    if (editedUser.profileImg) {
      uploadImg(editedUser.profileImg)
        .then(imgUrl => {
          updatedUser.profileImg = imgUrl
          updateUser(updatedUser)
        })
        .then(res => {
          dispatch({ type: LOADING_DONE })
          dispatch({ type: TOGGLE_IS_SHADOW })
        })
    }
    else{
      updateUser(updatedUser)
      .then(res=>{
        dispatch({ type: LOADING_DONE })
        dispatch({ type: TOGGLE_IS_SHADOW })
      })
    } 
  }

  return (
    <section className="user-details main-layout">
      <AppHeader />

      <div>
        <div className="user-details-header flex">

          <img className="profile-img" src={user.profileImg} />

          <div className="user-info">

            <div className="name-and-lvl flex space-between ">
              <h3 className="user-name">{user.fullName}</h3>
              <p className="user-lvl">level  <span>9</span></p>
            </div>

            <p className="lvl-status">Green master</p>

            <div className="balance">
              <small>Care points balance</small>
              <p>{user.coins}</p>
            </div>

          </div>
        </div>

        <section className="actions-section flex">
          <div className="user-actions">

            <h4>Recent activities</h4>
            {(user.actions.length === 0) ? <p className="no-actions">No actions yet!</p> : <ul className="action-list flex column">{user.actions.map(action => {
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
            <h4>More Options</h4>
            <div className="flex">
              <a onClick={() => handleOptionsClick('gatherings')}>View your gatheings</a>
              <a onClick={() => handleOptionsClick('prizes')}>Your Prizes</a>
              <a onClick={() => handleOptionsClick('profile')}>Edit profile</a>
            </div>
          </div>
        </section>
      </div>
      <ProfileModal user={user} onUpdateUser={onUpdateUser} />
    </section>
  )
}