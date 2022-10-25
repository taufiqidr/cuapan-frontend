import { useGetStatusesQuery } from "./statusesApiSlice"
import useAuth from '../../hooks/useAuth'
import useTitle from '../../hooks/useTitle'
import Status from "./Status"
import './home.css'
import NewStatus from "./NewStatus"
import Loading from "../../components/Loading"
import { ArrowLeft } from "react-bootstrap-icons"
import { Link } from "react-router-dom"

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
                <div className="p-1 border-bottom border-secondary">
                    <h4 className="text-start text-light">
                        <Link to="/home">
                            <span className='me-2'>
                                <ArrowLeft />
                            </span>
                        </Link>
                        {username}
                    </h4>
                </div>
                <div className="container">
                    <div className="row"></div>
                    <div className="row">
                        <div className="col-4"></div>
                        <div className="col-4">
                            <img src="default.jpg" alt="profile-pic" className='profile-pic img-fluid' />
                        </div>
                        <div className="col-4"></div>
                    </div>
                    <div className="row">
                        <div className="row"><strong>Name</strong></div>
                        <div className="row"><small className="text-secondary">@username</small></div>
                        <div className="row"><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex optio ut, voluptatibus mollitia qui laudantium, sed cupiditate quis, soluta dolore nam rerum accusamus? Aliquid magnam ipsam consequuntur cupiditate repudiandae deserunt, ratione delectus pariatur soluta eveniet tempore animi id ad provident illum omnis, beatae facere est reiciendis sequi. Ullam, maxime quos.</p></div>
                        <div className="row">
                            <p><small className="text-secondary">Born September 8, 1999</small></p>
                        </div>
                        <div className="row">
                            <p><strong>0</strong><small className="text-secondary"> Total likes</small></p>

                        </div>
                    </div>

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