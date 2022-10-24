import React, { useEffect, useState } from 'react'
import { ArrowLeft, ThreeDots } from 'react-bootstrap-icons'
import { Link, useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import { useDeleteStatusMutation } from '../statuses/statusesApiSlice'

const StatusPageView = ({ status }) => {
    const navigate = useNavigate()
    const { username: curr_user } = useAuth()

    const [username] = useState(status.username)
    const [text] = useState(status.text)
    const [likes] = useState(status.likes)
    const [createdAt] = useState(status.createdAt)

    const [deleteStatus, {
        isSuccess: isDelSuccess
    }] = useDeleteStatusMutation()

    useEffect(() => {
        if (isDelSuccess) {
            setShow(false)

            navigate('/profile')
        }
    }, [isDelSuccess, navigate])

    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const onDeleteStatusClicked = async () => {
        await deleteStatus({ id: status.id })
    }

    let dropdown
    if (curr_user === username) {
        dropdown = (
            <>
                <div className="col text-end">
                    <div className="dropdown">
                        <ThreeDots role="button" data-bs-toggle="dropdown" aria-expanded="false" className='text-secondary'>
                            <a className="btn btn-secondary dropdown-toggle" href="#0" >
                            </a>
                        </ThreeDots>
                        <ul className="dropdown-menu">
                            <li><a className="dropdown-item" href="#0">Edit Status</a></li>
                            <li><hr className="dropdown-divider" /></li>
                            <li>
                                <button type="button" className="dropdown-item" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={handleShow}>
                                    Delete Status
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="modal" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" show={show.toString()}>
                    <div className="modal-dialog border">
                        <div className="modal-content bg-black ">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Confirm delete</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ></button>
                            </div>
                            <div className="modal-body">
                                Are you sure you want to delete this status?
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                <button type="button" className="btn btn-danger" onClick={onDeleteStatusClicked}>Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
    let time = new Date(createdAt)
    return (
        <div className="d-flex flex-column feed border-start border-end border-secondary col-6" >
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
            {dropdown}
        </div>
    )
}

export default StatusPageView