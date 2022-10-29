import useAuth from '../../hooks/useAuth'
import useTitle from '../../hooks/useTitle'
import Loading from "../../components/Loading"
import { useGetStatusesQuery } from "../slice/statusesApiSlice"
import Status from "../status/Status"
import NewStatus from "../status/NewStatus"
import ErrorPage from '../../components/ErrorPage'
import Bar from '../../components/Bar'

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

    if (isLoading) content = <Loading />
    if (isError) content = <ErrorPage message={error?.data?.message} />

    if (isSuccess) {
        const { ids } = statuses
        let Ids = [...ids]

        const tableContent = ids?.length && Ids.map(statusId => <Status key={statusId} statusId={statusId} username={statuses.entities[statusId].username} time={statuses.entities[statusId].createdAt} />).sort((a, b) => {
            return new Date(b.props.time).getTime() - new Date(a.props.time).getTime()
        })

        content = (
            <div  >
                <Bar title={'Home'} />
                <NewStatus />
                <div className="container-fluid list-group list-group-flush scrollarea">
                    {tableContent}
                </div>
            </div>
        )
    }

    return content
}
export default Home