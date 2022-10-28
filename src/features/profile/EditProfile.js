import { useParams } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import useTitle from '../../hooks/useTitle'
import EditProfileView from './EditProfileView'
import { useGetUsersQuery } from '../slice/usersApiSlice'
import ErrorPage from '../../components/ErrorPage'

const EditProfile = () => {
    const { username } = useAuth()
    const { username: username_params } = useParams()

    useTitle(`Edit Profile: ${username}`)

    const {
        data: users,
        isSuccess: successUser,
    } = useGetUsersQuery('usersList', {
        pollingInterval: 60000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    let content

    if (successUser) {
        const { entities: userent } = users
        let arr = []
        Object.keys(userent).forEach(function (key, index) {
            arr.push(userent[key])
        });

        const user = arr.filter(user => user.username === username)[0]
        if (!user) {
            return <ErrorPage item={'User'} />
        } else if (username !== username_params) {
            return <ErrorPage message={'Cannot edit other user profile'} />
        }
        content = <EditProfileView user={user} />
    }

    return content

}

export default EditProfile