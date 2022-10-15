import React from 'react'

const PublicFooter = () => {
    return (
        <footer className="fixed-bottom mb-2">
            <div className="container">
                <div className="row">
                    <div className="col">
                        <span className="text-muted">&copy; 2022 taufiqidr</span>
                    </div>
                    <ul className="nav col justify-content-end list-unstyled mr-4">
                        <li className="ms-3"><a className="text-muted" href="https://twitter.com/taufiqidr" target="_blank" rel="noopener noreferrer"><i className="bi-twitter" width="24" height="24"></i></a></li>
                        <li className="ms-3"><a className="text-muted" href="https://www.instagram.com/taufiqidr/" target="_blank" rel="noopener noreferrer"><i className="bi bi-instagram" width="24" height="24"></i></a></li>
                        <li className="ms-3"><a className="text-muted" href="https://www.facebook.com/taufiqidr/" target="_blank" rel="noopener noreferrer"><i className="bi bi-facebook" width="24" height="24"></i></a></li>
                    </ul>
                </div>
            </div>
        </footer>

    )
}

export default PublicFooter