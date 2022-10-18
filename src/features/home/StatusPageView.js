import React, { useState } from 'react'
import { ArrowLeft } from 'react-bootstrap-icons'
import { Link } from 'react-router-dom'

const StatusPageView = ({ status }) => {
    const [username] = useState(status.username)
    const [text] = useState(status.text)
    const [likes] = useState(status.likes)
    const [createdAt] = useState(status.createdAt)
    let time = new Date(createdAt)
    return (
        <div className="d-flex flex-column flex-shrink-0 feed shadow" >
            <div className="p-1 border-bottom border-secondary">
                <h3 className="text-start text-light">
                    <Link to="/home">
                        <span className='me-2'>
                            <ArrowLeft />
                        </span>
                    </Link>
                    status
                </h3>
            </div>
            <div className="text-light ms-2 mt-2 mb-2 border-bottom border-secondary">
                <strong className='border-bottom border-secondary'>{username}</strong>
                <p>{text}</p>
                <small>{time.getHours()}:{time.getMinutes()} {time.toDateString()}</small>
            </div>
            <div className="text-light ms-2 mt-2 mb-2 border-bottom border-secondary">
                <strong>{likes} Likes</strong>
            </div>
        </div>
    )
}

export default StatusPageView