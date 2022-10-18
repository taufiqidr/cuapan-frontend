import { useEffect } from 'react'
import './sidebar.css'
import useAuth from "../hooks/useAuth"
import { useSendLogoutMutation } from '../features/auth/authApiSlice'
import { useNavigate } from 'react-router-dom'


const Sidebar = () => {
    const { username } = useAuth()
    const navigate = useNavigate()

    const [sendLogout, {
        isSuccess,
    }] = useSendLogoutMutation()

    useEffect(() => {
        if (isSuccess) navigate('/')
    }, [isSuccess, navigate])

    const logoutButton = (
        <li className='dropdown-item pointer' onClick={sendLogout}>Sign out</li>
    )
    return (
        <div className="d-flex flex-column flex-shrink-0 main-bar border-end border-secondary">
            <div className="d-flex p-1 border-bottom border-secondary ">

                <p className="h3 text-center text-light">Cuapan</p>
            </div>
            <div className="list-group list-group-flush bg-dark">
                <ul className="nav nav-pills flex-column">
                    <li className="nav-item mb-2">
                        <a href="true" className="nav-link text-light" aria-current="page">
                            <h5><i className='bi bi-house'></i> Home</h5>
                        </a>
                    </li>
                    <li>
                        <a href="true" className="nav-link text-light">
                            <h5><i className='bi bi-person-circle'></i> Profile</h5>
                        </a>
                    </li>
                </ul>
            </div>
            <div className="dropdown p-3 border-top border-secondary flex-column">
                <a href="true" className="d-flex align-items-center text-light text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                    <img src="https://github.com/mdo.png" alt="" width="32" height="32" className="rounded-circle me-2" />
                    <strong>{username}</strong>
                </a>
                <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
                    <li><a className="dropdown-item" href="true">Manage Status</a></li>
                    <li><a className="dropdown-item" href="true">Manage Users</a></li>
                    <li><a className="dropdown-item" href="true">Edit Profile</a></li>
                    <li><hr className="dropdown-divider" /></li>
                    {logoutButton}
                </ul>
            </div>
        </div>
    )
}

export default Sidebar