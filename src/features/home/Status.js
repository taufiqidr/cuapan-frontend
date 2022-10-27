import { memo } from 'react'
import TimeAgo from './TimeAgo'
import './status.css'
import { Link } from "react-router-dom"
import { ArrowDown, ArrowUp } from 'react-bootstrap-icons'
import { useDownvoteStatusMutation, useUpvoteStatusMutation, useGetStatusesQuery } from './statusesApiSlice'
import { useDispatch } from 'react-redux'
import { upvote, downvote } from './voteSlice'

const Status = ({ statusId, username, time }) => {
    const dispatch = useDispatch()

    const { status } = useGetStatusesQuery("statusList", {
        selectFromResult: ({ data }) => ({
            status: data?.entities[statusId]
        }),
    })

    const [downvoteStatus] = useDownvoteStatusMutation()
    const [upvoteStatus] = useUpvoteStatusMutation()

    const downvoteStatusHandle = async (e) => {
        await downvoteStatus({ id: statusId })
        dispatch(downvote())
    }

    const upvoteStatusHandle = async (e) => {
        await upvoteStatus({ id: statusId })
        dispatch(upvote())
    }

    if (status) {
        return (
            <div className="container-fluid status border-bottom border-top border-secondary">
                <div className="row mt-1 mb-1">
                    <div className="col-sm-2">
                        <div className="row"><img src="https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg" alt="profile-pic" className='profile-pic img-fluid m-auto mt-1' /></div>
                    </div>
                    <div className="col-10 ">
                        <Link to={`/${status.username}/status/${statusId}`} className='text-decoration-none text-light' >
                            <div className="row mt-1">
                                <div className="col-2 "><strong className='strong'>@{status.username}</strong></div>
                                <div className="col-10 text-end text-secondary"><TimeAgo timestamp={status.createdAt} /></div>
                            </div>
                            <div className="row ">
                                <div className="col">
                                    <p className='text-wrap text-break'>{status.text}</p>
                                </div>
                            </div>
                        </Link>
                        <div className="row ">
                            <div className="d-flex mb-auto">
                                <span className='text-secondary' onClick={upvoteStatusHandle}>
                                    <ArrowUp />
                                </span>
                                <p className='ms-2 me-2 text-secondary'>{status.likes}</p>
                                <span className='text-secondary' onClick={downvoteStatusHandle}>
                                    <ArrowDown />
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    } else return null
}

const memoizedStatus = memo(Status)

export default memoizedStatus