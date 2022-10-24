import { memo } from 'react'
import TimeAgo from './TimeAgo'
import './status.css'
import { Link } from "react-router-dom"
import { Heart } from 'react-bootstrap-icons'
import { useGetStatusesQuery } from '../statuses/statusesApiSlice'

const Status = ({ statusId, username }) => {
    const { status } = useGetStatusesQuery("statusList", {
        selectFromResult: ({ data }) => ({
            status: data?.entities[statusId]
        }),
    })

    if (status) {
        return (
            <div className="container-fluid status border-bottom border-top border-secondary">
                <Link to={`/status/${statusId}`} className='text-decoration-none text-light'>
                    <div className="row mt-1 mb-1">
                        <div className="col-sm-2">
                            <div className="row"><img src="default.jpg" alt="profile-pic" className='profile-pic img-fluid m-auto mt-1' /></div>
                        </div>
                        <div className="col-10 ">
                            <div className="row mt-1">
                                <div className="col-2 "><strong className='strong'>@{status.username}</strong></div>
                                <div className="col-10 text-end text-secondary"><TimeAgo timestamp={status.createdAt} /></div>
                            </div>
                            <div className="row ">
                                <div className="col">
                                    <p className='text-wrap text-break'>{status.text}</p>
                                </div>
                            </div>
                            <div className="row ">
                                <div className="d-flex mb-auto">
                                    <span className='text-secondary'>
                                        <Heart />
                                    </span>
                                    <p className='ms-2 text-secondary'>{status.likes}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>

            </div>
        )
    } else return null
}

const memoizedStatus = memo(Status)

export default memoizedStatus