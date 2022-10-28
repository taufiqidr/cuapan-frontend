import React from 'react'
import BackButton from './BackButton'

const Bar = ({ title }) => {
    return (
        <div className="top-bar bg-black p-1">
            <header>
                <h4 className="text-light">{title !== "Home" ? <BackButton /> : ""}{title}</h4>
            </header>
        </div>
    )
}

export default Bar