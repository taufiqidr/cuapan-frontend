import { useEffect, useState } from 'react'
import { Heart, ThreeDots } from 'react-bootstrap-icons'
import { Link, useNavigate } from 'react-router-dom'
import BackButton from '../../components/BackButton'
import useAuth from '../../hooks/useAuth'
import { useDeleteStatusMutation } from '../slice/statusesApiSlice'

import TimeAgo from './TimeAgo'

const StatusPageView = ({ status }) => {
    const navigate = useNavigate()
    const { username: curr_user } = useAuth()

    const [username] = useState(status.username)

    const [deleteStatus, {
        isSuccess: isDelSuccess
    }] = useDeleteStatusMutation()

    useEffect(() => {
        if (isDelSuccess) {
            navigate('/home')
        }
    }, [isDelSuccess, navigate])


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
                            <li>
                                <Link to={`/${status.username}/status/${status.id}/edit`} className='dropdown-item'>Edit Status</Link>
                            </li>
                            <li><hr className="dropdown-divider" /></li>
                            <li>
                                <button type="button" className="dropdown-item" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                    Delete Status
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="modal" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                                <button type="button" className="btn btn-danger" onClick={onDeleteStatusClicked} data-bs-dismiss="modal">Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
    return (
        <div className="container-fluid border-start border-end border-secondary feed" >
            <div className="p-1 border-bottom border-secondary">
                <h4 className="text-start text-light">
                    <BackButton />
                    Status
                </h4>
            </div>
            <div className="row mt-1">
                <div className="col-2">
                    <div className="row">
                        <div className="col-2"></div>
                        <div className="col-8">
                            <img src="https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg" alt="profile-pic" className='profile-pic img-fluid m-auto mt-1' />
                        </div>
                        <div className="col-2"></div>
                    </div>
                </div>
                <div className="col-9">
                    <div className="row">
                        <div className="row"><strong>Name</strong></div>
                        <div className="row"><small className='text-secondary'>@{status.username}</small></div>
                    </div>
                </div>
                <div className="col-1">
                    {dropdown}
                </div>
            </div>
            <div className="row mt-2">
                <p className='text-wrap text-break'>{status.text}</p>
            </div>
            <div className="row mt-2">
                <div className="text-secondary"><TimeAgo timestamp={status.createdAt} /></div>
            </div>
            <div className="row mt-2">
                <p>
                    <span className='text-secondary'>
                        <Heart />
                    </span>
                    <small className='ms-2 text-secondary'>{status.likes}</small>
                </p>
            </div>
        </div>
    )
}

export default StatusPageView