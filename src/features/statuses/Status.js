import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from 'react-router-dom'
import { useGetStatusesQuery } from './statusesApiSlice'
import { memo } from 'react'

const Status = ({ statusId }) => {

    const { status } = useGetStatusesQuery("statusList", {
        selectFromResult: ({ data }) => ({
            status: data?.entities[statusId]
        }),
    })

    const navigate = useNavigate()

    if (status) {
        const created = new Date(status.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long' })

        const updated = new Date(status.updatedAt).toLocaleString('en-US', { day: 'numeric', month: 'long' })

        const handleEdit = () => navigate(`/dash/status/${statusId}`)

        return (
            <tr className="table__row">
                <td className="table__cell status__status">{status.likes}</td>
                <td className="table__cell status__created">{created}</td>
                <td className="table__cell status__updated">{updated}</td>
                <td className="table__cell status__title">{status.text}</td>
                <td className="table__cell status__username">{status.username}</td>

                <td className="table__cell">
                    <button
                        className="icon-button table__button"
                        onClick={handleEdit}
                    >
                        <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                </td>
            </tr>
        )

    } else return null
}

const memoizedStatus = memo(Status)

export default memoizedStatus