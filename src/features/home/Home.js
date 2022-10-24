// import { useNavigate } from 'react-router-dom'
import { useGetStatusesQuery } from "./statusesApiSlice"
import useAuth from '../../hooks/useAuth'
import useTitle from '../../hooks/useTitle'
import Status from "./Status"
import './home.css'
import NewStatus from "./NewStatus"
import Loading from "../../components/Loading"

const Home = () => {
    // const date = new Date()
    // const today = new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'long' }).format(date)
    // const navigate = useNavigate()

    // if (!useAuth()) navigate('/login')
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

        const tableContent = ids?.length && Ids.map(statusId => <Status key={statusId} statusId={statusId} username={statuses.entities[statusId].username} />).sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt);
        }).reverse()

        content = (
            <div className="d-flex flex-column feed border-start border-end border-secondary col-6" >
                <div className="p-1 sticky-top bg-black">
                    <h4 className="text-light">Home</h4>
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
export default Home