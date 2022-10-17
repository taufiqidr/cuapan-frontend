import React from 'react'
import { Facebook, Instagram, Twitter } from 'react-bootstrap-icons'

const PublicFooter = () => {
    return (
        <footer className="p-2 fixed-bottom border-top border-secondary">
            <div className="container">
                <div className="row">
                    <div className="text-start col-6">
                        <span className="text-secondary">&copy; 2022 taufiqidr</span>
                    </div>
                    <div className="text-end text-light col-6">
                        <a className="text-secondary m-3" href="https://twitter.com/taufiqidr" target="_blank" rel="noopener noreferrer"><Twitter /></a>
                        <a className="text-secondary m-3" href="https://www.instagram.com/taufiqidr/" target="_blank" rel="noopener noreferrer"><Instagram /></a>
                        <a className="text-secondary m-3" href="https://www.facebook.com/taufiqidr/" target="_blank" rel="noopener noreferrer"><Facebook /></a>
                    </div>
                </div>
            </div>
        </footer>

    )
}

export default PublicFooter