import { useParams } from 'react-router-dom'
import EditStatusForm from './EditStatusForm'
import { useGetStatusesQuery } from './statusesApiSlice'
import { useGetUsersQuery } from '../users/usersApiSlice'
import useAuth from '../../hooks/useAuth'
import PulseLoader from 'react-spinners/PulseLoader'
import useTitle from '../../hooks/useTitle'

const EditStatus = () => {
    useTitle('Edit Status')

    const { id } = useParams()

    const { username, isAdmin } = useAuth()

    const { note } = useGetStatusesQuery("statusesList", {
        selectFromResult: ({ data }) => ({
            note: data?.entities[id]
        }),
    })

    const { users } = useGetUsersQuery("usersList", {
        selectFromResult: ({ data }) => ({
            users: data?.ids.map(id => data?.entities[id])
        }),
    })

    if (!note || !users?.length) return <PulseLoader color={"#FFF"} />


    if (!isAdmin) {
        if (note.username !== username) {
            return <p className="errmsg">No access</p>
        }
    }

    const content = <EditStatusForm note={note} users={users} />

    return content
}
export default EditStatus