import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const PublicHeader = () => {
    const { pathname } = useLocation()
    let login_class, register_class
    if (pathname === '/login') {
        login_class = 'me-2 btn btn-primary'
        register_class = 'btn btn-outline-light'
    } else if (pathname === '/register') {
        login_class = 'me-2 btn btn-outline-light'
        register_class = 'btn btn-primary'
    } else {
        login_class = 'me-2 btn btn-outline-light'
        register_class = 'btn btn-outline-light'
    }

    return (
        <header className="p-3 sticky-top border-bottom border-secondary">
            <div className="container">
                <div className="row">
                    <div className='text-start m-auto col-6'>
                        <Link to="/" className="nav-link px-2 text-light">
                            Home
                        </Link>
                    </div>
                    <div className="text-end m-auto col-6">
                        <Link to="/login"><button type="button" className={login_class}>Login</button></Link>
                        <Link to="/register"><button type="button" className={register_class}>Sign-up</button></Link>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default PublicHeader