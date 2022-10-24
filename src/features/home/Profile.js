import { useGetStatusesQuery } from "./statusesApiSlice"
import useAuth from '../../hooks/useAuth'
import useTitle from '../../hooks/useTitle'
import Status from "./Status"
import './home.css'
import NewStatus from "./NewStatus"
import Loading from "../../components/Loading"

const Profile = () => {
    const { username } = useAuth()
    useTitle(`Profile: ${username}`)
    const {
        data: statuses,
        isLoading,
        isSuccess,
        isError
    } = useGetStatusesQuery('statusesList', {
        pollingInterval: 15000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    let load
    let content

    if (isLoading) load = <Loading />

    if (isError) {
        load = <Loading />
    }

    if (isSuccess) {
        const { ids, entities } = statuses

        let filteredIds = ids.filter(statusId => entities[statusId].username === username)

        const tableContent = ids?.length && filteredIds.map(statusId => <Status key={statusId} statusId={statusId} username={statuses.entities[statusId].username} />).sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt);
        }).reverse()

        content = (
            <div className="d-flex flex-column flex-shrink-0 feed border-start border-end border-secondary" >
                <div className="p-1">
                    <h4 className="text-center text-light">{username}</h4>
                </div>
                <NewStatus />
                {load}
                <div className="list-group list-group-flush scrollarea">
                    {tableContent}
                </div>
            </div>
        )
    }

    return content
}

export default Profile