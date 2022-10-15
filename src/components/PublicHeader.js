import React from 'react'
import { Link } from 'react-router-dom'

const PublicHeader = () => {
    return (
        <header className="p-3 text-bg-dark sticky-top">
            <div className="container">
                <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                    <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
                        <i className="bi me-2 bi-house" width="40" height="32" role="img" aria-label="Bootstrap"></i>
                    </a>
                    <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                        <li><Link to="/" className="nav-link px-2 text-secondary">Home</Link></li>
                    </ul>
                    <div className="text-end">
                        <Link to="/login"><button type="button" className="btn btn-outline-light me-2">Login</button></Link>
                        <Link to="/register"><button type="button" className="btn btn-warning">Sign-up</button></Link>
                    </div>
                </div></div>
        </header>
    )
}

export default PublicHeader