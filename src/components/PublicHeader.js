import React from 'react'
import { Link } from 'react-router-dom'

const PublicHeader = () => {
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
                        <Link to="/login"><button type="button" className="btn btn-outline-light me-2">Login</button></Link>
                        <Link to="/register"><button type="button" className="btn btn-warning">Sign-up</button></Link>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default PublicHeader