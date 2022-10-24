import { useEffect } from 'react'
import './sidebar.css'
import useAuth from "../hooks/useAuth"
import { useSendLogoutMutation } from '../features/auth/authApiSlice'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ArrowLeftRight, HouseFill, PersonFill } from 'react-bootstrap-icons'

const Sidebar = () => {
    const { username, isAdmin } = useAuth()
    const navigate = useNavigate()
    const { pathname } = useLocation()
    let classHome, classProfile
    if (pathname === '/home') {
        classHome = "text-decoration-none text-light nav-link active"
        classProfile = "text-decoration-none text-light nav-link"
    }
    else if (pathname === `/${username}`) {
        classHome = "text-decoration-none text-light nav-link"
        classProfile = "text-decoration-none text-light nav-link active"
    }
    else {
        classHome = "text-decoration-none text-light nav-link"
        classProfile = "text-decoration-none text-light nav-link"
    }

    const [sendLogout, {
        isSuccess,
    }] = useSendLogoutMutation()

    useEffect(() => {
        if (isSuccess) navigate('/')
    }, [isSuccess, navigate])

    let menu = ""
    if (isAdmin) {
        menu = (
            <>
                <li><a className="dropdown-item" href="true">Manage Status</a></li>
                <li><a className="dropdown-item" href="true">Manage Users</a></li>
            </>
        )
    }
    const logoutButton = (
        <li className='dropdown-item pointer' onClick={sendLogout}>Sign out</li>
    )
    // const nav_item = "text-light flex-column m-3 nav-link"
    return (
        <div className="d-flex flex-column flex-shrink-0 main-bar col-3">
            <div className="d-flex p-1 ">
                <h4>
                    <ArrowLeftRight />
                </h4>
            </div>
            <ul className='nav nav-pills flex-column mb-auto'>
                <li className='nav-item'>
                    <div className='m-1'>
                        <Link to={'/home'} className={classHome}>
                            <h4><span><HouseFill /></span> Home</h4>
                        </Link>
                    </div>
                </li>
                <li className='nav-item'>
                    <div className='m-1'>
                        <Link to={`/profile`} className={classProfile}>
                            <h4><span className=''><PersonFill /></span>Profile</h4>
                        </Link>
                    </div>
                </li>
            </ul>
            <div className="dropdown p-3 flex-column">
                <a href="true" className="d-flex align-items-center text-light text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                    <img src="https://github.com/mdo.png" alt="" width="32" height="32" className="rounded-circle me-2" />
                    <strong>{username}</strong>
                </a>
                <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
                    {menu}
                    <li>
                        <Link to={`/${username}/edit`} className="dropdown-item">
                            Edit Profile
                        </Link>
                    </li>
                    <li><hr className="dropdown-divider" /></li>
                    {logoutButton}
                </ul>
            </div>
        </div>
    )
}

export default Sidebar