import { useGetStatusesQuery } from './statusesApiSlice'
import { memo } from 'react'
import TimeAgo from './TimeAgo'
import { useNavigate } from "react-router-dom"

const Status = ({ statusId }) => {
    const navigate = useNavigate()

    const handleView = () => navigate(`/home/${statusId}`)

    const { status } = useGetStatusesQuery("statusList", {
        selectFromResult: ({ data }) => ({
            status: data?.entities[statusId]
        }),
    })

    if (status) {
        return (
            <div className="bg-dark list-group-item list-group-item-action py-3 lh-sm border-top border-secondary" onClick={handleView}>
                <div className="d-flex w-100 align-items-center justify-content-between" >
                    <strong className="mb-1 text-light">{status.username}</strong>
                    <small className='text-light'>
                        <TimeAgo timestamp={status.createdAt} />
                    </small>
                </div>
                <div className="col-10 mb-1 small text-light">{status.text}</div>
            </div>
        )

    } else return null
}

const memoizedStatus = memo(Status)

export default memoizedStatus