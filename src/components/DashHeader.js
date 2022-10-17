import { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faFileCirclePlus,
  faFilePen,
  faUserGear,
  faUserPlus,
  faRightFromBracket
} from "@fortawesome/free-solid-svg-icons"
import { useNavigate, Link, useLocation } from 'react-router-dom'
import { useSendLogoutMutation } from '../features/auth/authApiSlice'
import useAuth from '../hooks/useAuth'
import PulseLoader from 'react-spinners/PulseLoader'

// const DASH_REGEX = /^\/dash(\/)?$/
const NOTES_REGEX = /^\/dash\/notes(\/)?$/
const USERS_REGEX = /^\/dash\/users(\/)?$/

const DashHeader = () => {
  const { isManager, isAdmin } = useAuth()

  const navigate = useNavigate()
  const { pathname } = useLocation()

  const [sendLogout, {
    isLoading,
    isSuccess,
    isError,
    error
  }] = useSendLogoutMutation()

  useEffect(() => {
    if (isSuccess) navigate('/')
  }, [isSuccess, navigate])

  const onNewNoteClicked = () => navigate('/dash/notes/new')
  const onNewUserClicked = () => navigate('/dash/users/new')
  const onNotesClicked = () => navigate('/dash/notes')
  const onUsersClicked = () => navigate('/dash/users')

  // let dashClass = null
  // if (!DASH_REGEX.test(pathname) && !NOTES_REGEX.test(pathname) && !USERS_REGEX.test(pathname)) {
  //   dashClass = "dash-header__container--small"
  // }

  let newNoteButton = null
  if (NOTES_REGEX.test(pathname)) {
    newNoteButton = (
      <button
        className="icon-button"
        title="New Note"
        onClick={onNewNoteClicked}
      >
        <FontAwesomeIcon icon={faFileCirclePlus} />
      </button>
    )
  }

  let newUserButton = null
  if (USERS_REGEX.test(pathname)) {
    newUserButton = (
      <button
        className="icon-button"
        title="New User"
        onClick={onNewUserClicked}
      >
        <FontAwesomeIcon icon={faUserPlus} />
      </button>
    )
  }

  let userButton = null
  if (isManager || isAdmin) {
    if (!USERS_REGEX.test(pathname) && pathname.includes('/dash')) {
      userButton = (
        <button
          className="icon-button"
          title="Users"
          onClick={onUsersClicked}
        >
          <FontAwesomeIcon icon={faUserGear} />
        </button>
      )
    }
  }

  let notesButton = null
  if (!NOTES_REGEX.test(pathname) && pathname.includes('/dash')) {
    notesButton = (
      <button
        className="icon-button"
        title="Notes"
        onClick={onNotesClicked}
      >
        <FontAwesomeIcon icon={faFilePen} />
      </button>
    )
  }

  const logoutButton = (
    <button
      className="icon-button"
      title="Logout"
      onClick={sendLogout}
    >
      <FontAwesomeIcon icon={faRightFromBracket} />
    </button>
  )

  const errClass = isError ? "errmsg" : "offscreen"

  let buttonContent
  if (isLoading) {
    buttonContent = <PulseLoader color={"#FFF"} />
  } else {
    buttonContent = (
      <>
        {newNoteButton}
        {newUserButton}
        {notesButton}
        {userButton}
        {logoutButton}
      </>
    )
  }

  const content = (
    <>
      <header className="p-1 text-bg-dark sticky-top">
        <div className="container">
          <p className={errClass}>{error?.data?.message}</p>
          <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            <Link to="/dash">
              <div className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
                <i className="bi bi-house" width="40" height="32" role="img"></i>
              </div>
            </Link>
            <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
              <li><Link to="/" className="nav-link px-2 text-secondary">Home</Link></li>
            </ul>
            <div className="text-end">
              {buttonContent}
            </div>
          </div></div>
      </header>
    </>
  )

  return content
}
export default DashHeader