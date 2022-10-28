import useAuth from '../../hooks/useAuth'
import useTitle from '../../hooks/useTitle'
import Loading from "../../components/Loading"
import { useGetStatusesQuery } from "../slice/statusesApiSlice"
import Status from "../status/Status"
import NewStatus from "../status/NewStatus"

const Home = () => {
    const { username } = useAuth()
    useTitle(`Home: ${username}`)

    const {
        data: statuses,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetStatusesQuery('statusesList', {
        pollingInterval: 15000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    let content
    let load

    if (isLoading) load = <Loading />
    if (isError) load = <p className="errmsg">{error?.data?.message}</p>

    if (isSuccess) {
        const { ids } = statuses
        let Ids = [...ids]

        const tableContent = ids?.length && Ids.map(statusId => <Status key={statusId} statusId={statusId} username={statuses.entities[statusId].username} time={statuses.entities[statusId].createdAt} />).sort((a, b) => {
            return new Date(b.props.time).getTime() - new Date(a.props.time).getTime()
        })

        content = (
            <div className="container-fluid flex-column feed border-start border-end border-secondary col-6" >
                <div className="p-1 sticky-top bg-black">
                    <h4 className="text-light">Home</h4>
                </div>
                <NewStatus />
                {load}
                <div className="container-fluid list-group list-group-flush scrollarea">
                    {tableContent}
                </div>
            </div>
        )
    }

    return content
}
export default Home