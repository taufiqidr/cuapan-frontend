import { useEffect } from 'react'
import './sidebar.css'
import useAuth from "../hooks/useAuth"
import { useSendLogoutMutation } from '../features/auth/authApiSlice'
import { Link, useNavigate } from 'react-router-dom'

const Sidebar = () => {
    const { username, isAdmin } = useAuth()
    const navigate = useNavigate()

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
        <div className="d-flex flex-column flex-shrink-0 main-bar border-end border-secondary">
            <div className="d-flex p-1 border-bottom border-secondary ">
                <p className="h3 text-center text-light "> Cuapan</p>
            </div>
            <ul className='nav nav-pills flex-column mb-auto'>
                <li className='nav-item'>
                    <div className='m-3'>
                        <Link to={'/home'} className="text-decoration-none text-light nav-link ">
                            <h5>Home</h5>
                        </Link>
                    </div>
                </li>
                <li className='nav-item'>
                    <div className='m-3'>
                        <Link to={`/${username}`} className="text-decoration-none text-light nav-link ">
                            <h5>Profile</h5>
                        </Link>
                    </div>
                </li>
            </ul>
            <div className="dropdown p-3 border-top border-secondary flex-column">
                <a href="true" className="d-flex align-items-center text-light text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                    <img src="https://github.com/mdo.png" alt="" width="32" height="32" className="rounded-circle me-2" />
                    <strong>{username}</strong>
                </a>
                <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
                    {menu}
                    <li><a className="dropdown-item" href="true">Edit Profile</a></li>
                    <li><hr className="dropdown-divider" /></li>
                    {logoutButton}
                </ul>
            </div>
        </div>
    )
}

export default Sidebar