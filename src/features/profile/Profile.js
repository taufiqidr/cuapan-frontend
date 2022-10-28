import { useGetStatusesQuery } from '../slice/statusesApiSlice'
import { useGetUsersQuery } from "../slice/usersApiSlice"
import { useParams } from "react-router-dom"
import { memo } from 'react'
import useTitle from '../../hooks/useTitle'
import Status from "../status/Status"
import NewStatus from "../status/NewStatus"
import Loading from "../../components/Loading"
import BackButton from "../../components/BackButton"

const Profile = () => {
    const { username } = useParams()
    useTitle(`Profile: ${username}`)

    const {
        data: users,
        isLoading: loadingUser,
        isSuccess: successUser,
        isError: errorUser,
    } = useGetUsersQuery('usersList', {
        pollingInterval: 60000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

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

    if (isLoading && loadingUser) load = <Loading />

    if (isError && errorUser) {
        load = <Loading />
    }

    if (isSuccess && successUser) {
        const { ids, entities } = statuses
        let filteredIds = ids.filter(statusId => entities[statusId].username === username)

        const tableContent = ids?.length && filteredIds.map(statusId => <Status key={statusId} statusId={statusId} username={statuses.entities[statusId].username} time={statuses.entities[statusId].createdAt} />).sort((a, b) => {
            return new Date(b.props.time).getTime() - new Date(a.props.time).getTime()
        })

        const { entities: userent } = users
        let arr = []
        Object.keys(userent).forEach(function (key, index) {
            arr.push(userent[key])
        });
        const user = arr.filter(user => user.username === username)[0]

        content = (
            <div className="container-fluid flex-column feed border-start border-end border-secondary col-6" >
                <div className="p-1 sticky-top bg-black">
                    <h4 className="text-start text-light">
                        <BackButton />
                        {user.username}
                    </h4>
                </div>
                <div className="container">
                    <div className="row"></div>
                    <div className="row">
                        <div className="col-4"></div>
                        <div className="col-4">
                            <img src="https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg" alt="profile-pic" className='profile-pic img-fluid' />
                        </div>
                        <div className="col-4"></div>
                    </div>
                    <div className="row">
                        <div className="row"><strong>{user.name ? user.name : 'name not set'}</strong></div>
                        <div className="row"><small className="text-secondary">@{user.username ? user.username : 'username not set'}</small></div>
                        <div className="row"><p>{user.description ? user.description : 'bio not set'}</p></div>
                        <div className="row">
                            <p><small className="text-secondary">{user.dob ? user.dob : 'date of birth not set'}</small></p>
                        </div>
                        <div className="row">
                            <p><strong>0</strong><small className="text-secondary"> Total likes</small></p>
                        </div>
                    </div>
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

const memoizedProfile = memo(Profile)

export default memoizedProfile